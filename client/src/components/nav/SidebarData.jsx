import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
        title: 'Home',
        path:'/',
        icon: <AiIcons.AiFillHome/>,
        cName : 'nav-text'
    },
    {
        title: 'My Diary',
        path:'/mydiary',
        icon: <FaIcons.FaBookOpen/>,
        cName : 'nav-text'
    },
    {
        title: 'Our Diary',
        path:'/',
        icon: <IoIcons.IoMdPeople/>,
        cName : 'nav-text'
    },
]