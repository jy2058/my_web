const jwt = require('jsonwebtoken');
const YOUR_SECRET_KEY = process.env.SECRET_KEY;
require('dotenv').config();

// jwt 유효성 체크
const verifyToken = (req, res, next) => {
    try {
        const clientToken = req.cookies.user;
        const decoded = jwt.verify(clientToken, YOUR_SECRET_KEY);
        
        // 사용자 정보 반환
        if(decoded){
            // res.locals에 저장하여 다음 호출될 함수에 값 전달
            res.locals.userId = decoded.user_id;
            next();
        }else{
            res.status(401).json({ error: 'unauthorized'});
        }
    }catch(err){
        res.status(401).json({error: 'token expired'});
    }
};

exports.verifyToken = verifyToken;