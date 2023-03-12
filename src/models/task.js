const mongoose =require('mongoose')
const validator=require('validator')
const { default: isEmail } = require('validator/lib/isEmail')


const taskSchema =new mongoose.Schema({
    description: {
        type: String,
      
        trim :true,

        require:true

    },
    completed: {
        type: Boolean,
        default:false
    },
    owner:{
        type :mongoose.Schema.Types.ObjectId,//its is object id ->comes from mongose
        require:true,
        ref:'User'
    }
},{
    timestamps:true
})

const Tasks =mongoose.model('Task',taskSchema)  /////////whyyyyyyyyyyyyyyy Tasks did not work
   


module.exports =Tasks