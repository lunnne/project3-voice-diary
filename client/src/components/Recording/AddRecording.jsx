import { useReactMediaRecorder } from 'react-media-recorder';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Modal from 'react-modal';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import * as AiIcons from 'react-icons/ai';
import './Recording.css';
import airplain from '../../assets/airplain.png';
import { diaryService } from '../../services/diary.service';

const AddRecording = ({ isOpen, onClose, setlistOfRecordings, listOfRecordings }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(moment());
  const [quote, setQuote] = useState('');

  const { status, startRecording, stopRecording, clearBlobUrl, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    type: 'audio/wav',
  });

  const getQuote = () => {
    diaryService
      .getQuote()
      .then((response) => {
        let randomNum = Math.floor(Math.random() * response.data.length);
        setQuote(response.data[randomNum]);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getQuote();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const audioBlob = await fetch(mediaBlobUrl).then((res) => res.blob());

    let newDate = date.format('YYYY-MM-DD');
    const filename = title + '|' + newDate;
    const audioFile = new File([audioBlob], `${filename}.wav`, { type: 'audio/wav' });
    const formData = new FormData(); // preparing to send to the server

    formData.append('file', audioFile);
    formData.append('name', filename);

    axios({
      method: 'post',
      url: `http://localhost:5005/api/mydiary/create`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => setlistOfRecordings([...listOfRecordings, response.data]))
      .catch((err) => console.log(err));

    setTitle('');
    clearBlobUrl();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      style={{
        overlay: {
          position: 'fixed',
          backgroundColor: '#f2f1ed',
          zIndex: 20,
        },
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          height: '80%',
          border: '2px solid #444444',
          background: '#FAF9F5',
          borderRadius: '2rem',
          outline: 'none',
        },
      }}
    >
      <form className="main-container" encType="multipart/form-data" onSubmit={handleSubmit}>
        <Datetime
          timeFormat={false}
          name="date"
          inputProps={{
            style: {
              fontFamily: 'Quantico',
              fontWeight: 700,
              fontSize: 30,
              height: '3rem',
              background: 'none',
              border: 'none',
            },
          }}
          value={date}
          onChange={(date) => setDate(date)}
        />
        <section className="question-container form-group">
          <h1>{quote.text}</h1>
          <p>-{quote.author}</p>
        </section>

        <div className="form-group">
          <div className="status-btn">
            <AiIcons.AiFillAudio />
          </div>
        </div>

        {status === 'stopped' && (
          <div className="audio-container">
            <audio src={mediaBlobUrl} controls />
          </div>
        )}
        <div className="form-group">
          <input type="text" name="title" id="title-text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        </div>

        <div className="btn-container form-group">
          <button className="start-btn" type="button" style={{ fontSize: '1rem' }} onClick={startRecording}>
            Start
          </button>
          <button className="stop-btn" type="button" style={{ fontSize: '1rem' }} onClick={stopRecording}>
            Stop
          </button>
        </div>

        <button onClick={getQuote} id="submit-btn" style={{ background: 'none' }} type="submit">
          <img src={airplain} alt="stars" style={{ width: '50%' }} />
        </button>
      </form>
    </Modal>
  );
};

export default AddRecording;
