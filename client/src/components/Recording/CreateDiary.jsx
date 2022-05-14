import React, { useState } from 'react';

const CreateDiary = () => {
  const [title, setTitle] = useState('');
  // const [start, setStart] = useState(new Date())
  // const [end, setEnd] = useState(new Date())

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}></form>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add recording</button>
    </div>
  );
};

export default CreateDiary;
