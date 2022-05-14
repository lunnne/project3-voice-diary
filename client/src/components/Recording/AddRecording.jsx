import { useReactMediaRecorder } from 'react-media-recorder';
import React, { useEffect, useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import './Recording.css';
import axios from 'axios';

const AddRecording = (props) => {
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    type: 'audio/wav',
  });

  const handleSave = async () => {
    const audioBlob = await fetch(mediaBlobUrl).then((res) => res.blob());
    const audioFile = new File([audioBlob], 'audiofile.wav', { type: 'audio/wav' });
    const formData = new FormData(); // preparing to send to the server
    const filename = 'test';
    console.log(audioFile);
    formData.append('name', filename);
    formData.append('file', audioFile);

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
    <div className="main-content">
      <section className="question-container">
        <p>Today's Topic</p>
        <h1>"What flower do you like most?"</h1>
      </section>
      <div className="status-btn">
        <AiIcons.AiFillAudio />
      </div>

      <div className="audio-container">
        <audio src={mediaBlobUrl} controls />
      </div>

      <div className="btn-container">
        <button className="start-btn" onClick={startRecording}>
          Start
        </button>
        <button className="stop-btn" onClick={stopRecording}>
          Stop
        </button>
      </div>

      <button className="submit-btn" onClick={handleSave}>submit</button>
    </div>
  );
};

export default AddRecording;
