import React, { useState, useEffect } from 'react'
import Button from '../../Button'
import { useDispatch} from 'react-redux';
import { useSelector } from 'react-redux'
import { getTopSubreddits } from '../../actions/subreddit';
const SubRedSide = () => {
    const dispatch = useDispatch();
    const { subreddit } = useSelector( (state)=>state.subreddit );

    useEffect(() => {
        dispatch(getTopSubreddits());
    },[])
    
  return (
    <aside class="w-64" aria-label="Sidebar">
        <div className='bg-reddit_dark-brighter hidden border ml-4 mt-4 border-reddit_border p-2 ml-6 rounded w-80 h-80 md:block'>
        <ul class="space-y-2">
        <li className='flex items-center p-2 text-base font-normal text-gray-400 rounded-lg '>Top 10 Subreddit</li>
        {subreddit?.map((s, i) => (
            <div key={i} >
                <li>
                    <a href={`r/${s.subredditName}`} class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg border-b-2 border-gray-500 dark:text-white hover:bg-reddit_dark-brightest dark:hover:bg-gray-700">
                        <span class="flex-1 ml-3 text-gray-100 whitespace-nowrap">{s.subredditName}</span>
                        <span class="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">{s.subscriberCount}</span>
                    </a>
                </li>
            </div>))}
        </ul>
        </div>
    </aside>
  )
}

export default SubRedSide