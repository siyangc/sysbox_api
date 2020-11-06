const express = require('express');

const app = express();
const path = require('path');

const cors = require('cors');
const PORT = process.env.PORT || 5000;


//app.use(express.urlencoded({ extended: false}))

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


app.use(cors());


app.get("/", (req,res)=>{
    res.render('index')
})


app.use('/sports',require('./routes/sports'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

