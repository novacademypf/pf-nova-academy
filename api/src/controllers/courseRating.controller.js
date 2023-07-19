const getUserToken = require("../helpers/getUsertoken")

const postCourseRating=async (req,res)=>{
const {idCourse}=req.params
const {rating,review}=req.body
try {
    const userProfile=await getUserToken(req)
    console.log('-->dataProfile',userProfile)
res.status(200).send('exito')
} catch (error) {
    res.status(500).send(error.message)
}
}
module.exports={postCourseRating}