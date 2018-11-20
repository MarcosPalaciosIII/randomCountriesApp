const express = require('express');
const router  = express.Router();
const axios   = require('axios');
// const Countries = require('../models/Countries');


router.get('/countries', (req, res, next) => {
  // Countries.find()
  //            |
  //      ______|       these are the same thing!!!!!
  //     |
  axios.get('https://restcountries.eu/rest/v2/all')
  //                  |   from app.js  |   |
  //           http://localhost:3000/rest/vs/all <-- comes from router.get('/all')
  .then(infoFromAPI => {
    // console.log(Object.keys(infoFromAPI));  how to find out the keys of the object from the api call
    console.log("-------------- ", infoFromAPI.data);
    res.render('countriesViews/countriesList', {countries: infoFromAPI.data});
  })
  .catch(err => {
    next(err);
  })
})


router.get('/country/:threeLetterCode', (req, res, next) => {
  axios.get(`https://restcountries.eu/rest/v2/alpha/${req.params.threeLetterCode}`)
  .then(responseFromAPI => {
    console.log(responseFromAPI);
    res.render('countriesViews/countryDetails', {oneCountry: responseFromAPI.data});
  })
  .catch(err => {
    next(err);
  })
})



// required to export the routes being created
module.exports = router;
