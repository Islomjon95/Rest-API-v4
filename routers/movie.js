const express = require("express")
const router = express.Router()
const cinema = require("../model/movies")

router.get("/api/movies" , (req , res)=>{
    cinema.find({} , (err , data)=>{
        if (err) throw err
        if(data== ""){
            res.send("Ma'lumot yo'q")
        }
        else{
            res.send(data)

        }
    })
})


router.post("/api/movies" , (req , res)=>{
    const db  = new cinema(req.body)
    const promise = db.save()
    promise.then(err=>{
        console.log(err);
    })
    promise.then(data=>{
        res.json(data)
    })
})
//ikkinchi usul
// router.post("/api/movies" , (req, res)=>{
//     const {title , category , country , year , director_id , imdb_score} = req.body
//     const db = new cinema({
//         title : title,
//         category : category,
//         country : country,
//         year : year,
//         director_id : director_id,
//         imdb_score : imdb_score
//     })

//     db.save((err , data)=>{
//         res.json(data)
//     })

// })


router.get("/api/movies/:movie_id" , (req, res)=>{
    cinema.findById(req.params.movie_id , (err , data)=>{
        if(err){
            console.log("id da xatolik bor");
        }
        else{
            console.log("malumot topildi")
            res.json(data)
        }
    })
})

router.put("/api/movies/:movie_id" , (req, res)=>{
    cinema.findByIdAndUpdate(req.params.movie_id , req.body , (err , data)=>{
        if (err) throw err
        res.json(data)
    })
})


router.delete("/api/movies/:movie_id" , (req, res)=>{
    cinema.findByIdAndDelete(req.params.movie_id , (err , data)=>{
        if(err){
            console.log("xatolik bor");
        }
        else{
            res.json(data)
        }
    })
})


router.get("/api/movies/top10/cinema" , (req, res)=>{
    const promise = cinema.find({}).sort({year: -1}).limit(10)
      promise.then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err);
    })
})

router.get("/api/movies/between/:start_year/:end_year" , (req, res)=>{
    const {start_year , end_year} =req.params
    const promise = cinema.find({year : {"$gte" : (start_year) , "$lte" : (end_year)}})
    promise.then(data=>{
        res.json(data)
    }).catch(err=> console.log(err)) 
})

module.exports = router