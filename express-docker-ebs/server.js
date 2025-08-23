import express from 'express';
import { configDotenv } from 'dotenv';
configDotenv();
import {posts} from './routes/posts-GPUD.js'
import logger  from './middleware/logger.js';
import  notFound  from './middleware/notFound.js';
import  errorHandler  from './middleware/errorHandler.js';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT   || 8080;


//> get the static files
app.use(express.static('src'));

//> Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//> Routes 
app.use('/api/posts', posts);

// > Logger middleware
app.use(logger);

app.use(cors());

// > Error handler
app.use(notFound);
app.use(errorHandler);

//> creating a server
app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`);
    
})