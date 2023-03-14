const request = require('supertest')
const app = require('../src/app')
const User =require('../src/models/user')

const {setupDatabase,userOne,userOneId} =require('./fixture/db')


beforeEach(setupDatabase)


test('should signUp',async()=>{
    const response = await request(app).post('/users').send({
        name:'badrrr',
        password:'haseee9mnx',
        email: 'mmmfcmmimmmmllmmo.ha@gmail.com'
        
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    
    expect(response.body).toMatchObject({
        user:{
            name:'badrrr',
            email: 'mmmfcmmimmmmllmmo.ha@gmail.com' 
        },
        token :user.tokens[0].token
    })

    expect(user.password).not.toBe('haseee9mnx')


})

test('should login',async()=>{
    const response = await request(app).post('/users/login').send({      
        password:'haseee9mnx',
        email: 'vvvvvvvvvv.ha@gmail.com'
   }).expect(200)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    expect(response.body.token).toBe(user.tokens[1].token)

})


test('should not login',async()=>{
    await request(app).post('/users/login').send({
      
        password:'haseee9mnx',
        email: 'vvvvvvvv.ha@gmail.com'
       
   }).expect(400)
})

test('should get profile',async()=>{
    await request(app)
    .get('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('should not get profile',async()=>{
    await request(app)
    .get('/users/me')
    .send()
    .expect(400)
})


test('should  delet profile',async()=>{
    await request(app)
    .delete('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()

})


test('should not delet profile',async()=>{
    await request(app)
    .delete('/users/me')
    .send()
    .expect(400)
})


test('should upload avatar image ',async()=>{
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .attach('avatar','tests/fixture/hnaaaaaaa.jpg')
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should update user ',async()=>{
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            name:'hashem',
            email: 'mahmoud.hashem@gmail.com'
            
        })
        .expect(200)
   
    expect(response.body.name).toEqual('hashem')
    expect(response.body.email).toEqual('mahmoud.hashem@gmail.com')

  
})

test('should not update user ',async()=>{
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            location:'hashem'    
        })
        .expect(400) 
})
