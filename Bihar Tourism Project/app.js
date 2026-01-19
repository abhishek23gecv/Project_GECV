const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const indexRoute = require('./routes/index');
const attractionsRoute = require('./routes/attractions');
const festivalsRoute = require('./routes/festivals');
const cuisineRoute = require('./routes/cuisine');
const adventureRoute = require('./routes/adventures');
const craftsRoute = require('./routes/crafts');

// Use Routes
app.use('/', indexRoute);
app.use('/attractions', attractionsRoute);
app.use('/festivals', festivalsRoute);
app.use('/cuisine', cuisineRoute);
app.use('/adventure', adventureRoute);
app.use('/crafts', craftsRoute);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
