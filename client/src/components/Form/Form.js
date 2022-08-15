import React, { useState, useEffect } from 'react'
import Button from '../../Button';
import Input from '../../Input';
import { XIcon } from '@heroicons/react/outline';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { getOneSubredditId } from '../../actions/subreddit';
import { useNavigate,useParams } from "react-router-dom";
const Form = () => {
    const { sub } = useParams();
    const [ postData, setPostData] = useState({title:'',body:'',selectedFile:'',subreddit:''});
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();

    useEffect(async()=> {
        const subr = await dispatch(getOneSubredditId(sub));
        setPostData({...postData,subreddit:subr._id})
    },[sub]);

    const handleSubmit = (e) => {
        e.preventDefault(); 
        dispatch(createPost(postData,navigate));
        clear();
    }

    const clear = ()=>{
        setPostData({title:'',body:'',selectedFile:''});
    }
    
    return (
        <div >  
        {user?.result?.name ?<div className="w-screen h-screen fixed top-0 left-0 z-30 flex " style={{backgroundColor:'rgba(0,0,0,.8)'}}>
            <div className='border border-reddit_dark-brightest w-3/4 md:w-2/4 bg-reddit_dark p-5 text-reddit_text self-center mx-auto rounded-md '>
                    <h1 className='text-2xl mb-5 flex-auto' >Please Sign in to create post.</h1>
                    <XIcon className=" w-7 h-5 mt-2 rounded hover:bg-gray-600 active:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300" onClick={() =>{}}/>
                </div> </div>: 

            <div className="absolute w-screen h-screen  top-0 left-0 z-30 flex block" style={{backgroundColor:'rgba(0,0,0,.8)'}}>
                <div className='border border-reddit_dark-brightest w-3/4 md:w-2/4 bg-reddit_dark p-5 text-reddit_text self-center mx-auto rounded-md '>
                
                <div className='flex'>
                    <h1 className='text-2xl mb-5 flex-auto' >Creating a post</h1>
                    <XIcon className=" w-7 h-5 mt-2 rounded hover:bg-gray-600 active:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300" onClick={() =>{
                        clear();
                        navigate('/',{ replace: true });
                    }}/>
                </div>
                <form onSubmit={handleSubmit}>
                    <Input className={'w-full mb-3'} type="text" placeholder={"Title"} value={postData.title} onChange={e => setPostData({...postData,title:e.target.value})}/>
                    <textarea className="w-full bg-reddit_dark-brighter text-reddit_text p-2 mb-3 border border-reddit_dark-brightest rounded-md block break-all " 
                    placeholder="Text" value={postData.body} onChange={e => setPostData({...postData,body:e.target.value})}>
                    </textarea>
                    <div className="w-full bg-reddit_dark-brighter text-reddit_text p-2 border border-reddit_dark-brightest rounded-md block" >
                        <FileBase type="file" multiple={false} onDone= {({base64})=> setPostData({...postData, selectedFile: base64})} />
                    </div>
                    <div className='text-right'>
                        <Button className={ 'px-4 py-2 mt-2' } >POST</Button>
                    </div>
                </form>
            </div>
        </div>}        
        </div>   
    )
}

export default Form