// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken'

const jwtMiddleware = (req,res,next) => {
    // console.log('Inside jwt');
    
    try{
    //get token    
    const token = req.headers['authorization'].slice(7)
    // console.log(token);
    
    //verify the token
    const jwtVerification = jwt.verify(token,process.env.JWT_SECRET)
    req.payload = jwtVerification.userId;
    // console.log(req.payload);
    
    next()
    }
    catch(err){
        res.status(401).json({"Authorization error":err.message})
    }
}

export default jwtMiddleware;