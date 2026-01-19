const express = require('express');
const router = express.Router();
const crafts = require('../data/crafts.json');

router.get('/', (req, res) => {
    res.render('crafts', { crafts: crafts.crafts, artisans: crafts.artisans, processes: crafts.processes }); 
    
});

module.exports = router;
