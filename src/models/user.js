const mongoose =require('mongoose')
const validator=require('validator')
const bcrypt =require('bcrypt')
const jwt =require('jsonwebtoken')
const { default: isEmail } = require('validator/lib/isEmail')





const userSchema =new mongoose.Schema( {
    name: {
        type: String,
        require:true,
        trim :true
    },
   email: {
    type: String,
    unique :true,
    require:true,
    trim :true,
    lowercase:true,
    validate(value){
        if (!validator.isEmail(value)){ throw new Error('unvalid emailllllllllllllllllllll') }
    }
    },
    password: { 
        type: String,
        require:true,
        minlenght:6,
        trim :true,
        validate(value){
            if(value.toLowerCase().includes("password")){throw new Error('unvalid password -> contain "password" word')}
        }

    },
    age: {
        type: Number,
        default:0,
        validate(value){
            if (value <0){
                throw new Error('age must be positive!');
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }],avatar:{
        type:Buffer
    }


}
 ,{
    timestamps:true
})


//relation between user an task -> user own task so we not gonna add an field attribut we add a relation 
userSchema.virtual('tasks',{
    ref :'Task',
    localField:'_id',//the relation liks by the id of user in _id and owner 
    foreignField:'owner'
})


///some magic toJSON affect all routes without calling
// this because all the data comes from res(...) -> behind the scene is use toJSON to convert it to json -> so when calling toJSON it affect all of them automaticly
userSchema.methods.toJSON = function(){
    const user =this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

   return userObject
}

//make userschema accessing a new method by .methods.________  ->instance methods ?
userSchema.methods.generatAuthToken = async function(){
    const user =this 
    const token = jwt.sign({ _id: user.id.toString() },process.env.JWT_TOKEN)
    user.tokens =user.tokens.concat({ token:token})
    await user.save()
    return token
} 




userSchema.statics.findByCredential =async (email ,password)=>{
    const user =await User.findOne({email})
    if (!user){
        throw new Error('unable to login')
    }
    const ismatch =await bcrypt.compare(password,user.password)
    if (!ismatch){
        throw new Error('unable to login')

    }
    return user 
}



//hash the password while creat or ubdate---------------------------------------------------------------
userSchema.pre('save',async function(next){
    const user =this
    if(user.isModified('password')){user.password =await bcrypt.hash(user.password,8)}
    next()
})


// creat user model using user schema
const User =mongoose.model('User',userSchema)
module.exports=User


