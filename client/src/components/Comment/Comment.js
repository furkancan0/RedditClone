import React,{useState, useEffect} from 'react'
import Avatar1 from '../../images/avatar1.png';
import TimeAgo from 'timeago-react';
import Button from '../../Button';
import {deleteComment,updateComment,commentPost} from '../../actions/posts';
import { useDispatch } from 'react-redux';
import {
    BellIcon,
    ChatIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    TrashIcon,
    DotsHorizontalIcon,
  } from "@heroicons/react/outline";
import { XIcon } from '@heroicons/react/outline';
import Reply from '../Reply/Reply';
const Comment = ( {post,comments} ) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [updateValue, setUpdateValue] = useState('');
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');

    const handleDelete = (id) => {
        dispatch(deleteComment(post._id,id));

    }

    const handleUpdateForm = (id) => {
        setShowUpdateForm(id)
        setShowReplyForm(false)
    }

    const handleReplyForm = (id) => {
        setShowReplyForm(id)
        setShowUpdateForm(false)
    }
   
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(commentPost(comment,post._id));
    }

    const handleUpdateSubmit = (id) => {
        //dispatch(updateComment(post._id,id,updateValue));
    }
  
  return (
    <>
    <form className='mx-20' onSubmit={handleSubmit} >
        <textarea onChange={(e)=> setComment(e.target.value)} value={comment} className='mx-auto mt-2 w-full h-36 mb-2 bg-reddit_dark-brighter  text-reddit_text p-2 border border-gray-200 rounded-md block'></textarea>
        <div className='text-right '>
            <button className='bg-gray-300 rounded-full px-3'>Comment</button>
        </div>
    </form> 

    {comments?.map((c, i) => (
        <div key={i} >
            <div className='ml-8 mb-5'>
                <div className='flex mb-1'>
                    <div className='bg-reddit_text w-8 h-8 overflow-hidden rounded-full mr-2 '>
                        <img src={Avatar1}alt=""/>
                    </div>
                    <div className='leading-8 px-1 text-sm font-sans text-gray-300'>
                        {c.commentedBy.username}
                    </div>
                    <TimeAgo className='leading-8 px-1 text-xs  font-sans text-reddit_text-darker' datetime={c.createdAt}/>
                </div>
                <div className='border-l-2 border-slate-400 border-text-darker px-3 ml-4'>
                    <div className='ml-3 text-sm text-gray-200'>{c.commentBody}</div>
                        <div className='flex'>
                            <ArrowUpIcon className="text-gray-500 5h-5 w-4 ml-3 mt-1 hover:bg-reddit_dark-brightest " />
                            <ArrowDownIcon className="text-gray-500 5h-5 w-4 ml-3 mt-1 hover:bg-reddit_dark-brightest "/>
                            <button onClick={() => handleReplyForm(c._id)} 
                            className='bg-reddit_darker text-reddit_text-darker border-0 ml-2 p-1 border-gray-600 mt-1 text-xs hover:bg-reddit_dark-brightest' ><ChatIcon className="text-gray-500 5h-5 w-5 inline"/> Reply</button>
                            <DotsHorizontalIcon className="text-gray-500 h-6 w-6 mt-1 mx-2" onClick={() => handleUpdateForm(c._id)}/>
                            <TrashIcon className="text-gray-500 h-6 w-6 mt-1 mx-2" onClick={() => handleDelete(c._id)}/>
                        </div>
                        {c._id === showUpdateForm && !showReplyForm &&(
                            <form onSubmit={() => handleUpdateSubmit(c._id)}  className='border-l-2 border-slate-400 border-text-darker px-3 ml-4'>
                                <textarea onChange={(e)=> setUpdateValue(e.target.value)} value={updateValue} className='mt-2 w-1/2 h-36 mb-2 bg-reddit_dark-brighter  text-reddit_text p-2 border border-gray-200 rounded-md block'></textarea>
                                <button className='bg-gray-300 rounded-full text-sm px-2'>Update</button>
                                <XIcon className="text-gray-500 h-6 w-6 mx-2 inline" onClick={()=>setShowUpdateForm(false)}/>
                            </form>
                        )}

                        <Reply comment={c} id={post._id} setShowReplyForm={setShowReplyForm} showReplyForm={showReplyForm} />

                </div>
            </div>
        </div>
    ))}
    </>
  )
}

export default Comment