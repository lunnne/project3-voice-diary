import React from 'react';
import Modal from 'react-modal';
import './Recording.css';
import stars from '../../assets/stars.png'
import pen from '../../assets/pen.png'
import { diaryService } from '../../services/diary.service';



const ShowRecording = (props) => {
  const {
    isOpen,
    onClose,
    title,
    date,
    uploadDate,
    uploadTime,
    url,
    id,
    listOfRecordings,
    setListOfRecordings,
  } = props;

  const handleDelete = () => {
    diaryService.deleteRecording(id)
      .then((response) => {
        const deletedList = listOfRecordings.filter(
          (record) => record._id !== response.data.file._id
        );
        setListOfRecordings(deletedList);
      })
      .catch((err) => {
        console.log(err);
      });

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
          width: '35%',
          height: '55%',
          border: '2px solid #444444',
          background: '#FAF9F5',
          // overflow: 'hidden',
          borderRadius: '2rem',
          outline: 'none',
        },
      }}
    >
      <div className="show-container">
        <div className="text-group" id="date-text">
          {date}
        <hr className='text-line'/>
        </div>
        <div className="text-group" id="show-title">
          <img src={pen} alt="stars" style={{ width : '10%', marginRight: '1rem'}}/>
           {title}
        </div>
        <audio className='text-group' src={url} controls />
        <p className='text-group' style={{fontFamily :'Caveat Brush', fontSize:'1rem' }}>
        <img src={stars} alt="stars" style={{ width : '7%', marginRight: '5px'}}/>
          Create at : {uploadDate} {uploadTime}
        </p>
        <button onClick={handleDelete} type='submit' className="delete-btn">
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default ShowRecording;
