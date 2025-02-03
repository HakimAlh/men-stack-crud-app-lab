const Food = require('/models/food.js')

const index = async (req, res) => {
    const fruits = await Food.find({})
    res.render('foods/index.ejs' , {foods})
}

const home = (req, res) => {
    res.render('index.ejs')
    
}

const newFoods = (req, res) => {
    res.render('/foods/new.ejs')
}

module.exports = {
    index,
    home,
    newFoods,
}