import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Product } from "../entities";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // stores data
  const [isLoading, setLoading] = useState(false);
  // stores loading state
  const [error, setError] = useState("");
  // stores potential errors

  // fetching data from /products endpoint
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/products");
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error instanceof AxiosError) setError(error.message);
        else setError("An unexpected error occurred");
      }
    };
    fetchProducts();
  }, []);

  // if items haven't rendered for whatever reason:
  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  if (products.length === 0) return <p>No products available.</p>;

  // else render items in a list
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
};

export default ProductList;
