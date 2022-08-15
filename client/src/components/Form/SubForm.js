import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import Button from '../../Button';
import Input from '../../Input';
import { XIcon } from '@heroicons/react/outline';
import { createSubreddit } from '../../actions/subreddit';

const SubForm = ({subform,setSubform}) => {
    const [ subData, setSubtData] = useState({subredditName:'',description:''});
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createSubreddit(subData));
        clear();
    }

    const clear = ()=>{
        setSubtData({subredditName:'',description:''});
    }

    return (
        <div className={"w-screen h-screen fixed top-0 left-0 z-30 flex "+subform} style={{backgroundColor:'rgba(0,0,0,.8)'}}>
            <div className='border border-reddit_dark-brightest w-3/4 md:w-2/4 bg-reddit_dark p-5 text-reddit_text self-center mx-auto rounded-md '>
                <div className='flex'>
                    <h1 className='text-2xl mb-5 flex-auto' >Creating a post</h1>
                    <XIcon className=" w-7 h-5 mt-2 rounded hover:bg-gray-600 active:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300" onClick={() =>{
                        setSubform('hidden');
                        clear();
                    }}/>
                </div>
                <form onSubmit={handleSubmit}>
                    <Input className={'w-full mb-3'} type="text" placeholder={"Subreddit Name"} value={subData.subredditName} onChange={e => setSubtData({...subData,subredditName:e.target.value})}/>
                    
                    <textarea className="w-full bg-reddit_dark-brighter text-reddit_text p-2 mb-3 border border-reddit_dark-brightest rounded-md block break-all " 
                    placeholder="Text" value={subData.description} onChange={e => setSubtData({...subData,description:e.target.value})}>
                    </textarea>

                    <div className='text-right'>
                        <Button className={ 'px-4 py-2 mt-2' } onClick={()=> setSubform ('hidden')}>Create Subreddit</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SubForm