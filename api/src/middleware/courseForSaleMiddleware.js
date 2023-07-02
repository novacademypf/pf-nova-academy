const {getCourseForSale , searchCoursesByName} = require("../controllers/courseForSale.controller.js")


const getCourseForSaleMiddleware = async(req, res) => {
    const {name} = req.query;
    const results= name ? await searchCoursesByName(name) : await getCourseForSale();
    res.status(200).json(results);
}
module.exports = {
    getCourseForSaleMiddleware
}