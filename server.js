const express=require('express');
const mongoose=require('mongoose');
const dp=require('./connection')
const app=express();
const postModel=require('./postModel');
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//CRUD OPERATION

app.post('/',async(req,res) => {
    const {title,content}=req.body;
    try{
        const newPost=await postModel.create({title,content});
        res.json(newPost);
    }
    catch(error){
        res.status(500).send(error);
    }
}
);

app.get('/',async(req,res)=>{
    try{
        const posts=await postModel.find();
        res.json(posts);
    }
    catch(error){
        res.status(500).send(error);
    }

});

app.get('/:id',async(req,res) => {
    try{
        const {id} = req.params;
        const posts=await postModel.findById(id);
        res.json(posts);
    }
    catch(error){
        res.status(500).send(error);
    }   
});

app.put('/:id',async(req,res)=>
{
    const {id}=req.params;
    const {title,content}=req.body;
    try{
        const posts=await postModel.findByIdAndUpdate(id,{title,content});
        res.json(posts);
    }
    catch(error){
        res.status(500).send(error);
    }

});

app.delete('/:id',async(req,res)=>
{
    const {id}=req.params;
    try{
        const posts=await postModel.findByIdAndDelete(id,{title,content});
        //const post=await postModel.findById(id);
        //await post.remove();

        res.json("deleted succesfully");
    }
    catch(error){
        res.status(500).send(error);
    }

});




app.listen(3000,()=>{
    console.log('listening on port 3000');
});