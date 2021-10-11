import 'dotenv/config';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

const apiRoutes = require('./routes/api.js');
 
const app = express();

app.use(express.static(__dirname + '/static'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.route('/')
  .get(function (req, res) {
    res.sendFile('tracker.html', { root: './dist/' });
  });

apiRoutes(app);

app.listen(process.env.PORT, () =>
  console.log('Example app listening on port ' + process.env.port),
);
