import React from 'react';
import Button from '../../Button';
import { useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { useDispatch} from 'react-redux';
import { signin, signup } from '../../actions/auth';
import { useNavigate } from "react-router-dom";
const AuthModal = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [ postData, setPostData] = useState({email:'',username:'',password:'',confirmPassword:''});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp) {
            dispatch(signup(postData,navigate));
        }else{
            
            dispatch(signin(postData, navigate));
        }
    }

    const changeAuth = () => {
        setPostData({email:'',username:'',password:'',confirmPassword:''});
        setIsSignUp(!isSignUp);
    }

    return (
    <div className="w-screen h-screen fixed top-0 left-0 z-30 flex " style={{backgroundColor:'rgba(0,0,0,.6)'}}>
        <div className='border border-reddit_dark-brightest w-3/4 sm:w-1/2 lg:w-1/4 bg-reddit_dark p-5 text-reddit_text self-center mx-auto rounded-md '>
            <div className='flex '>
                {!isSignUp && (
                    <h1 className="text-2xl mb-5 flex-auto">Login</h1>
                )}
                {isSignUp &&(
                    <h1 className="text-2xl mb-5 flex-auto">Sign up</h1> 
                )}
                <XIcon className="w-7 h-5 mt-2 rounded hover:bg-gray-600 active:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300" onClick={() => navigate(`/`)}/>
            </div>
            <form onSubmit={handleSubmit}>
            {isSignUp ? <div className="mb-4 relative group">
                <input type="text" id="username" autoComplete="off" value={postData.username} onChange={e => setPostData({...postData,username:e.target.value})}required className="w-full h-10 px-2 text-sm peer outline-none bg-reddit_dark-brighter text-reddit_text p-2 border border-reddit_dark-brightest rounded-md block"/>
                <label htmlFor="username" autoComplete="off" className="cursor-auto transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 text-gray-400">Username</label>
            </div>:null}
            
            <div className="mb-4 relative group">
                    <input type="text" id="email" autoComplete="off" value={postData.email} onChange={e => setPostData({...postData,email:e.target.value})} required className="w-full h-10 px-2 text-sm peer outline-none bg-reddit_dark-brighter text-reddit_text p-2 border border-reddit_dark-brightest rounded-md block"/>
                    <label htmlFor="email" autoComplete="off" className="cursor-auto transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 text-gray-400 ">E-mail</label>
            </div>

            <div className="mb-3 relative group">
                <input type="password" id="password" autoComplete="off" value={postData.password} onChange={e => setPostData({...postData,password:e.target.value})} required className="w-full h-10 px-2 text-sm peer outline-none bg-reddit_dark-brighter text-reddit_text p-2 border border-reddit_dark-brightest rounded-md block"/>
                <label htmlFor="password" autoComplete="off" className="cursor-auto transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 text-gray-400">Password</label>
            </div>
            {isSignUp ? <div className="mb-3 relative group">
                <input type="password" id="confirmPassword" autoComplete="off" value={postData.confirmPassword} onChange={e => setPostData({...postData,confirmPassword:e.target.value})} required className="w-full h-10 px-2 text-sm peer outline-none bg-reddit_dark-brighter text-reddit_text p-2 border border-reddit_dark-brightest rounded-md block"/>
                <label htmlFor="confirmPassword" autoComplete="off" className="cursor-auto transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 text-gray-400">Confirm Password</label>
            </div>:null}

            
                {isSignUp ? (<Button className="w-full py-2 mb-3" type='submit' style={{borderRadius:'.3rem'}} onClick={() => {}} >Sign Up</Button>)
                :(<Button className="w-full py-2 mb-3" type='submit' style={{borderRadius:'.3rem'}} onClick={() => {}}>Log In</Button>)}
                </form>
                <h2 onClick={changeAuth} className='cursor-pointer'>
                { isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign Up" }
                </h2>
            
        </div>
    </div>);
    };

export default AuthModal;
