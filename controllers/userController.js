const User = require('../models/User');
exports.login = (req, res) => {
    let user = new User(req.body);
    user.login(function(result){
        res.send(result);
    });
    
}

exports.logout = () => {
    
}

exports.register = (req, res) => {
    let user = new User(req.body);
    user.register();
    if(user.error.length){
        res.send(user.error)
    }else{
        res.send('Congrats, there are no errors.')
    }
}

exports.home = (req, res) => {
    res.render('home-guest');
}