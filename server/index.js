import express from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import cors from 'cors';

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import subredditRoutes from './routes/subreddit.js'

const app = express();
app.use(cookieParser());
app.use(bodyParser.json({limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors({credentials: true}));

const CONNECTION_URL = 'mongodb+srv://FurkanCan:qBaC4WxNET9QcFL@cluster0.fxcgo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

await mongoose.connect(CONNECTION_URL, { useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));

app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/subreddits', subredditRoutes);


  
