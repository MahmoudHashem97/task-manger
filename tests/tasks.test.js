const request = require('supertest')
const mongoose =require('mongoose')
const app = require('../src/app')
const Task =require('../src/models/task')
const User =require('../src/models/user')
const {setupDatabase,userOne,userOneId,usertwo,usertwoId,taskone,tasktwo,taskthree} =require('./fixture/db')






beforeEach(setupDatabase)






test('should creat task to use',async()=>{
    const response = await request(app)
    .post('/tasks')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        description:'shopping',
        completed:false
     }).expect(201)   
    expect(response.body.description).toEqual('shopping')
})


test('should creat task to use',async()=>{
    const response = await request(app)
    .get('/tasks')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)   
    expect(response.body.length).toEqual(1)
})

test('should not delete task to use',async()=>{
    const response = await request(app)
    .delete('/tasks/'+taskone._id)
    .set('Authorization',`Bearer ${usertwo.tokens[0].token}`)
    .send()
    .expect(404)   
    //expect(response.body.length).toEqual(1)
})