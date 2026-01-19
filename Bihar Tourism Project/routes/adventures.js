const express = require('express');
const router = express.Router();
const adventures = require('../data/adventures.json');

router.get('/', (req, res) => {
    res.render('adventures', { title: 'Bihar Adventure Hub', adventures });
});

module.exports = router;
