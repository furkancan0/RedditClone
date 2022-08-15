import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, likePost,dislikePost,getPost,getComments } from '../../actions/posts';
import TimeAgo from 'timeago-react';
import Header from '../../Header';
import Comment from '../Comment/Comment';
import {
    BellIcon,
    ChatIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    TrashIcon,
  } from "@heroicons/react/outline";

const PostDetails = () => {
  const { post, comments} = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    dispatch(getPost(id));
    dispatch(getComments(id));
  }, [id]);
  
  if(!post) return null;

  const goToSub = () => {
    navigate(`r/${post.subreddit.subredditName}`,{ replace: true })
  }

  return (
        <div className='bg-reddit_dark-brighter'>
        <Header/>
            <div className='bg-reddit_dark-brighter flex justify-center'>
                <div className='bg-reddit_dark-brighter h-1/2'>
                <ArrowUpIcon className="text-gray-500 5h-5 w- mt-1 mx-2 mt-3 " onClick={()=> {if(user) dispatch(likePost(post._id))}}/>
                    <h5 className='text-gray-500 5h-5 w- mt-1 mx-2 ml-3'>{post.upvotedBy.length}</h5>
                    <h1 className=' border-b-2 mx-1 border-gray-500'></h1>
                    <h5 className='text-gray-500 5h-5 w- mt-1 mx-2 ml-3'>{post.downvotedBy.length}</h5>
                    <ArrowDownIcon className="text-gray-500 h-5 w-5 mt-1 mx-2 " onClick={()=> {if(user) dispatch(dislikePost(post._id))}}/>
                </div>
                <div className='flex-col justify-center w-2/3 '>
                    <div className='bg-reddit_dark-brighter p-2 '>
                    <a onClick={goToSub} className="text-white text-sm mb-1 inline">r/{post.subreddit.subredditName}</a>
                        <h5 className="text-reddit_text-darker text-sm mb-1"> Posted by u/{post.author.username} <TimeAgo datetime={post.createdAt} /></h5>
                        <h2 className="text-xl text-gray-400 mb-3 mr-3">{post.title}</h2>
                        <div className='text-reddit_text text-sm break-all '>
                            <p className='text-reddit_text-darker inline hover:cursor-pointer break-all '>{post.body}</p>
                            {post.selectedFile && <img src={post.selectedFile} className='object-contain  h-96 w-full'/> }
                        </div>
                    </div>
                    <div className='flex bg-reddit_dark-brighter mx-20'>
                        <ChatIcon className="text-gray-500 h-6 w-6 mt-1 mx-2"/>
                        <BellIcon className="text-gray-500 h-6 w-6 mt-1 mx-2"/>
                        <TrashIcon className="text-gray-500 h-6 w-6 mt-1 mx-2" onClick={() => dispatch(deletePost(post._id))}/>
                    </div>
                    <Comment comments={comments} post={post} />
                </div>
                <div className='bg-reddit_dark-brighter hidden border ml-20 mt-4 border-reddit_border p-2 rounded w-80 h-80 md:block'></div>
            </div>
        </div>
      )
}

export default PostDetails