const express = require("express")
const router = express.Router()
const userDb = require("../model/users")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post("/register" , (req, res)=>{
    const{username , password} = req.body

    bcryptjs.hash(password, 10, (err , hash)=>{
        if(err) throw err
        const db = new userDb({
            username : username,
            password: hash
        })
    
        db.save().then(data=>{
            res.json(data)
        }).catch(err=>{
            console.log(err);
        })
    })

    
})

router.post("/authenticate" , (req, res)=>{
    const{username , password} = req.body
    userDb.findOne({username} , (err , data)=>{
        if(err) throw err
        if(!data){
            res.json("Username topilmadi")
        }
        else{
            bcryptjs.compare(password, data.password)
            .then(data=>{
                if(!data){
                    res.json("Parolda xatolik bor")
                }
                else{
                    const payload = {username}
                    const token =  jwt.sign(payload , req.app.get("api_secret_key"))

                    res.json({
                        status: true,
                        token
                    })
                }
            }).catch(err=>{
                console.log(err);
            })
        }
    })
})




module.exports = router