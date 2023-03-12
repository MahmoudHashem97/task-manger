const express =require('express')
require('./db/mongoose')
const User =require('./models/user')
const Task =require('./models/task')

const userRouter =require('./routers/user')
const taskRouter =require('./routers/tasks')
 

const app =express()
const port=process.env.PORT  


// app.use((req,res,next)=>{
//     if (req.method==='GET'){
//         res.send('get is disabled')
//     }else{
//     next()//whitout next it goona stuck
//     }
   
// })

//app.use((req,res,next)=>{res.status(503).send('maintance')})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const multer =require('multer')
// const upload =multer({
//     dest:'images',
//     limits:{//for size
//         fileSize:10000000
//     },
//     fileFilter(req,file,cb){

//                                         // if(!file.originalname.endsWith('.pdf')){
//                                         //     return    cb(new Error('file must be a PDF'))
//                                         // }

//         //some regular expression 
//         if (!file.originalname.match(/\.(doc|docx)$/)){
//              return    cb(new Error('file must be a Word'))
//         }
//         cb(undefined,true)             //-> udefiend to say nothing went wrong and second argument to true to say the uplode should be excpected
//                                        // cb(undefined ,false)//->false to silently reject the upload
//     }
// })




// app.post('/upload',upload.single('upload'),(req,res)=>{
//     res.send()
// },(error,req,res,next)=>{///this to send my own error message to user instead of html message 
//     res.status(404).send({error:error.message})
// })



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


//without express middleware new requst ->run route handler 
//with express middleware new requst-> do somthing (function run log out check valid auth...) ->run route handler 
//with express middleware intercept any request till the condition run then next() to run the router


 


// const main = async ()=>{
//     // const user = await User.findById('640a8ced0e10d21561c146e9')
//     //     await user.populate('mytasks').execPopulate()
//     //     // populate("profile").execPopulate()
//     //     console.log(user.mytasks)

  

// }
// const main = async () => {
//      //const task = await Task.findById('640a90f6e58c09eede594cdd')
//     const user = await User.findById('640a8ced0e10d21561c146e9')
//     await user.populate('tasks')
//     console.log(user.tasks) 
// }
// main()//

// const main = async () => {
//     const s = '12.2'
//     console.log(parseInt(s))
// }
// main()//








app.listen(port,()=>{
    console.log('server is up on port '+port)//npm i env-cmd ->TO READ FROM env file install it
})