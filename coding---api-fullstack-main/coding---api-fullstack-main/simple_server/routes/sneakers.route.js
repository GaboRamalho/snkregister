const express = require('express');
const app = express();
const sneakerRoutes = express.Router();

let Sneakers = require('../model/Shoes');

// Adicionar sneaker - POST
  sneakerRoutes.post('/add', async (req, res) => {
    try {
      const { name, brand, size } = req.body;
      
      const sneaker = new Sneakers({ name, brand, size });
      await sneaker.save();
      
      res.status(200).json({ status: 'success', message: 'Sneaker added successfully' });
    } catch (err) {
      res.status(409).json({ status: 'failure', message: 'Unable to save to database' });
    }
  });


// api to get sneakers
sneakerRoutes.route('/getsneakers').get(function (req, res) {
  Sneakers.find(function (err, sneakers){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','sneakers': sneakers});
    }
  });
});

// api to get sneaker
sneakerRoutes.route('/sneaker/:id').get(function (req, res) {
  let id = req.params.id;
  Sneakers.findById(id, function (err, sneaker){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','sneaker': sneaker});
    }
  });
});

// api to update route
sneakerRoutes.route('/update/:id').put(function (req, res) {
    Sneakers.findById(req.params.id, function(err, sneaker) {
    if (!sneaker){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        sneaker.name = req.body.name;
        sneaker.brand = req.body.brand;
        sneaker.size = req.body.size;

        sneaker.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
sneakerRoutes.route('/delete/:id').delete(function (req, res) {
  Sneakers.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = sneakerRoutes;