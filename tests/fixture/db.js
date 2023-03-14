const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose =require('mongoose')
const User =require('/Users/mahmoudhashem/Desktop/node-course/task-manger/src/models/user')
const Task =require('../../src/models/task')


const userOneId =new mongoose.Types.ObjectId()
const userOne ={
    _id:userOneId,
    name:'mahmoud',
    password:'haseee9mnx',
    email: 'vvvvvvvvvv.ha@gmail.com',
    tokens :[{
        token : jwt.sign({
            _id :userOneId   
        }, process.env.JWT_TOKEN)
    }]
    
}
const usertwoId =new mongoose.Types.ObjectId()
const usertwo ={
    _id:usertwoId,
    name:'mahmoud',
    password:'haseee9mnx',
    email: 'mmmmmmmmmm.ha@gmail.com',
    tokens :[{
        token : jwt.sign({
            _id :usertwoId   
        }, process.env.JWT_TOKEN)
    }]
    
}


const taskone ={
    _id:new mongoose.Types.ObjectId(),
    description:'shopping',
    completed: false,
    owner :userOneId
 
}

const tasktwo ={
    _id:new mongoose.Types.ObjectId(),
    description:'shopping',
    completed: false,
    owner :usertwoId
 
}

const taskthree ={
    _id:new mongoose.Types.ObjectId(),
    description:'shopping',
    completed: false,
    owner :usertwoId
 
}
const setupDatabase = async ()=>{
    await User.deleteMany()
    await Task.deleteMany()

    await new User(userOne).save()//to use in log in
    await new User(usertwo).save()//to use in log in
    await new Task(taskone).save()
    await new Task(tasktwo).save()
    await new Task(taskthree).save()



}

module.exports ={
    setupDatabase,
    userOne,
    userOneId,
    usertwo,
    usertwoId,
    taskone,
    tasktwo,
    taskthree
}