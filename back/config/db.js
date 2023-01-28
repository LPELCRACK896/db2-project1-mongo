const mongoose = require('mongoose')
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    mongoose.set('debug', function(coll, method, query, doc, options) {
        console.log(`MongoQuery --->`.green.underline);
        console.log(coll)
        console.log(method)
        console.log(query)
        console.log(doc)
        console.log(options)
        console.log('--------------------------------'.green.underline)
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
}

module.exports = connectDB