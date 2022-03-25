const chai = require("chai")
const chaiHttp = require("chai-http")
const should = chai.should()
const server = require("../app")
const jwtMidware = require("../middleware/jwtmidware")

chai.use(chaiHttp)


// describe("api movesni testdan o'tkazish" , ()=>{
//     it("get orqali api moviesni ko'rish", (done)=>{
//         chai.request(server)
//         .get("/api/movies")
//         .end((err , res)=>{
//             if(err){
//                 console.log("bunday router mavjud emas")
//             }
//             res.should.have.status(200)
//             done()
//         })
//     })
// })

describe('autentifaktsiya qismini testdan otkazish', () => {
    before((done)=>{
        chai.request(server)
        .post("/authenticate")
        .send({username: "Azizbek" , password: "aziz123"})
        .end((err, res)=>{
            
            token  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkF6aXpiZWsiLCJpYXQiOjE2NDgyMDUzNzF9.9Z5z0mxojR2X3Dv7qnVBPFMwmzKMpVYjLSkhuv_EcGk"
            console.log(token)
            done()
        })
    })


describe("/api moviesga token bilan kirish test" , ()=>{
    it("get metodida" , (done)=>{
        chai.request(server)
        .get("/api/movies")
        .set("x-access-token" , token)
        .end((err , res)=>{
           res.should.have.status(200)
           res.body.should.be.an("array") 
           done()
        })
    })
})

});






