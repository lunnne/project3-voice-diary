import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import listPlugin from '@fullcalendar/list';
import AddRecord from '../Recording/CreateDiary';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import './Calendar.css';

const Calendar = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const calendarRef = useRef(null);
  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent(event);
  };

  return (
    <section className="main-calendar">
      <div className="full-calendar" style={{ position: 'relative', zIndex: 0 }}>
        <FullCalendar
          ref={calendarRef}
          headerToolbar={{
            start: 'today ,prev',
            center: 'title',
            end: 'next, listWeek',
          }}
          plugins={[dayGridPlugin, listPlugin]}
          initialView="dayGridMonth"
        />
      </div>
      <Link to="/mydiary/create">
        <AddBtn>
          <Fab aria-label="add" variant="extended">
            <AddIcon />
            <Word>Add Recording</Word>
          </Fab>
        </AddBtn>
      </Link>
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
