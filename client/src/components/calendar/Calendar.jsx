import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import listPlugin from '@fullcalendar/list';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddRecording from '../recording/AddRecording';
import styled from 'styled-components';
import './Calendar.css';
import axios from 'axios';

const Calendar = (props) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [listOfRecordings, setListOfRecordings] = useState([]);

useEffect(() => {
    axios.get('http://localhost:5005/api/mydiary/recordings')
        .then(response => {
            const recordings = response.data;
            // setListOfProjects(projects);
            console.log(recordings)
        })
        .catch(err => {
            console.log(err)
        });
}, []);


  // const calendarRef = useRef(null);

  // const onRecordAdded = (event) => {
  //   let calendarApi = calendarRef.current.getApi();
  //   calendarApi.addEvent(event);
  // };




  return (
    <section className="main-calendar">
      <div className="full-calendar" style={{ position: 'relative', zIndex: -1 }}>
        <FullCalendar
          headerToolbar={{
            start: 'today ,prev',
            center: 'title',
            end: 'next, listWeek',
          }}
          events={[
            { title: 'event 1', date: '2022-05-01' },
            { title: 'event 2', date: '2022-05-03' }
          ]}
          plugins={[dayGridPlugin, listPlugin]}
          initialView="dayGridMonth"
        />
      </div>
        <AddBtn>
          <Fab aria-label="add" variant="extended" onClick={()=> {setModalOpen(true)}}>
            <AddIcon />
            <Word>Add Recording</Word>
          </Fab>
        </AddBtn>
        <AddRecording isOpen={modalOpen} onClose={()=> {setModalOpen(false)}} />
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
