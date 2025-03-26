const Product = require('./product.js');
const mongoose = require('mongoose');

const menScehma = new mongoose.Schema({
    fabric: { type: String, required: true, default: "Cotton" }, 
    fit: { type: String, required: true, default: "Regular" }, 
    occasion: { type: String, required: true, default: "Casual" }, 
    style: { type: String, required: true, default: "Modern" }, 
  }, { timestamps: true });
  
  // Indexes specific to the Men category
  menScehma.index({ fabric: 1 }); // Index for 'fabric'
  menScehma.index({ occasion: 1 }); // Index for 'occasion'
  
  const menProducts = Product.discriminator('Men', menScehma);
  
  // Women schema
  const womenSchema = new mongoose.Schema({
    material: { type: String, required: true, default: "Cotton" },  
    careInstructions: { type: String, required: true, default: "Machine wash cold" }, 
    size: { type: String, required: true, default: "M" },
  }, { timestamps: true });
  
  // Indexes specific to the Women category
  womenSchema.index({ material: 1 }); // Index for 'material'
  womenSchema.index({ size: 1 }); // Index for 'size'
  
  const womenProducts = Product.discriminator('Women', womenSchema);
  
  // Skincare schema
  const skincareSchema = new mongoose.Schema({
    filling: { type: String, required: true, default: "150ml" },
  }, { timestamps: true });
  
  // Index specific to the Skincare category
  skincareSchema.index({ filling: 1 }); // Index for 'filling'
  
  const skincareProducts = Product.discriminator('Skincare', skincareSchema);
  
  module.exports = {
    menProducts,
    womenProducts,
    skincareProducts
  };
  