const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    userId: String,
    password: String,
    admin: {type: Boolean, default: false}
})

// create new User document
User.statics.create = function(userId, password){
    const user = new this({
        userId,
        password
    })

    // return the Promise
    return user.save()
}

// find one user by using userId
User.statics.findOneByUserId = function(userId){
    return this.findOne({
        userId
    }).exec()
}

// verify the password of the User document
User.methods.verify = function(password){    
    return this.password === password
}

User.methods.assignAdmin = function(){
    this.admin = true
    return this.save()
}

module.exports = mongoose.model('User', User);