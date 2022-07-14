import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import listPlugin from '@fullcalendar/list';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddRecording from '../recording/AddRecording';
import styled from 'styled-components';
import './Calendar.css';
import { diaryService } from '../../services/diary.service';
import ShowRecording from '../recording/ShowRecording';

const Calendar = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [eventModalOpen, setEventmodalOpen] = useState(false);
  const [listOfRecordings, setListOfRecordings] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [uploadDate, setUploadDate] = useState('');
  const [uploadTime, setUploadTime] = useState('');
  const [id, setId] = useState('');
  const [url, setUrl] = useState('');

  let calendar_list = [];

  // when you click one event --> get one record 
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

    diaryService
      .getOneRecording(id)
      .then((response) => {
        let url = window.URL.createObjectURL(new Blob([response.data]));
        setUrl(url);
      })
      .catch((err) => console.log(err));

    setTitle(daily_record[0].title);
    setDate(daily_record[0].date);
    setUploadDate(uploadDate);
    setUploadTime(uploadHour + ':' + uploadMinute);
    setId(id);
    setEventmodalOpen(true);
  };

  //show all the recordings 
  useEffect(() => {
    diaryService
      .getAllRecordings()
      .then((response) => {
        const recordings = response.data;
        setListOfRecordings(recordings);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  calendar_list = listOfRecordings.map((data) => {
    let title = data.filename.split('|')[0];
    let date = data.filename.split('|')[1];
    let id = data._id;
    let upload_date = data.uploadDate;
    return { title, date, id, upload_date };
  });

  return (
    <section className="main-calendar">
      <div id="full-calendar">
        <FullCalendar
          plugins={[dayGridPlugin, listPlugin]}
          headerToolbar={{
            start: 'today ,prev',
            center: 'title',
            end: 'next, dayGridMonth,listMonth',
          }}
          initialView="dayGridMonth"
          events={calendar_list}
          eventColor="#DDBED0"
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
        listOfRecordings={listOfRecordings}
        setlistOfRecordings={setListOfRecordings}
        onClose={() => {
          setModalOpen(false);
        }}
      />
      <ShowRecording
        title={title}
        date={date}
        uploadDate={uploadDate}
        uploadTime={uploadTime}
        id={id}
        url={url}
        isOpen={eventModalOpen}
        listOfRecordings={listOfRecordings}
        setListOfRecordings={setListOfRecordings}
        onClose={() => setEventmodalOpen(false)}
      />
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
  font-family: 'Karla';
  font-weight: 600;
  color: black;
`;

export default Calendar;
