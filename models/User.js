const bcrypt = require('bcryptjs');
const usersCollection = require('../db').db().collection('users');
const validator = require('validator');
const md5 = require('md5');

let User = function(data, getAvator) {
    this.data = data;
    this.error = [];
    if(getAvator == undefined){
        getAvator = false;
    }
    if(getAvator){
        this.getAvator(); 
    }
}

User.prototype.cleanUp = function(){
    if(typeof(this.data.username) !== "string"){
        this.data.username = "";
    }else if(typeof(this.data.email) !== "string"){
        this.data.email = "";
    }else if(typeof(this.data.password) !== "string"){
        this.data.password = "";
    }
    // get rid of any bogus properties
    this.data = {
        username: this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password
    }
}

User.prototype.validate = function() {
    return new Promise(async (resolve, reject) => {
        if(this.data.username === ''){
            this.error.push('You must provide a username');
        }else if(this.data.username !== '' && !validator.isAlphanumeric(this.data.username)){
            this.error.push('Username can only contain letters and numbers');
        }else if(!validator.isEmail(this.data.email)){
            this.error.push('You must provide a validate email address');
        }else if(this.data.password === ''){
            this.error.push('You must provide a password');
        }else if(this.data.password.length > 0 && this.data.password.length < 12){
            this.error.push('Password must be at least 12 characters')
        }else if(this.data.password.length > 50){
            this.error.push('Password can not exceed 50 charaters');
        }else if(this.data.username.length > 0 && this.data.username.length < 3){
            this.error.push('Username must be at least 3 characters')
        }else if(this.data.username.length > 30){
            this.error.push('Password can not exceed 30 charaters');
        }
        // Only if username is valid then check to see if it's already taken
        if(this.data.username.length > 2 && this.data.username.length < 31 && validator.isAlphanumeric(this.data.username)){
            let usernameExists = await usersCollection.findOne({username: this.data.username});
            if(usernameExists){
                this.error.push('That username is already taken.')
            }
        }
        // Only if email is valid then check to see if it's already taken
        if(validator.isEmail(this.data.email)){
            let emailExists = await usersCollection.findOne({email: this.data.email});
            if(emailExists){
                this.error.push('That email already being used.')
            }
        }
        resolve();
        
    })
}

User.prototype.login = function(){
   return new Promise((resolve, reject) => {
    this.cleanUp();
    usersCollection.findOne({username: this.data.username}).then((attemptedUser) => {
        if(attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)){
            this.data = attemptedUser;
            this.getAvator();
            resolve('Congrats...');
        }else{
            reject('Invalid username / password');
        }
    }).catch(() => {
        reject('Please try again later.')
    });
   })
}

User.prototype.register = function(){
    return new Promise( async (resolve, reject) => {
        // step #1: validate user data
        this.cleanUp()
        await this.validate()
        // step #2: only if there are no validation errors
        if(!this.error.length){
            // hash user password
            let salt = bcrypt.genSaltSync(10);
            this.data.password = bcrypt.hashSync(this.data.password, salt);
            await usersCollection.insertOne(this.data);
            this.getAvator();
            resolve();
        }else{
            reject(this.error)
        }
        // then save the user data into a database
    })
}

User.prototype.getAvator = function(){
    this.avator = `https://gravatar.com/avatar/${md5(this.data.email)}?s=128`;
}

User.findByUsername = function(username){
    return new Promise((resolve, reject) => {
        if(typeof(username !== "string")){
            reject();
            return;
        }
        usersCollection.findOne({username: username}).then((userDoc) => {
            if(userDoc){
                userDoc = new User(userDoc, true);
                userDoc = {
                    _id: userDoc.data._id,
                    username: userDoc.data.username,
                    avator: userDoc.avator
                }
                resolve(userDoc);
            }else{
                reject();
            }
        }).catch(() => {
            reject();
        })
    })
}

module.exports = User;