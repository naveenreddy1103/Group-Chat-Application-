const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const port=process.env.port;
const mongodburl=process.env.mongodburl
const cors=require('cors');
const mongoose=require('mongoose');
const Registeruser=require('./modal');
const message=require('./msgmodel')
const jwt=require("jsonwebtoken");
const middleware = require('./middleware');
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

mongoose.connect(mongodburl).then(()=>{
    console.log("db is connected")
})

app.get('/',(req,res)=>{
    res.send("welcome to chat api");
    res.end();
})

app.post('/register',async(req,res)=>{
    try{
        const {username,email,password,confirmpassword}=req.body;
        let existUser=await Registeruser.findOne({email:email});
        if(existUser){
           return res.status(400).send('user already exit')
        }
        if(password !==confirmpassword){
            return res.status(400).send('password and confirm password ,must be same');
        }
        const newUser=new Registeruser({
            username,
            email,
            password,
            confirmpassword
        })

        await newUser.save();
        res.status(200).send("Register successfully");

    }
    catch(err){
        console.log(err)
       return res.json({err})
    }
})

app.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        let existUser=await Registeruser.findOne({email:email});
        if(!existUser){
            return res.status(400).send("email not found")
        }
        if(existUser.password !== password){
            return res.status(400).send('Password wrong');
        }
        const payload={
            user:{
                id:existUser._id
            }
        }
        jwt.sign(payload,'login',{expiresIn:'1h'},(err,token)=>{
             if(err) throw err;
             return res.json({token});
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({err})
    }
})

app.get('/myprofile',middleware,async(req,res)=>{
    try{
         let existUser=await Registeruser.findOne({_id:req.user.id});
         if(!existUser){
            return res.status(400).send('user not found');
         }
         res.send(existUser);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({err})
    }
});

app.post('/addmsg',middleware,async(req,res)=>{
    try{
        const {text}=req.body;
        const existUser=await Registeruser.findById(req.user.id);
        let newMsg=new message({
            user:req.user.id,
            username:existUser.username,
            text
        })
        await newMsg.save();
        let allmsg=await message.find();
        return res.json(allmsg)
    }
catch(err){
    console.log(err);
    return res.status(500).json({err})
}
});

app.get('/getmsg',middleware,async(req,res)=>{
    try{
        let allmsg=await message.find();
        return res.json(allmsg)
    }
    catch(err){
        console.log(err);
        return res.status(500).json({err})
    }
})


app.listen(port,()=>{
    console.log(`server started:- http://127.0.0.1:${port}`)
});