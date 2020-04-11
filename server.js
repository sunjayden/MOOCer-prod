const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const favicon = require('express-favicon');
const path = require('path');

// Import environment variable
dotenv.config();

const port = process.env.PORT || 8080;

// Import routes
const authRoute = require('./server/routes/user');
const courseRoute = require('./server/routes/course');
const reviewRoute = require('./server/routes/review');

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	},
	() => console.log('Connected to DB!')
);

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Static 
app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/courses', courseRoute);
app.use('/api/reviews', reviewRoute);

// React
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}!`));