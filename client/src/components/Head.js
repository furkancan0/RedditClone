import React from 'react'
import Avatar1 from '../images/avatar1.png';
import Avatar2 from '../images/avatar2.png';
import Avatar3 from '../images/avatar3.png';
import Avatar4 from '../images/avatar4.png';
import { useNavigate } from "react-router-dom";
import Input from '../Input';
const Head = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    const images= [
        Avatar1,
        Avatar2,
        Avatar3,
        Avatar4,
        ];
    const index = Math.floor(Math.random() * images.length);
  return (
    <div className='mt-4 w-full border border-reddit_border p-2 rounded-md bg-reddit_dark-brighter'>
        <div className=" flex">
            <div className="rounded-full bg-gray-600 overflow-hidden w-9 h-9">
                <img src={images[index]}alt=""/>
            </div>
            <div className="flex-grow bg-reddit_dark-brightest border border-reddit_border ml-4 mr-2 rounded-md">
                <Input type="text" className="bg-reddit_dark-brightest p-2 px-3 text-sm block w-full rounded-md" 
                placeholder="Create Post" onClick={(e) => {
                    e.preventDefault();
                    if(!user) navigate('../auth',{ replace: true });
                    else {
                        navigate('submit');
                    }
                }}/>
            </div>
        </div>
    </div>
  )
}

export default Head