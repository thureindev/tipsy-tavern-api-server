var express = require('express');
var router = express.Router();
var cors = require('cors')

const { Cocktail } = require('../models/cocktail');
const logic = require('../middleware/cocktail_mw.js');
const cocktail = require('../models/cocktail');

const LIMIT_RESULT = 30

const check_prompt = ((req, res, next) => {
    
    promptList = req.query.promptText
                .trim()
                .replace(/\s/g, ',')
                .replace(/,{2,}/g, ',')
                .split(',');

    // filter check if it is an actual word
    req.promptList = promptList
                    .filter(word => word)
                    .map(s => new RegExp(`\\b${s}\\b`, 'i'));

    next();
});

/* GET INDEX page
--------------------------- --------------------------- */
router.get('/', function(req, res, next) {

    res.render('cocktail_home', { title: 'Cocktail' });
});

/* GET PROMPT req // handle user prompt AND return DB result
--------------------------- --------------------------- */
router.get('/prompt', cors(), check_prompt, async function(req, res){

    field = req.query.promptField;
    promptList = req.promptList;

    if (field == "c_name"){
        cocktails = await Cocktail.find({ name: { $in: promptList }  }).limit(LIMIT_RESULT).exec();
    }
    else if (field == "ingredient"){
        console.log('looking for ingredients');

        cocktails = await Cocktail.find({ glass: { $in: promptList }  }).limit(LIMIT_RESULT).exec();
        
        console.log(cocktails);
        console.log('------ ------ ---------');
    }
    else {
        cocktails = {"response": 200, "results": [{"nothing": "nothing"}]}
    }

    res.json(cocktails);
});

/* GET RANDOM req // create random index and return DB result
--------------------------- --------------------------- */
router.get('/random', cors(), async function(req, res, next) {
    
    const c_results = [];
    const total_result = req.query.count;
    
    // get total count
    const c_count = await Cocktail.count().exec();

    for (let i = 0; i < total_result; i ++) {
        // generate random by total count
        random_num = Math.floor(Math.random() * c_count);
        // get one rand
        c_random = await Cocktail.findOne().skip(random_num).exec();
    
        c_results.push(c_random);
    }

    res.setHeader('Content-Type', 'application/json');
    res.json(c_results);
});

/* GET FRIDGE req // handle fridge prompt ND return DB result
--------------------------- --------------------------- */
router.get('/fridge', cors(), function(req, res, next) {

    res.setHeader('Content-Type', 'application/json');
    res.json({'fridge': 'fooooooood'});
});


module.exports = router;
