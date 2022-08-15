import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import SubPage from './components/SubPage/SubPage';
import Form from './components/Form/Form';

const App = () => (
    <Router >
        <Routes>
            <Route path="/" element={<Navigate replace to="/posts" />} />
            <Route path="/posts" element={<Home/>} />
            <Route path="posts/search" exact element={<Home/>} />
            <Route path="/posts/:id" exact element={<PostDetails/>} />
            <Route path="/auth" element={<Auth/>} />
            <Route path="/r/:sub" element={<SubPage/>} />
            <Route path="/r/:sub/submit" element={<Form/>} />
        </Routes>
    </Router>
);

export default App;