import React, { useState, useEffect } from 'react';
import Logo from './images/logo.png'
import Avatar from './images/avatar1.png'
import Button from './Button';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { getPostsBySearch } from './actions/posts';
import {
    BellIcon,
    ChatIcon,
    ChevronDownIcon,
    LoginIcon,
    LogoutIcon,
    PlusIcon,
    SearchIcon,
    UserIcon
} from "@heroicons/react/outline";
const Header = ({setSubform}) => {
    const [dropdownVisibility,setDropdownVisibility] = useState('hidden');
    const dispatch = useDispatch();
    let navigate = useNavigate(); 
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({ type:'LOGOUT'});
        navigate(`/`)
        setUser(null);
    };
    
    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [navigate]);

    function toggleDropdown(){
        if (dropdownVisibility === 'hidden'){
            setDropdownVisibility('block');
        }else{
            setDropdownVisibility('hidden');
        }
    }

    const searchPost = () => {
        if(searchQuery.trim()){
            dispatch(getPostsBySearch(searchQuery));
            navigate(`/posts/search?searchQuery=${searchQuery || 'none'}`);
        }else{
            navigate('/')
        }
    }

    return (
        <header className=' bg-reddit_dark-brighter p-2 overflow:hidden border-b border-reddit_border sticky top-0 z-50'>
            <div className='mx-4 flex relative justify-between'>
                <img src={Logo} alt=''  className='w-8 h-8 mr-4 rounded-full ' onClick={() => navigate('/')} />
                <form action='' className="bg-reddit_dark-brightest rounded-md border border-reddit_border mx-4 w-2/5">
                    <SearchIcon className="text-gray-500 h-6 w-6 mt-1 absolute" onClick={searchPost}/>
                    <input type="text" className="bg-reddit_dark-brightest text-sm p-1 pl-5 pr-0 block text-white w-full" placeholder="Search Reddit" onChange={(e) => setSearchQuery(e.target.value)} />
                </form>
                {user?.result?.username && (
                    <div className='ml-auto'>
                    <button className="px-2 py-1">
                        <ChatIcon className="text-gray-400 w-6 h-6 mx-2" />
                    </button>
                    <button className="px-2 py-1">
                        <BellIcon className="text-gray-400 w-6 h-6 mx-2" />
                    </button>
                    <button className="px-2 py-1">
                        <PlusIcon className="text-gray-400 w-6 h-6 mx-2" />
                    </button>
                    </div>
                )}   
                {!user?.result?.username &&(
                    <div className='ml-auto'>
                        <div className='mx-2 hidden sm:block'>
                            <Button outline={1}  className="mr-1 h-8" onClick={() => navigate('../auth',{ replace: true })}>Log In</Button>
                            <Button className='h-8' onClick={() =>navigate('../auth',{ replace: true })}>Sign Up</Button> 
                        </div>
                    </div>
                )}
                <button className="rounded-md ml-4" onClick={() => toggleDropdown()}>
                    <div className="block h-8 rounded-md flex border border-reddit_border">
                        {!user?.result?.username && (
                            <UserIcon className='w-6 h-6 m-1 text-gray-400'/>
                        )}
                        {user?.result?.username&& (
                            <>
                            <img src={Avatar} alt=''  className=' bg-gray-600 rounded-md w-6 h-6 mt-1'/>    
                            <h2 className='text-reddit_text text-xs ml-1 hidden lg:block'>{user?.result?.username}</h2>   
                            </>
                        )}
                        <ChevronDownIcon className="text-gray-200 w-4 h-4 mt-2 m-1 grow"/>                                         
                    </div>
                </button>
                <div className={"absolute right-0 top-8 bg-reddit_dark border border-gray-700 z-10 rounded-md text-reddit_text overflow-hidden "+dropdownVisibility}>
                    {!user?.result?.username && (
                        <button  href='' className='flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black text-sm' onClick={() => navigate('../auth',{ replace: true })}>
                            <LoginIcon className='w-5 h-5 mr-2'/>
                            Log In / Sign Up
                        </button>
                    )}
                    {user?.result?.username && (
                        <>
                        <button onClick={() =>{
                            setSubform('block');
                            setDropdownVisibility('hidden');
                        }} href='' className='flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black text-sm'>
                            <PlusIcon className='w-5 h-5 mr-2'/>
                            Create a Community
                        </button>
                        <div className='hover:bg-gray-300 hover:text-black' >
                            <button onClick={() =>{
                                logout();
                                setDropdownVisibility('hidden');
                            }} href='' className='flex w-50 py-2 px-3  text-sm'>
                                <LogoutIcon className='w-5 h-5 mr-2'/>
                                Logout
                            </button>
                        </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
