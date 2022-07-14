import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

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
]