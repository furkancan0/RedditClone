import React,{ useState,useEffect } from 'react'
import Header from '../../Header';
import BoardHeader from '../../BoardHeader';
import { useDispatch } from 'react-redux';
import { getPosts, loadMorePosts } from '../../actions/posts';

import Posts from '../Posts/Posts';
import SubForm from '../Form/SubForm';
import Sidebar from '../Side/Sidebar';
import Button from '../../Button';
import Head from '../Head';
import Form from '../Form/Form';
import SubRedSide from '../Side/SubRedSide';

const Home = () => {
    const [subform, setSubform] = useState('hidden');
    const dispatch = useDispatch();
    let page = 1

    useEffect(()=>{
        dispatch(getPosts());
    },[dispatch]);

    const handleMore = async () => {
        dispatch(loadMorePosts(page+1));
        page = page +1;
    }
   
    return (
        <>
            <Header setSubform={setSubform}/>
            <Button className='fixed bottom-2 right-64 h-8 w-32 text-gray-800' onClick={() => window.scrollTo(0, 0)}>Back To Top</Button>
            <div className='flex justify-center bg-reddit_dark h-full'>
                <div>
                    <Head/>
                    <SubForm subform={subform} setSubform={setSubform}/>
                    <Posts className='basis-3/4'/>
                    <Button className='mx-3 '  onClick={handleMore} >Load More</Button>
                </div>
            <SubRedSide />
            </div>
            
        </>  
    )
}

export default Home
