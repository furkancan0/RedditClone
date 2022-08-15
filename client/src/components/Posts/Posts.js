import React from 'react'
import { useSelector } from 'react-redux'

import Post from './Post/Post'

const Posts = () => {
  const { posts} = useSelector( (state)=>state.posts );

  return (
    !posts.length ? 
    <div className="flex items-center justify-center w-[672px] bg-reddit_dark h-screen">
      <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
    </div> : (
    <div>
        {posts.map((post) => (
          <div key={post._id}><Post post={post}/></div>)
        )}
    </div>
    )
  )
}

export default Posts