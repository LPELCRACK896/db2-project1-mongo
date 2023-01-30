const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');
const Author = require('../models/Author')

const UserScheema = new Schema({
    username: {
        type: String, 
        required: true,
        unique: true
    },
    email: {
        type: String, 
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        required: true
    },
    favBooks :[{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],//referencial
    favAuthor: Author, //Embeded
    image: {type: String, enum: ['user_default1', 'user_default2', 'user_default3']}, 
})
const User = mongoose.model('User', UserScheema)
module.exports = {User, UserScheema}