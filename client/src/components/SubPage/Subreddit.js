import React from 'react'
import { useNavigate } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { deletePost, likePost,dislikePost } from '../../actions/posts';
import TimeAgo from 'timeago-react';
import {
  BellIcon,
  ChatIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  DotsHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/outline";
const Subreddit = ({subredditposts}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const openPost = (post) => {
    navigate(`/posts/${post._id}`);

  };

  return (
      <div className='bg-reddit_dark'>
        {!subredditposts && <div className='flex bg-reddit_dark-brighter  rounded-md mt-4 w-[672px] h-[400px]'></div>}
        {subredditposts?.posts?.map((p, i) => (
        <div key={i} >
            <div className='flex bg-reddit_dark-brighter border border-reddit_border rounded-md mt-4 w-[672px] '>
            <div className='bg-reddit_dark-brightest '>
              <ArrowUpIcon className="text-gray-500 5h-5 w- mt-1 mx-2 mt-3 " onClick={()=> {if(user) dispatch(likePost(p._id))}}/>
              <h5 className='text-gray-500 5h-5 w- mt-1 mx-2 ml-3'>{p.upvotedBy.length}</h5>
              <h1 className=' border-b-2 mx-1 border-gray-500'></h1>
              <h5 className='text-gray-500 5h-5 w- mt-1 mx-2 ml-3'>{p.downvotedBy.length}</h5>
              <ArrowDownIcon className="text-gray-500 h-5 w-5 mt-1 mx-2 " onClick={()=> {if(user) dispatch(dislikePost(p._id))}}/>
            </div>
            <div className='bg-reddit_dark-brighter p-2 '>
              <h5 className="text-reddit_text-darker text-sm mb-1"> Posted by u/{p.author.username} <TimeAgo datetime={p.createdAt} /></h5>
              <div onClick={() => openPost(p)} className='cursor-pointer'>
                <h2 className="text-xl text-gray-400 mb-3">{p.title.slice(0,30)}</h2>
                <div className='text-reddit_text text-sm break-all '>
                  <p>
                  {p.body.slice(0,180)}
                  {p.body.length>180 && <p className='text-reddit_text-darker inline hover:cursor-pointer break-all '><u> Read More...</u></p>}
                  </p>
                  {p.selectedFile && <img src={p.selectedFile} className='object-contain  h-96 w-full'/> }
                </div>
              </div>
              <div className='flex justify-start'>
                <ChatIcon  className="text-gray-500 h-6 w-6 mt-1 mx-2"/> <p className='mt-1 text-reddit_text-darker'>{}</p>
                <BellIcon className="text-gray-500 h-6 w-6 mt-1 mx-2"/>
                <TrashIcon className="text-gray-500 h-6 w-6 mt-1 mx-2" onClick={() => dispatch(deletePost(p._id))}/>
                <DotsHorizontalIcon className="text-gray-500 h-5 w-5 mx-3 mt-1 " onClick={() => {}}/>
              </div>
            </div>
          </div> 
        </div>
        ))}
      </div>  
  )
}

export default Subreddit