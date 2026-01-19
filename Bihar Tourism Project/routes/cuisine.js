const express = require('express');
const router = express.Router();
const cuisine = require('../data/cuisine.json');

router.get('/', (req, res) => {
    res.render('cuisine', { title: 'Flavours of Bihar', cuisine });
});

module.exports = router;
