const express = require('express');
const router = express.Router();
const festivals = require('../data/festivals.json');

router.get('/', (req, res) => {
    res.render('festivals', { title: 'Festivals of Bihar', festivals });
});

module.exports = router;
