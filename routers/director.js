const express = require("express")
const { default: mongoose } = require("mongoose")
const { aggregate } = require("../model/Directors")
const router = express.Router()
const directorDb = require("../model/Directors")


// router.get("/api/directors" , (req, res)=>{
//     directorDb.find({} , (err , data)=>{
//         if(err) throw err
//             else{
//                 res.json(data)
//             }
//     })
// })

router.post("/api/directors", (req, res)=>{
    const db = new directorDb(req.body)
    db.save().then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err);
    })
})


router.get("/api/directors" , (req, res)=>{
    const promise = directorDb.aggregate([
        {
            $lookup:{
                from: "movies",
                localField: "_id",
                foreignField: "director_id",
                as: "filmlar"
            }
        },

        {
            $unwind:{
                path: "$filmlar"
            }
        },

        {
            $group:{
                _id:{
                    _id: "$_id",
                    name: "$name",
                    surname: "$surname",
                    bio: "$bio"
                },
                flimlar: {
                    $push: "$filmlar"
                }
            }
        },

    ])

    promise.then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err);
    })
})

router.get("/api/directors/:director_id/best10movie" , (req, res)=>{
    const promise = directorDb.aggregate([
        {
            $match:{
                _id: mongoose.Types.ObjectId(req.params.director_id)
            }
        },

        {
            $lookup : {
                from : "movies",
                localField: "_id",
                foreignField: "director_id",
                pipeline: [
                    {$sort: {
                        year: 1
                    }},
                    {
                        $limit : 10
                    }
                ],
                as: "filmlar"

            }
        }

    ])

    promise.then(data=>res.json(data)).catch(err=>{
        console.log(err);
    })
})



module.exports = router