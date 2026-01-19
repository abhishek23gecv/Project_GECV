const express = require('express');
const router = express.Router();
const attractions = require('../data/attractions.json');

router.get('/', (req, res) => {
    res.render('attractions', { title: 'Discover Bihar', attractions });
});

module.exports = router;
