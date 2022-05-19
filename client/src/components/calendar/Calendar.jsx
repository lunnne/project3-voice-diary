import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import listPlugin from '@fullcalendar/list';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddRecording from '../recording/AddRecording';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import './Calendar.css';
import axios from 'axios';
import ShowRecording from '../recording/ShowRecording';

const Calendar = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [eventModalOpen, setEventmodalOpen] = useState(false);
  const [listOfRecordings, setListOfRecordings] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [uploadDate, setUploadDate] = useState('');
  const [uploadTime, setUploadTime] = useState('');
  const [id, setId] = useState('')
  const [url, setUrl]=useState('')
  const navigate = useNavigate();
  let calendar_list = [];




  const openModal = (id) => {
    let daily_record = calendar_list.filter((record) => {
      if (record.id == id) {
        return record;
      }
    });

    let uploadDate = daily_record[0].upload_date.split('T')[0];
    let uploadTime = daily_record[0].upload_date.split('T')[1];
    let uploadHour = uploadTime.split(':')[0];
    let uploadMinute = uploadTime.split(':')[1];

    axios({
        url: `http://localhost:5005/api/mydiary/${id}`, //your url
        method: 'GET',
        responseType: 'blob', // important
    }).then((response) => {
        let url = window.URL.createObjectURL(new Blob([response.data]));
        setUrl(url)
    }).catch(err=>console.log(err))  

    // let day = "AM"
    // if (hour >= 12){
    //   day = "PM"
    // }
    // if(hour > 12){
    //   hour = (hour-12)
    // }
    setTitle(daily_record[0].title);
    setDate(daily_record[0].date);
    setUploadDate(uploadDate);
    setUploadTime(uploadHour + ':' + uploadMinute);
    setId(id)
    // setDay(day)
    setEventmodalOpen(true);
  };

 

  useEffect(() => {  
    axios
      .get('http://localhost:5005/api/mydiary')
      .then((response) => {
        const recordings = response.data;
        setListOfRecordings(recordings);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


   const deleteEvent = (updatedEvent) => {
    setListOfRecordings(updatedEvent)
  }


  calendar_list = listOfRecordings.map((data) => {
    let title = data.filename.split('|')[0];
    let date = data.filename.split('|')[1];
    let id = data._id;
    let upload_date = data.uploadDate;
    return { title, date, id, upload_date };
  });



  return (
    <section className="main-calendar">
      <div className="full-calendar">
        <FullCalendar
          plugins={[dayGridPlugin, listPlugin]}
          headerToolbar={{
            start: 'today ,prev',
            center: 'title',
            end: 'next, dayGridMonth,listMonth',
          }}
          initialView="dayGridMonth"
          events={calendar_list}
          eventColor= '#E1C0FF'
          eventClick={(info) => {
            openModal(info.event.id);
          }}
        />
      </div>
      <AddBtn>
        <Fab
          aria-label="add"
          variant="extended"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <AddIcon />
          <Word>Add Recording</Word>
        </Fab>
      </AddBtn>
      <AddRecording
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
      <ShowRecording title={title} date={date} uploadDate={uploadDate} uploadTime={uploadTime} id={id} url={url} isOpen={eventModalOpen} deleteEvent={deleteEvent} onClose={() => setEventmodalOpen(false)} />
    </section>
  );
};

const AddBtn = styled.div`
  position: fixed;
  right: 20px;
  bottom: 300px;
  z-index: 10;
`;

const Word = styled.span`
  color: black;
`;

export default Calendar;
