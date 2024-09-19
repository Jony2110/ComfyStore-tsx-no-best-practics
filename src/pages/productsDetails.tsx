import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  category: string;
  company: string;
  price: number;
  shipping: boolean;
  image: string;
  description: string;
}

interface ProductDetailsProps {
  addToCart: (product: Product & { color: string; amount: number }) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [amount, setAmount] = useState<number>(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://strapi-store-server.onrender.com/api/products/${id}`
        );
        const data = await response.json();
        const productData = data.data;
        setProduct({
          id: productData.id,
          title: productData.attributes.title,
          category: productData.attributes.category,
          company: productData.attributes.company,
          price: parseInt(productData.attributes.price, 10), // Ensure price is a number
          shipping: productData.attributes.shipping,
          image: productData.attributes.image,
          description: productData.attributes.description,
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (selectedColor && product) {
      addToCart({ ...product, color: selectedColor, amount });
    } else {
      alert("Please select a color.");
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-5 container mx-auto max-w-[1024px]">
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img
            className="rounded-xl h-64 md:h-48 w-full object-cover"
            src={product.image}
            alt={product.title}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.title}</h2>
          <p>{product.description}</p>
          <p>Category: {product.category}</p>
          <p>Company: {product.company}</p>
          <p>Price: ${product.price}</p>
          <p>{product.shipping ? "Free Shipping" : "No Free Shipping"}</p>
          <div className="my-4">
            <h3 className="font-semibold">Colors</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedColor("red")}
                className={`w-6 h-6 rounded-full bg-red-500 ${
                  selectedColor === "red" ? "ring-2 ring-offset-2 ring-red-500" : ""
                }`}
              ></button>
              <button
                onClick={() => setSelectedColor("yellow")}
                className={`w-6 h-6 rounded-full bg-yellow-500 ${
                  selectedColor === "yellow" ? "ring-2 ring-offset-2 ring-yellow-500" : ""
                }`}
              ></button>
            </div>
          </div>
          <div className="my-4">
            <label className="font-semibold">Amount</label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="border p-2 rounded w-full"
            />
          </div>
          <button onClick={handleAddToCart} className="btn btn-primary w-full">
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
