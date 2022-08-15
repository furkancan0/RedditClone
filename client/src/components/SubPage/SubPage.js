import React,{ useState,useEffect } from 'react'
import {useParams } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import Subreddit from './Subreddit'
import Head from '../Head';
import Header from '../../Header'
import Sidebar from '../Side/Sidebar';
import BoardHeader from '../../BoardHeader';
import Button from '../../Button';
import { getSubredditPosts,subscribeToSubreddit,getSubredditUsers } from '../../actions/subreddit';

const SubPage = () => {
  const { sub } = useParams();
  const { subredditposts } = useSelector( (state)=>state.subreddit );
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [isSub, setIsSub] = useState('')
  
  useEffect(async()=> {
    dispatch(getSubredditPosts(sub));
    const  data  = await dispatch(getSubredditUsers(sub));
    const foundUser = data.subscribedBy.find(c => c === user.result._id)
    setIsSub(foundUser)
  },[sub]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    dispatch(subscribeToSubreddit(subredditposts.subreddit._id))
    setIsSub(!isSub)
  }

  return (
    <div className='bg-reddit_dark h-full'>
      <form onSubmit={handleSubscribe}>
        {!isSub ? <Button className='absolute top-40 right-60 z-10 h-8 w-32 text-gray-800' >Join</Button>:
        <Button className='absolute top-40 right-60 z-10 h-8 w-32 border-2 border-red-600  text-red-800' >Leave</Button>}
      </form>
      <Header/>
      <BoardHeader/>
      <div className='flex flex justify-center bg-reddit_dark '>
        <div><Head/><Subreddit subredditposts={subredditposts}/></div>
        <div><Sidebar subredditposts={subredditposts}/></div>
      </div>
    </div>
  )
}

export default SubPage