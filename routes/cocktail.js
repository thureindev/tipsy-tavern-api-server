var express = require('express');
var router = express.Router();

const { Cocktail } = require('../models/cocktail');
const logic = require('../middleware/cocktail_mw.js');

// Function to update the cocktail count in DB
async function updateCocktailCountInDB() {
    return await Cocktail.count().exec();
}
// get total count
var cocktail_count_in_db = updateCocktailCountInDB();

// limit result in prompts
const LIMIT_RESULT = 30


const check_prompt = ((req, res, next) => {

    const promptList = req.query.promptText
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
router.route('/')
    .get(function (req, res, next) {

        res.setHeader('Content-Type', 'application/json');
        res.json({ 'data': 'looking for cocktails? go to /prompt' });
    });

/* GET PROMPT req // handle user prompt AND return DB result
--------------------------- --------------------------- */
router.route('/prompt')
    .get(check_prompt, async function (req, res) {

        const field = req.query.promptField;
        const promptList = req.promptList;
        var cocktails;

        if (field == "c_name") {
            cocktails = await Cocktail.find({ name: { $in: promptList } }).limit(LIMIT_RESULT).exec();
        }
        else if (field == "ingredient") {
            cocktails = await Cocktail.find({ glass: { $in: promptList } }).limit(LIMIT_RESULT).exec();
        }
        else {
            cocktails = { "response": 200, "data": [{ "nothing": "nothing" }] }
        }

        res.json(cocktails);
    });

/* GET RANDOM req // create random index and return DB result
--------------------------- --------------------------- */
router.route('/random')
    .get(async function (req, res, next) {

        const c_results = [];
        const total_result = req.query.count || 3;

        for (let i = 0; i < total_result; i++) {
            // generate random by total count
            const random_num = Math.floor(Math.random() * cocktail_count_in_db);
            // get one rand
            const c_random = await Cocktail.findOne().skip(random_num).exec();

            c_results.push(c_random);
        }

        res.setHeader('Content-Type', 'application/json');
        res.json(c_results);
    });

/* GET FRIDGE req // handle fridge prompt ND return DB result
--------------------------- --------------------------- */
router.route('/fridge')
    .get(function (req, res, next) {

        res.setHeader('Content-Type', 'application/json');
        res.json({ 'data': 'fridge' });
    });


module.exports = router;