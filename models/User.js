const validator = require('validator');

let User = function(data) {
    this.data = data;
    this.error = [];
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
    }else if(this.data.password.length > 100){
        this.error.push('Password can not exceed 100 charaters');
    }else if(this.data.username.length > 0 && this.data.username.length < 3){
        this.error.push('Username must be at least 3 characters')
    }else if(this.data.username.length > 30){
        this.error.push('Password can not exceed 30 charaters');
    }
}

User.prototype.register = function() {
    // step #1: validate user data
    this.cleanUp()
    this.validate()
    // step #2: only if there are no validation errors
    // then save the user data into a database
}

module.exports = User;