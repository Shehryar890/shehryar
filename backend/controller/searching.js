
require('dotenv').config(); 

const Product = require("../models/product")
const axios = require("axios")


   const checkQuery =(brands,category,ingredients ,query)=>{

                            let brandmatch=[]
                            let ingredientsmatches=[]
                            let categorymatches=[]
                           
const querysplitting = query.toLowerCase().split(' ')


brandmatch = querysplitting.map((item)=>{
   return  brands.find((c)=>c.toLowerCase()===item)
})
.filter(value= value !=undefined);

 categorymatches = querysplitting.map((item)=>
{
   return  category.find(c=>c.toLowerCase()===item)
    }).filter(value=>value!=undefined)


 


ingredientsmatches = querysplitting.map((item)=>{
   return  ingredients.find(i=>i.toLowerCase()===item)
    })
    .filter(value=>value!=undefined)



  const obj={
    brandmatch,
    categorymatches,
    ingredientsmatches
  }

  return obj;


       }

       const makequery=(brandmatch, category, ingredients)=>{
        let flat ={}
        if(brandmatch.length>0){
            flat.brand={$in:brandmatch}
        }
        if(category.length>0){
            flat.category={$in:category}
        }

        if(ingredients.length>0){
            flat.ingredients={$in:ingredients}
        }




return Object.keys(flat).length>0?flat:null
       }


       
const doEmbedding = async (query)=>{


const googleSecret = process.env.GOOGLEEMBEDDINGSECRET
const Api_Url = `https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent?key=${googleSecret}`;

try{
     const response  = await axios.post(
        Api_Url,
        {
        model: "models/embedding-001",
        content: {
          parts: [
            { text: query }
          ]
        }
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }

     )
       if (
      response.data &&
      response.data.embedding &&
      response.data.embedding.values
    ) {
      return {succcess:true , data:response.data.embedding.values}; // This is the float array (vector)
    } else {
      throw new Error("Embeddings not found in response");
    }

}catch(error){
    console.log(error.message)
  return { success: false, error: error.message };
}

}



const cosineSimilarity = async (vectorA, vectorB)=>{
try{
 if(vectorA.length !== vectorB.length){
  throw new Error("both vectors are of different magnitudes")
 }

     let dotproduct = 0;
     let magnitudeofvectorA = 0;
     let magnitudeofvectorB = 0;



     for(let i=0; i<vectorA.length; i++){
                 
      dotproduct += vectorA[i]*vectorB[i];
      magnitudeofvectorA += vectorA[i]**2;
      magnitudeofvectorB  += vectorB[i]**2
          


     }
                  magnitudeofvectorA = Math.sqrt(magnitudeofvectorA)
                  magnitudeofvectorB= Math.sqrt(magnitudeofvectorB)

                  if(magnitudeofvectorA ===0 || magnitudeofvectorB ===0){
                    return 0;
                  }
                  return dotproduct/(magnitudeofvectorA*magnitudeofvectorB)
}catch(error){
  console.log(error.message)
}
}

const SearchFunction =async(req,res)=>{



    
    const {query}= req.body;





    const  products = await Product.find({})

    if(!products || products.length===0){
        return res.status(400).json({
            success:false,
            message:"Product didnt exist"
        })
    }
       
     let brands=[]
     let category=[]
     let ingredients=[]

   brands =[ ...new Set(products.map((item)=>{
        return item.brand
     }))]

     category = [...new Set(products.flatMap((item)=>{
        return  item.category
     }))]

     ingredients = [...new Set(products.flatMap((item)=>{
       return item.ingredients
     }))]



     const isTrue = checkQuery(brands,category,ingredients, query)

const brandmatch = isTrue.brandmatch;
const categorymatch = isTrue.categorymatches
const  ingredientsmatches = isTrue.ingredientsmatches


const filter = makequery(brandmatch,categorymatch,ingredientsmatches)
     



if(filter){
  try{
    const queryProducts  = await Product.find(filter)

    return res.status(200).json({
        success:true,
        message:"successfully done",
        queryProducts:queryProducts
    })
  }catch(error){
    console.log(error,message)

    
  }
}
else{


  try{

     const embedding = await  doEmbedding(query)


   

    

    
    if(!embedding.succcess){
   throw new Error("query isnt embedded successfully")
    }
   
      const queryEmbedding = embedding.data


       const threshold = 0.75;
       let productitems = []

       for (const  item of products){

   const similarity =  await cosineSimilarity(item.embedding , queryEmbedding)
               if(similarity>=threshold)
               {
                     
                productitems.push({
                  products:item,
                  similarity:similarity
                })
             
                
               }
      

       }

       const sortedProducts = productitems.sort((a,b)=>
        {
      return   b.similarity-a.similarity
       })
        

         return res.status(200).json({
          success:true,
          message:"products with similarity fetched succesfully",
          products:sortedProducts
         })
         
    
        
           
        
        }catch(error){
          res.status(500).json({
            succcess:false,
            message:"Internal Server Error"
          })
        }

    


  




 
}


}






module.exports={
  SearchFunction
}