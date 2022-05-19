import { useReactMediaRecorder } from 'react-media-recorder';
import React, { useEffect, useStatem } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import * as AiIcons from 'react-icons/ai';
import './Recording.css';
import axios from 'axios';

const ShowRecording = (props) => {

  const {isOpen, onClose, title, date, uploadDate, uploadTime, url, id, deleteEvent} =props

  const handleDelete = (id) => {
    console.log(id);
    axios
    .delete(`http://localhost:5005/api/mydiary/${id}`)
    .then((response) => {
       console.log(response.data);
     
    })
    .catch((err) => {
      console.log(err); 
    });

    onClose()
  }
  
  
  
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false} style={{ overlay: { zIndex: 20 } }}>
    
     <div>title : {title}</div>
     <p>{date}</p>
     <p>{uploadDate}</p>
     <p>{uploadTime}</p>
     <p>{id}</p>
     <audio src={url} controls/>
     <button onClick={()=>handleDelete(id)} className='delete-btn'>Delete</button>
    </Modal>
  )
}

export default ShowRecording;