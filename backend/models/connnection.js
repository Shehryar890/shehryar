 
 const fs = require('fs').promises;
 const path = require('path');

 const {menProducts , womenProducts , skincareProducts} = require('./descriminator');

 const Product = require('./product');




 
    async function seedData (){

                 await menProducts.deleteMany();
                 await womenProducts.deleteMany();
                 await skincareProducts.deleteMany();
const mendata = await fs.readFile(path.join(__dirname, 'data', 'menproduct.json'), 'utf-8');
const womendata = await fs.readFile(path.join(__dirname, 'data', 'womenproduct.json'), 'utf-8');
const skindata = await fs.readFile(path.join(__dirname, 'data', 'skincareProducts.json'), 'utf-8');

try{
const menJson = JSON.parse(mendata);
                
                 const womenJson = JSON.parse(womendata);
                 const skincareJson = JSON.parse(skindata);
                 await menProducts.insertMany(menJson);
                 await womenProducts.insertMany(womenJson);
                 await skincareProducts.insertMany(skincareJson);
                 console.log(menJson);
                 console.log(womenJson);
                 console.log(skincareJson);
                 console.log("data successfully seeded")
}
 catch(err){
                 console.log(err);
                 console.log("shery bnda ban sahi code kar ")
                 }

        


    };



seedData();



