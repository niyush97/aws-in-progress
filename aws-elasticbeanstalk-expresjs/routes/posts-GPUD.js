import express from 'express';
import { getPosts , getPostByID,createPost,updatePost,deletePost} from '../Controllers/postControllers.js';    //? Importing the  all postsfunciton


 // > Creating a new router instance
const router = express.Router();

//>get all posts 
router.get('/',getPosts);

//> get a single post by ID
router.get('/:id',getPostByID);

//> create a new post
router.post('/',createPost);

//> update a post by ID
router.put('/:id',updatePost);

//> delete a post by ID
router.delete('/:id',deletePost);

export { router as posts };  

//~ Exporting the router instance as posts
//% This allows the router to be used in other files, such as server.js
//=> The router will handle GET requests to the '/api/posts' endpoint and call the getPosts function to respond with the posts data.
