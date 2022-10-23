const express = require('express');
const mongoose = require('mongoose');
const expresslayouts = require('express-ejs-layouts');
const Article = require('./models/article')
//routes
const userRouters = require('./routes/user');
const { use } = require('./routes/user');


const app = express();


//mongoose db con
mongoose.connect('mongodb+srv://upload_showcase-api:upload_showcase-api@cluster0.d5cibkt.mongodb.net/articles',{
    useNewUrlParser:true
});


//veiw engine
app.use(expresslayouts);
app.set('view engine', 'ejs')

// route
app.get('/',async(req,res)=>{
    const  article = await Article.find();
    //console.log(article)
    res.render('index',{article:article})
})


//body parser
app.use(express.json());
app.use(express.urlencoded({extended:true}))



//userRouters
app.use('/article',userRouters)

//public folder for css and js
app.use(express.static('public'))


//port
const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log('Working on port 8080')
})