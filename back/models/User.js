const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');
const {AuthorSchema} = require('../models/Author')
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken')

const embededBookSchema = new Schema({
    rate: {type: Number, require: true},
    book: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'}
})

const embededAuthor = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    age: { 
        type: Number, 
        required: true 
    }, 
    auth_id: {type: String, required: true}
})

const UserScheema = new Schema({
    username: {
        type: String, 
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email',
        ],
    }, 
    role: {
        type: String, 
        enum: ["user", "publisher"],
        default: "user"
    },
    password: {
        type: String, 
        required: true,
        minlength: 6,
        select: false
    },  
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date, 
        default: Date.now
    },
    favBooks :[{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],//Embeded
    ratedBooks: [embededBookSchema],
    favAuthor: embededAuthor, //Embeded
    image: {
        type: String, 
        enum: ['user_default1', 'user_default2', 'user_default3']
    }, 
})

//Encrypt password using bcrypt
UserScheema.pre('save', async function(next){
    if(!this.isModified('password')) next() //En caso hagamos un cambio en el usuario no relacionado con crear contraseña
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
//Sign JWT and return
UserScheema.methods.getSignedJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}
//Match user entered password to hashed password in DB
UserScheema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password, )
}
//Generates and hash password token
UserScheema.methods.getResetPasswordToken = async function(){
    //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex')

    //Hash token and set to resetPasswordToken field 

    this.resetPasswordToken  = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Set expire

    this.resetPasswordExpire = Date.now() + 10 * 60  * 1000

    return resetToken
}
const User = mongoose.model('User', UserScheema)
const EmbededBook = mongoose.model('EmbededBook', embededBookSchema)
module.exports = {User, UserScheema, EmbededBook, embededBookSchema}