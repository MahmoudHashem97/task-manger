const express =require('express')
const router =new express.Router()
const auth =require('../midlware/auth')

const User =require('../models/user')
const Task =require('../models/task')
const multer =require('multer')//picture module used to upload photos



router.post('/users',async(req,res)=>{
    const user =new User(req.body)
     try{
         await user.save()
         const token = await user.generatAuthToken()
         res.status(201).send({user,token})
        
     } catch(e){
         res.status(400).send(e)
     }
 })
 

 router.post('/users/login',async (req,res)=>{
    try{
        const user =await User.findByCredential(req.body.email,req.body.password)
        const token = await user.generatAuthToken()
        res.send({  user,  token  })
    }catch(e){
        res.status(400).send() 
    }
 })

 router.post ('/users/logout',auth,async (req,res)=>{
    try{
        //remove that token that comes from auth from my list
        req.user.tokens= req.user.tokens.filter((tokenFiltered)=>{ //i have list of tokens each have id and token///
            return tokenFiltered.token!==  req.token//-> come from auth        
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send() 
    }
 })

 router.post ('/users/logoutAll',auth,async (req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send() 
    }
 })


//midleware is auth as a second argument 
 router.get('/users/me',auth,async(req,res)=>{
    res.send(req.user)//come from auth
    //  try{
    //      const users =await User.find({})
    //      res.send(users)
    //  }catch(e){
    //      res.status(500).send(e)
    //  }
 })
 router.get('/users/:id/me1',async(req,res)=>{
   // res.send(req.user)//come from auth
     try{
         const users =await User.findById(req.params.id)
         res.send(users)
     }catch(e){
         res.status(500).send(e)
     }
 })


//  router.get('/users/:id',async(req,res)=>{
//      try{
//          const _id =req.params.id
//          const user = await User.findById(_id)
//          res.send(user)
//      }catch(e){
//          res.status(500).send(e)
//      }
//  })
 
 router.patch('/users/me',auth,async(req,res)=>{
       
 const allowUbdate = ['name','age','password','email']
 const ubdates = Object.keys(req.body)
 const isvalid = ubdates.every((ubdate)=>allowUbdate.includes(ubdate))
 if(!isvalid){
     return res.status(400).send({'error':'invalid ubdates'})
 }
 
     try{
        //const user = await User.findById(req.user._id)
        ubdates.forEach((ubdate)=>req.user[ubdate]=req.body[ubdate])// user.name =req.body.name ------>same meaning
         
        await req.user.save()
         //const user =await User.findByIdAndUpdate(req.params.id,req.body,{new :true ,runValidators:true})
         res.send(req.user)
     }catch(e){
         res.status(400).send(e) 
     }
 })
 





 router.delete('/users/me',auth,async(req,res)=>{
     try {
        const user = await User.findByIdAndDelete(req.user._id)
        const tasks = await Task.deleteMany({owner:req.user._id})
        //  if(!user){
        //      return res.status(404).send()
        //  }
       // await req.user.remove() // it didnot work ???
         //after using auth it return the user so i can delete it right away
        res.send(tasks)
     }catch(e){
         res.status(400).send(e) 
     }
 })





const upload =multer({//as validator
    // dest:'avatar',//instead of saving it in avatar directory i want to store in data base 
    limits:{//for size
        fileSize:1000000000
    },
    fileFilter(req,file,cb){
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)){
             return cb(new Error('file must be a photo'))
        }
         cb(undefined,true)
    }
})


                                           //key-value//
router.post('/users/me/avatar',auth,upload.single('avatar'), async (req,res)=>{
    req.user.avatar= req.file.buffer //buffer is contain the binary data that i want 
    await req.user.save()
    res.send()
},(error,req,res,next)=>{///this to send my own error message to user instead of html message 
    res.status(400).send({error:error.message})
})


router.delete('/users/me/avatar',auth ,async (req,res)=>{
    req.user.avatar= undefined //buffer is contain the binary data that i want 
    await req.user.save()
    res.status(200).send()
},(error,req,res,next)=>{///this to send my own error message to user instead of html message 
    res.status(400).send({error:error.message})
   
})


router.get('/users/:id/avatar',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if (!user ||!user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/jpg')  //
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})
 
 

module.exports =router