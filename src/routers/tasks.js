const express =require('express')
const router =new express.Router()
const Task =require('../models/task')
const auth=require('../midlware/auth')


router.post('/tasks',auth,async(req,res)=>{
    try{
        //const task =new Task(req.body)
        const task =new Task({//...?//just copy without maping 
            ...req.body,
            owner:req.user._id
        })  
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
        
    
    
        // task.save().then(()=>{
        //     res.send(task)
        // }).catch((e)=>{
        //     res.status(400).send(e)
        // })
    
    })
    
    
    //GET /tasks?completed=true
    //GET /tasks?limit=10&skip=0 pagination
    //Get /tasks?sortBy=createdAt:desc
    router.get('/tasks',auth,async(req,res)=>{
        const match ={}//?
        var sort =1
       
        if (req.query.completed){
            match.completed = req.query.completed==='true'
        }
        if (req.query.sortBy){
           // console.log(req.query.sortBy)
            const parts =req.query.sortBy.split(':')
            sort  = parts[1] === 'desc' ?-1:1
        }
        try{
            await req.user.populate({
                path:'tasks',
                match,
                options:{
                    limit:parseInt(req.query.limit),
                    skip:parseInt(req.query.skip),
                    sort:{
                        createdAt:sort
                    }
                }
            })
           res.send(req.user.tasks)
        }catch(e){
            res.status(500).send(e)
        }          
        })
    





    router.get('/tasks/:id',auth,async(req,res)=>{
        const _id =req.params.id
        try{
           // const task = await Task.findById(_id)
           

            const task =await Task.findOne({ _id, owner:req.user._id  })
            //console.log(task)
            if(!task){
                return res.status(404).send()
            }
            res.send(task)
        }catch(e){
            res.status(500).send(e)
    
        }
        
    
        // Task.findById(_id).then((task)=>{
        //     if (!task){
        //         return res.status(404).send()
        //     }
        //     res.send(task)
        // }).catch((e)=>{
        //     res.status(500).send(e)
        // })
    })
    
    
    router.patch('/tasks/:id',async(req,res)=>{
    
    const allowUbdate = ['description','completed']
    const ubdates = Object.keys(req.body)
    const isvalid = ubdates.every((ubdate)=>allowUbdate.includes(ubdate))
    if(!isvalid){
        return res.status(400).send({'error':'invalid ubdates'})
    }
        
    
        try{

            const task = await Task.findById(req.params.id,req.body)
            ubdates.forEach((ubdate)=>task[ubdate]=req.body[ubdate])
            await task.save()
            //const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
            res.send(task) 
        }catch(e){
            res.status(500).send(e)
        }
        
    
    
    })
    
    router.delete('/tasks/:id',async(req,res)=>{
        try {
            const task = await Task.findByIdAndDelete(req.params.id)
    
            if(!task){
                return res.status(404).send()
            }
            res.send(task)
        }catch(e){
            res.status(400).send(e) 
    
        }
       
    
    })
    
    
    
    
   

module.exports =router