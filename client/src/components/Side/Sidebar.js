import React from 'react'
import Button from '../../Button'
import TimeAgo from 'timeago-react';
const Sidebar = ({subredditposts}) => {
  return (
        <div className='bg-reddit_dark-brighter hidden border ml-20 mt-4 border-reddit_border p-2 rounded w-80 h-80 md:block'>
            <h5 className="text-reddit_text-darker text-sm mb-1 block">About Comunity</h5>
            <h2 className="text-l text-gray-200 mb-3">{subredditposts?.subreddit?.description}</h2>
            <div className='flex text-reddit_text text-sm '>
                <h5 className='inline mr-2'>{subredditposts?.subreddit?.subscriberCount}<br /> Members</h5>
                <h5 className='inline ml-2'>43<br /> Online</h5>
            </div>
            <br />
            <hr></hr>
            <br />
            <h2 className="text-l text-gray-200 mb-3">Created <TimeAgo datetime={subredditposts?.subreddit?.createdAt} /></h2>
            <Button className='w-full h-8'>Create Post</Button>
            <br /><br /><br />
            <h5 className="text-reddit_text-darker text-sm mb-1 block">Community Options</h5>
        </div>
  )
}

export default Sidebar