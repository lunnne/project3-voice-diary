import { useReactMediaRecorder } from 'react-media-recorder';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import * as AiIcons from 'react-icons/ai';
import './Recording.css';
import axios from 'axios';

const ShowRecording = ({isOpen, onClose, title, date, uploadDate, uploadTime, url, id }) => {

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false} style={{ overlay: { zIndex: 20 } }}>
    
     <div>title : {title}</div>
     <p>{date}</p>
     <p>{uploadDate}</p>
     <p>{uploadTime}</p>
     <p>{id}</p>
     <audio src={url} controls autoPlay/>
    </Modal>
  )
}

export default ShowRecording;