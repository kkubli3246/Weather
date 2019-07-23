if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const DARK_SKY_API_KEY = process.env.DARK_SKY_API_KEY;
const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static('public'));
app.post('/weather', (req, res, next) =>{

});

app.listen(PORT, () =>{
    console.log('Server is listening to port ' + PORT);
});