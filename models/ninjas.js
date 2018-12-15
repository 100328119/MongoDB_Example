//model class, define collection schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create geolocation schema
const GeoSchema = new Schema({
  type:{
    type:String,
    default:"Point",
  },
  coordinates:{
    type:[Number],
    index:"2dsphere"
  }
});
//create ninjas model
const NinjasSchema = new Schema({
  name:{
    type:String,
    required:[true, 'required']
  },
  rank:{
    type:String
  },
  available:{
    type: Boolean,
    default:false
  },
  geometry:GeoSchema
});

//mongoose.model(collection-name,collection-schema);
const Ninja = mongoose.model('ninja',NinjasSchema);

module.exports = Ninja;
