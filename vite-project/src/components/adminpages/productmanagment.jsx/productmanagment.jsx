import { useState } from "react";
import axios from "axios";
import Loader from "../../loadingspinner";
const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    
    category: [],
    brand: "",
    images: [],
    stock: "",
    sold: "",
    discountoffer: "",
    ingredients: [],
    skintype: "",
    categoryInput: "",
    ingredientsInput: "",
  });
  const [loading , setloading] = useState(false)
  const [data,setdata ] = useState(null)
  

  const handleChange = (e) => {
    if(e.key==='Enter'){
    e.preventDefault()
    }
    setProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleKeyForCategory = (e) => {
    if (e.key === "Enter" && product.categoryInput.trim() !== "") {
    e.preventDefault();

      const categoryClear = product.categoryInput.trim();

      setProduct((prev) => ({
        ...prev,
        category: [...prev.category, categoryClear],
        categoryInput: "",
      }));
    }
  };

  const handleKeyIngredients = (e) => {
    if (e.key === "Enter" && product.ingredientsInput.trim() !== "") {
    e.preventDefault();

      const ingredientsValue = product.ingredientsInput.trim();
      setProduct((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredientsValue],
        ingredientsInput: "",
      }));
    }
  };

const handleFile = (e) => {

  
  e.preventDefault();
  const files = Array.from(e.target.files);
  console.log(files);
  setProduct((prev) => ({
    ...prev,
    images: files,
  }));
};


const removeCategroy = (indextoremove)=>{

  
 

 setProduct((prev)=>({

  ...prev,
  category:(product.category.filter((_, index)=>{
 return  index !==indextoremove
 }))

 }))
      

        



}

const  removeIngredients = (indextoremove)=>{

setProduct((prev)=>({

  ...prev,
  ingredients:product.ingredients.filter((_, index)=>{
  return index !==indextoremove
})

}))
}

const handleinputkey =(e)=>{
  if(e.key ==='Enter'){
    e.preventDefault()
  }
}


  const handleSubmit = async (event) => {
    setloading(true)
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("brand", product.brand);
    formData.append("stock", product.stock);
    formData.append("skintype", product.skintype);
    formData.append("discountoffer", product.discountoffer);

    product.images?.forEach((file)=>{
      formData.append("images", file)
    });


    product.category.forEach(cat => {
      formData.append("category", cat)
    });

    product.ingredients.forEach((ing) => {
      formData.append("ingredients", ing);
    })
console.log([...formData.entries()])
    try {
      const response = await axios.post(
        "http://localhost:8345/create/product",
        formData,
  
      
      );
      alert("data fetched")
      console.log("Successfully uploaded", response.data);
    setdata(response.data.product)
    } catch (error) {
      alert(error)
      console.error(error);
    }
    finally{
      setloading(false)
    }
  };

  return (
    <>

    {loading !==true?( 

<>
  <div className="flex justify-center items-center min-h-72 bg-gray-100 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-6xl bg-white p-8 rounded-2xl shadow-lg">
    <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">Create New Product</h1>

       
    <form  method="POST"
        className="space-y-6"
          onKeyDown ={handleinputkey}
        
        >

 
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter product name"
            value={product.name}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>


        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Product Description</label>
        <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Enter description"
            value={product.description}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

       
       
                <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded p-2 min-h-[48px] focus-within:ring-2 ring-blue-400">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Product Category</label>
      
          <input
            type="text"
            name="categoryInput"
            id="categoryInput"
            value={product.categoryInput}
            onChange={handleChange}
            onKeyDown={handleKeyForCategory}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
placeholder="Enter category and click enter"

            
          />

  {product.category.map((keyword, index) => (
          <span
            key={index}
            className="flex items-center bg-blue-100 text-blue-800 px-2 py-1  text-sm"
          >
            {keyword}
            <button
              type="button"
              className="ml-1 text-red-500 font-bold text-1xl"
              onClick={()=>removeCategroy(index)}
            >
              × 
            </button>
          </span>
        ))}

         
        </div>

    

        
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Product Brand</label>
          <input
            type="text"
            name="brand"
            id="brand"
            value={product.brand}
            placeholder="enter brand name"
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>


        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="text"
            name="stock"
            id="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="enter stock in number"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

     
        <div>
          <label htmlFor="discountoffer" className="block text-sm font-medium text-gray-700">Discount Offer (%)</label>
          <input
            type="text"
            name="discountoffer"
            placeholder="%"
            id="discountoffer"
            value={product.discountoffer}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            placeholder="enter price in number"
            value={product.price}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>


        <div>
          <label htmlFor="skintype" className="block text-sm font-medium text-gray-700">Skin Type</label>
          <input
            type="text"
            name="skintype"
            placeholder="oily,skinny,mix"
            id="skintype"
            value={product.skintype}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        
                <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded p-2 min-h-[48px] focus-within:ring-2 ring-blue-400">
       
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Product Ingredients</label>
          <input
            type="text"
            name="ingredientsInput"
            id="ingredients"
            value={product.ingredientsInput}
            onChange={handleChange}
            onKeyDown={handleKeyIngredients}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
           {product.ingredients.map((keyword, index) => (
          <span
            key={index}
            className="flex items-center bg-blue-100  text-white-800 px-2 py-1 text-sm"
          >
            {keyword}
            <button
            type="button"
              
              className="ml-1 text-red-500 font-bold"
              onClick={()=>removeIngredients(index)}
            >
              × 
            </button>
          </span>
        ))}
          

        </div>

      </div>

     
      <div>
        <label htmlFor="images" className="block text-sm font-medium text-gray-700">Product Images</label>
        <input
          type="file"
          name="images"
          id="images"
          multiple
          onChange={handleFile}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 file:bg-indigo-50 file:text-indigo-600 file:border file:rounded file:px-4 file:py-1"
        />
      </div>

    
      <div className="text-center">
        <button
          type="submit"
           onClick={handleSubmit} 
          className="mt-4 w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          Submit Product
        </button>
      </div>
    </form>
  </div>
</div>


{data && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center animate-fade-in-up">
      <h2 className="text-2xl font-semibold text-green-600 mb-2">Product Created Successfully!</h2>
      <p className="text-gray-700 font-medium">{data.name}</p>
      <p className="text-gray-500 text-sm mt-1">{data.description}</p>
      <p className="text-gray-500 text-sm mt-1">{data.price}</p>

      {data.category.map((item, )=>(
        <> <p>{item}</p>
        </>
      ))}
          {data.ingredients.map((item, )=>(
        <> <p>{item}</p>
        </>
      ))}
      <p className="text-gray-500 text-sm mt-1">{data.stock}</p>
      <p>{data.discountoffer}</p>
      

      
      

      <p className="text-gray-500 text-sm mt-1">{data.description}</p>

     
      <button
        onClick={() => setdata(null)}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Close
      </button>
    </div>
  </div>
)}


</>
  
):(
  <Loader/>

)
}

    </>
  );
};

export default CreateProduct;
