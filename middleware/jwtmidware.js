const jwt = require("jsonwebtoken")

module.exports = (req , res , next)=>{
    const token = req.body.token|| req.headers["x-access-token"]||req.query.token
    if(token){
        jwt.verify(token, req.app.get("api_secret_key") , (err , decoded)=>{
            if(err){
                res.json({
                    status: 401,
                    message : "Tokenda xatolik bor!"
                })
            }
            else{
                req.decoded = decoded
                next()
            }
        })
    }
    else{
        res.json({
            status: 404 ,
            message: "Iltimos ro'yhatdan o'ting"
        })
    }
}