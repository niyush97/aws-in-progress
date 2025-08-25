// import { parse } from 'dotenv';
// import rawData from '../mockData.json' assert { type: 'json' };
let mockData = [
  {
    "id": 1,
    "first_name": "Barclay",
    "last_name": "Cattell",
    "email": "bcattell0@wikimedia.org",
    "gender": "Bigender",
    "country": "Indonesia",
    "job_title": "Senior Editor"
  },
  {
    "id": 2,
    "first_name": "Upton",
    "last_name": "Giraths",
    "email": "ugiraths1@uol.com.br",
    "gender": "Male",
    "country": "Indonesia",
    "job_title": "Developer I"
  },
  {
    "id": 3,
    "first_name": "Claus",
    "last_name": "Borth",
    "email": "cborth2@berkeley.edu",
    "gender": "Male",
    "country": "Samoa",
    "job_title": "VP Marketing"
  },
  {
    "id": 4,
    "first_name": "Binny",
    "last_name": "Cossum",
    "email": "bcossum3@mozilla.org",
    "gender": "Female",
    "country": "Netherlands",
    "job_title": "Compensation Analyst"
  },
];

//? @desc Get all posts
//~ @route GET /api/posts
//* @access Public

export const getPosts = (req,res,next) => {
    const limit = parseInt(req.query.limit);
    if(!isNaN(limit) && limit>0){
        return res.status(300).json(
            mockData.slice(0,limit));
    }
     res.status(200).json(mockData);
};

//- @desc : Get a single post by ID
//~ @route GET /api/posts/:id
//* @access Public
export const getPostByID = (req,res,next)=>{
    const postId = parseInt(req.params.id);
    const post = mockData.find(post => post.id===postId);

    if(!post){
        const error = new Error(`A post with the ID ${postId} doesn't exits`);
        error.status = 404;
        return next(error);
    }
    res.status(200).json(post); 
}

//=> @desc : Create a new post
//~ @route POST /api/posts
//* @access Public
export const createPost = (req,res,next)=>{
    console.log("REQ.BODY:", req.body);
    const newPost = {
        id: mockData.length+1,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        gender: req.body.gender,
        country: req.body.country,
        job_title: req.body.job_title
    };
    if (!newPost.first_name || !newPost.last_name || !newPost.email || !newPost.gender || !newPost.country || !newPost.job_title) {
        const error = new Error('All fields (first_name, last_name, email, gender, country, job_title) are required');
        error.status = 400;
        return next(error);
    }
    mockData.push(newPost);
    res.status(201).json(newPost);
}

//? @desc : Update a post by ID
//~ @route PUT /api/posts/:id
//* @access Public
export const updatePost = (req,res,next)=>{
    const id = parseInt(req.params.id);
    const post = mockData.find(post => post.id === id);
    if(!post){
        const error = new Error(`A post with the ID ${id} doesn't exists`);
        error.status = 404;
        return next(error);
    }
    post.first_name = req.body.first_name;
    post.last_name = req.body.last_name;
    post.email = req.body.email;
    post.gender=req.body.gender;
    post.country = req.body.country;
    post.job_title = req.body.job_title;
    return res.status(200).json(post);
}

//! @desc : Delete a post by ID
//~ @route DELETE /api/posts/:id
//* @access Public
export const deletePost = (req,res,next)=>{
    const id = parseInt(req.params.id);
    const post = mockData.find(post => post.id ===id);
    if(!post){
        const error = new Error(`A post with the ID ${id} wasn't found`);
        error.status = 404;
        return next(error);
    }
    mockData = mockData.filter(post=>post.id!==id);
    res.status(200).json({message: 'Post deleted successfully'}
    );
}