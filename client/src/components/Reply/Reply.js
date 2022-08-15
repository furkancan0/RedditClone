import React,{useState, useEffect} from 'react'
import { XIcon } from '@heroicons/react/outline';
import { useDispatch } from 'react-redux';
import {addReply} from '../../actions/posts';
import Avatar1 from '../../images/avatar1.png';
import TimeAgo from 'timeago-react';
import {
    ArrowDownIcon,
    ArrowUpIcon,
    TrashIcon,
    DotsHorizontalIcon,
  } from "@heroicons/react/outline";
const Reply = ( {showReplyForm,setShowReplyForm, id, comment} ) => {
  const dispatch = useDispatch();
  const [reply, setReply] = useState('')
  const [replies, setReplies] = useState(comment.replies)

  const handleSubmit = async(e) => {
    e.preventDefault(); 
    const data = await dispatch(addReply(reply,id,comment._id));
    setReplies([...replies, data])
    setShowReplyForm(false);
    setReply('')
  }

  return (
    <>
        {comment._id === showReplyForm  &&(
        <form onSubmit={handleSubmit} className='border-l-2 border-slate-400 border-text-darker px-3 ml-4'>
            <textarea onChange={(e)=> setReply(e.target.value)} value={reply} className='mt-2 w-1/2 h-36 mb-2 bg-reddit_dark-brighter  text-reddit_text p-2 border border-gray-200 rounded-md block'></textarea>
            <button className='bg-gray-300 rounded-full text-sm px-2'>Reply</button>
            <XIcon className="text-gray-500 h-6 w-6 mx-2 inline" onClick={()=>setShowReplyForm(false)}/>
        </form>
        )}
        {replies?.map((r, i) => (
            <div key={i} >
                <div className='ml-8 mb-5'>
                    <div className='flex mb-1'>
                        <div className='bg-reddit_text w-8 h-8 overflow-hidden rounded-full mr-2 '>
                            <img src={Avatar1}alt=""/>
                        </div>
                        <div className='leading-8 px-1 text-sm font-sans text-gray-300'>
                            {r.repliedBy.username}
                        </div>
                        <TimeAgo className='leading-8 px-1 text-xs  font-sans text-reddit_text-darker' datetime={r.createdAt}/>
                    </div>
                    <div className='border-l-2 border-slate-400 border-text-darker px-3 ml-4'>
                        <div className='ml-3 text-sm text-gray-200'>{r.replyBody}</div>
                            <div className='flex'>
                                <ArrowUpIcon className="text-gray-500 5h-5 w-4 ml-3 mt-1 hover:bg-reddit_dark-brightest " />
                                <ArrowDownIcon className="text-gray-500 5h-5 w-4 ml-3 mt-1 hover:bg-reddit_dark-brightest "/>
                                <DotsHorizontalIcon className="text-gray-500 h-6 w-6 mt-1 mx-2" onClick={() => {}}/>
                                <TrashIcon className="text-gray-500 h-6 w-6 mt-1 mx-2" onClick={() => {}}/>
                            </div>
                    </div>
                </div>
            </div>
        ))}
    </>
  )
}

export default Reply