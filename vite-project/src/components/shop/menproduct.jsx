import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MenProducts = () => {
  const [comingData, setdata] = useState([]);
  const [error, setError] = useState("");
  const { categoryName } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/shop/${categoryName}`)
      .then((response) => {
        setdata(response.data.products);
        console.log(response.data);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  }, [categoryName]);

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  if (!comingData.length) {
    return <h1>Loading...</h1>;
  }

  return comingData.map((item) => {
    const imageUrl = `http://localhost:9000/${item.image}`;
    console.log(imageUrl);

    return (
      <div key={item._id}>
        <h2>{item.name}</h2>
        <img src={imageUrl} alt={item.name} />
        <h3>${item.price}</h3>
        <span>{item.brand}</span>
        <span>{item.description}</span>
        <h3>{item.details}</h3>
        <h3>{item.rating}</h3>
      </div>
    );
  });
};

export default MenProducts;
