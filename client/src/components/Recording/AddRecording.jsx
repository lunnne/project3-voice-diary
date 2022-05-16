import { useReactMediaRecorder } from 'react-media-recorder';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import * as AiIcons from 'react-icons/ai';
import './Recording.css';
import axios from 'axios';

const AddRecording = ({ isOpen, onClose, onRecordAdded }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    type: 'audio/wav',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // onRecordAdded({
    //   title,
    //   date,
    // });

    onClose();

    const audioBlob = await fetch(mediaBlobUrl).then((res) => res.blob());
    const filename = title;
    const audioFile = new File([audioBlob], `${filename}.wav`, { type: 'audio/wav' });
    const formData = new FormData(); // preparing to send to the server
    console.log(audioFile);
    console.log(title);
  
    formData.append('file', audioFile);
    formData.append('name', filename);
    formData.append('title', title)
    formData.append('date', date)

    axios({
      method: 'post',
      url: 'http://localhost:5005/api/mydiary/create',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="main-content">
          <Datetime timeFormat={false} name='date' inputProps={{ style: { width: '200px', height: '30px' } }} value={date} onChange={(date) => setDate(date)} />
          <section className="question-container">
            <h1>"What flower do you like most?"</h1>
          </section>
          <div className="status-btn">
            <AiIcons.AiFillAudio />
          </div>

          <div className="audio-container">
            <audio src={mediaBlobUrl} controls />
          </div>

          <input type="text" name='title' className="title-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />

          <div className="btn-container">
            <button className="start-btn" type='button' onClick={startRecording}> Start </button>
            <button className="stop-btn" type='button' onClick={stopRecording}> Stop </button>
          </div>

          <button className="submit-btn" type="submit"> submit </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddRecording;
