const User = require('../../../models/user');

/*
    POST /api/auth/register
    {
        userId,
        password
    }
*/

exports.register = (req, res) => {

    const { userId, password } = req.body;
    let newUser = null;

    // user 존재하지 않을 경우 생성
    const create = (user) =>{
        if(user){
            throw new Error('userId exists');
        }else{
            return User.create(userId, password);
        }
    }

    // user count
    const count = (user) =>{
        newUser = user;
        return User.count({}).exec();
    }

    // admin 접근
    const assign = (count) => {
        if(count === 1){
            return newUser.assignAdmin();
        }else{
            return Promise.resolve(false);
        }
    }

    // client 한테 전달
    const respond = (isAdmin) =>{
        res.json({
            message: 'regestered successfully',
            admin: isAdmin ? true : false
        });
    }

    // error
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        });
    }

    // id 중복 확인
    User.findOneByUserId(userId)
    .then(create)
    .then(count)
    .then(assign)
    .then(respond)
    .catch(onError);
       
}