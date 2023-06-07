var express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect(`inserir_link_do_mongodb`, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => { console.log('Server Online') },
  err => { console.log('Damn, that must be something wrong...' + err) });

const sneakerRoutes = require('./routes/sneakers.route');
var app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/', sneakerRoutes);

/*app.get('/', function(req, res){
  res.send("Salve, Rapaziada!");
});
*/
app.listen(3000, function () {
  console.log('Listening on port 3000!');
});