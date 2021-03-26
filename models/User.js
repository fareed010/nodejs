let User = function(data) {
    this.data = data;
    this.error = [];
}

User.prototype.validate = function() {
    if(this.data.username === ''){
        this.error.push('You must provide a username');
    }else if(this.data.email === ''){
        this.error.push('You must provide a email');
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
    this.validate()
    // step #2: only if there are no validation errors
    // then save the user data into a database
}

module.exports = User;