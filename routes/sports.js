const express = require('express');
const router = express.Router();
const { 
        pastMatchesQuery, 
        currentMatchesQuery,
        nextMatchesQuery
    } = require('../query/sports')

router.get('/',(req,res)=>{
    //could get sports from database in future
    res.render('sports')
})

router.get("/:sport", (req,res)=>{
    let sport = req.params.sport

    let result = currentMatchesQuery(sport) + 
                pastMatchesQuery(sport) + 
                nextMatchesQuery(sport)
      
    res.render('sports',{message:result})
})
module.exports = router