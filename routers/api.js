//require nesseary package
const express = require('express');
const router = express.Router();
const Ninja = require("../models/ninjas");

//get data from db
router.get('/ninjas',function(req,res,next){
  //res.send({type:'GET'});
  //console.log(next);
  //get near by entity
  Ninja.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
                },
                distanceField: "dist.calculated",
                maxDistance: 100000,
                spherical: true
            }
        }
    ]).then(function(ninjas){
    res.send(ninjas);
  }).catch(next);
});

//add new data
router.post('/ninjas',function(req,res,next){
  //console.log(req.body);
  Ninja.create(req.body).then(function(ninja){
    res.send({ninja});
  }).catch(next);
});

//update data
router.put('/ninjas/:id',function(req,res,next){
  Ninja.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
    //res.send(oldninja);
      Ninja.findOne({_id:req.params.id}).then(function(newninja){
        res.send(newninja);
      });
  });
  //res.send({type:'PUT'});
});

//delete data
router.delete('/ninjas/:id',function(req,res,next){
  //req.params."whatever thing is defined" to get value
  //console.log(req.params.id);
  Ninja.findByIdAndRemove({_id:req.params.id}).then(function(ninja){
    res.send(ninja);
  });
  //res.send({type:'DELETE'});
});

module.exports = router;
