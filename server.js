const dotenv = require('dotenv')
dotenv.config()

const express = require('express')

const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const port = process.env.PORT ? process.env.PORT : '3000'
const app = express();
const arabFood = [
    { 
        id: 1,
        name: 'Falafel',
        description: 'Deep-fried balls made from chickpeas with herbs and spices'
    },
    {   id: 2,
        name: 'Hummus',
        description: 'A smooth and creamy puree of cooked chickpeas with tahini and lemon juice'
    },
    {   id:3,
        name: 'Shawarma',
        description: 'Chicken,Beef and etc that is cooked in a skewer with all the garlic sauce, fries and a bit of vegetables'
    }

]
const filipinoFood = [
    { 
        id: 1,
        name: 'Chicken Adobo',
        description: 'Chicken that is marinated and stewed with vinegar, soy sauce, bay leaves and black peppercorns.'
    },
    {   id: 2,
        name: 'Tinola',
        description: 'Filipino soup thats flavoured with ginger, garlic, fish sauce and tradtionally includes green papaya. Best served with white rice'
    },
    {   id:3,
        name: 'Sinigang',
        description: 'A soup thats well known for its sour and savory taste. A comfort food that is easy but tastes amazing'
    }

]

//Creates a connection to MONGO database
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

// MIDDLEWARE
const Food = require('./models/food.js')


app.use(methodOverride("_method")); 
app.use(morgan("dev"));

app.get('/', async (req, res) => {
    res.render('home.ejs');
  });

  app.get('/Arabic' , (req, res) => {
    res.render('Arabic.ejs' , {
        arabFood: arabFood
    })
  })
  app.get('/Filipino' , (req, res) => {
    res.render('Filipino.ejs' , {
        filipinoFood: filipinoFood
    })
  })
app.get('/FoodAdder' , (req, res) => {
    res.render('FoodAdder.ejs')
})
// app.get('/', (req, res) => {
//     res.render('index.ejs')
// })

// app.get('/foods', async (req, res) => {
//     const foods = Food.find({});
  
//     res.render('foods/index.ejs', { foods: foods });
//   });


// const foodCtrl = require('./controllers/foods.js')
// app.get('/foods' , foodCtrl.index)

app.get('/foods/new', (req, res) => {
  res.render('foods/new.ejs')
})
app.use(express.urlencoded({ extended: false }));


app.get("/foods", async (req, res) => {
  const allFoods = await Food.find();
  res.render("foods/index.ejs", {
    foods: allFoods
  })
});

app.get("/foods/:foodId", async (req, res) => {
  const foundFood = await Food.findById(req.params.foodId);
  res.render('foods/show.ejs', { food: foundFood});
});

app.post("/foods", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Food.create(req.body);
  res.redirect("/foods");
});
  
app.delete("/foods/:foodId", async (req, res) => {
  await Food.findByIdAndDelete(req.params.foodId)
  res.redirect("/foods");
});
  
app.get("/foods/:foodId/edit", async (req, res) => {
  const foundFood = await Food.findById(req.params.foodId);
  res.render("foods/edit.ejs", {
    food: foundFood
  })
});
//CONTROLLERS




//ROUTE HANDLERS




app.listen(port, () => {
    console.log(`The express app is ready on port ${port}`)
})