import React, { memo } from 'react';

const Avatar = memo(({ name }) => (
  <div className='avatar-container'>
      <div className='avatar-txt'>{name.charAt(0)}</div>
      <p className="avatar-txt-right">@{name}</p>
  </div>
));

export default Avatar;
