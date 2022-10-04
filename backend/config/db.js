const mongoose = require('mongoose')

const connectDB= async ()=>{
    try {
       // console.log(`MongoDb Connected: ${process.env.MONGO_URI}`.cyan.underline)
        const conn = await mongoose.connect('mongodb+srv://amani123:amani123@amanilabcluster.vruu8rq.mongodb.net/mearnApp?retryWrites=true&w=majority')
        console.log(`MongoDb Connected: ${conn.connection.host}`.cyan.underline)
    }catch (error){
        console.log(error)
        process.exit(1)
    }
}

module.exports= connectDB
