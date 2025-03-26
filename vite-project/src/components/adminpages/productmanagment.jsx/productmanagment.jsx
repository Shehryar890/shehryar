
import { useState } from "react"
import Loader from "../../loadingspinner"
import axios from "axios"
const ProductCreatePage = ()=>{
      

         const [loading  , setloading]= useState(false)
const [ images, setImages] = useState("")
 const [messages, setMessages] = useState("")
         const [formdata , setformdata]= useState(




{
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    discount: "",
    skinType: "",
    ingredients: ""
  

}














         )
         const handleChange = (event)=>{
      
                   setformdata({
   ...formdata  ,  [event.target.name] :event.target.value


                   })

         }
         const handleFileChange = (e) => {
            setImages(Array.from(e.target.files)); // 
        };
        
        


                 const sendData = async (e)=>{
        


               e.preventDefault();

                  const data = new FormData();
                     


                  Object.keys(formdata).forEach(key=>{
                    data.append(   key , formdata[key]);
                  });
                                 
                  if (images.length > 0) {
                    images.forEach((file, index) => {
                        data.append(`images`, file);
                    });
                }
                

                  for (var pair of data.entries()) {
                    console.log(pair[0], pair[1]);
                  }
                  


                try{
                 setloading(true)

                const response  =  await  axios.post( "http://localhost:8345/create/product" , data,
                    {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                        
                        },
                    } );
                     setloading(false)
                        setMessages("product created successfully")
                        console.log(response.data);
            





                    



                    }
                    catch(error){
                        setloading(false)
                         setMessages("Failed to create product")
                         console.log(error.message);
                    }
                 




                    
                  
                     

                    





                 }




        

             return (




 


                    <>
                    
                    <form   onSubmit={sendData}


                                     
                    
                    
                    >

                        {
                            loading &&<Loader></Loader>
                        }
                        
                     <h1>Create a New Product</h1>
                     <div>
                         <label for="name">Product Name</label>
                         <input type="text" id="name" name="name" required      onChange={handleChange}         />
                     </div>
                     <div>
                         <label for="description">Product Description</label>
                         <textarea id="description" name="description" required  onChange={handleChange}  ></textarea>
                     </div>
                     <div>
                         <label for="price">Price</label>
                         <input type="number" id="price" name="price" required   onChange={handleChange}  />
                     </div>
                     <div>
                         <label for="category">Category</label>
                         <input type="text" id="category" name="category" required  onChange={handleChange}  />
                     </div>
                     <div>
                         <label for="brand">Brand</label>
                         <input type="text" id="brand" name="brand" required   onChange={handleChange} />
                     </div>
                     <div>
                         <label for="stock">Stock</label>
                         <input type="number" id="stock" name="stock" required   onChange={handleChange} />
                     </div>
                     <div>
                         <label for="discount">Discount</label>
                         <input type="number" id="discount" name="discount"   onChange={handleChange} />
                     </div>
                     <div>
                         <label for="skinType">Skin Type</label>
                         <input type="text" id="skinType" name="skinType"  onChange={handleChange}  />
                     </div>
                     <div>
                         <label for="ingredients">Ingredients</label>
                         <textarea id="ingredients" name="ingredients" required  onChange={handleChange}  ></textarea>
                     </div>
                     <div>
                         <label for="images">Images</label>
                        <input type="file" name="images" id ="images" multiple   onChange={handleFileChange}  ></input> 
                     </div>


                          
                     <div>
          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Submit"}
          </button>
        </div>





                    </form>
                    </>
                       






             )







             

              
          


}

export default ProductCreatePage;
