exports.login = () => {

}

exports.logout = () => {
    
}

exports.register = (req, res) => {
    res.status(200).send('thanks for trying to register');
}

exports.home = (req, res) => {
    res.render('home-guest');
}