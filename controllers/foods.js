const Food = require('./../models/food.js')

const index = async (req, res) => {
    const foods = await Food.find({})
    res.render('index.ejs' , {foods})
}

// const home = (req, res) => {
//     res.render('index.ejs')
    
// }

const newFoods = (req, res) => {
    res.render('/foods/FoodAdder.ejs')
}

module.exports = {
    index,
    newFoods,
}