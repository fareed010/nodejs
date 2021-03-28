const postsCollection = require('../db').db().collection('posts');
let Post = function(data) {
    this.errors = [];
    this.data = data;
}

Post.prototype.cleanup = function(){
    if(typeof(this.data.title) !== 'string'){
        this.data.title = ""
    }
    if(typeof(this.data.body) !== 'string'){
        this.data.body = ""
    }
    this.data = {
        title: this.data.title.trim(),
        body: this.data.body.trim(),
        createdDate: new Date()
    }
}
Post.prototype.validate = function(){
    if(this.data.title == ""){
        this.errors.push('You must provide a title');
    }
    if(this.data.body == ""){
        this.errors.push('You must provide post content');
    }
}
Post.prototype.create = function(){
    return new Promise((resolve, reject) => {
        this.cleanup();
        this.validate();
        if(!this.errors.length){
            // save post into database
            postsCollection.insertOne(this.data).then(() => {
                resolve();
            }).catch(() => {
                this.errors.push('Please try again later.');
            });
        }else{
            reject(this.errors)
        }
    })
}
module.exports = Post;