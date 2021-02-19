require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helper = require('./src/helpers/helper');
const indexRoutes = require('./src/routes/index');

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(morgan('dev'));

// Main API
app.use('/v1', indexRoutes);

app.use('*', (req, res) => {
  helper.reject(res, null, 404, 'URL Not Found');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
