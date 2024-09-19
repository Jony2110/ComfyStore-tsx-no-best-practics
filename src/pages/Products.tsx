// src/components/Products.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


interface Product {
  id: number;
  title: string;
  category: string;
  company: string;
  price: number;
  shipping: boolean;
  image: string;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [shippingFilter, setShippingFilter] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>("a-z");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://strapi-store-server.onrender.com/api/products"
        );
        const data = await response.json();
        const products: Product[] = data.data.map((item:any) => ({
          id: item.id,
          title: item.attributes.title,
          category: item.attributes.category,
          company: item.attributes.company,
          price: parseInt(item.attributes.price),
          shipping: item.attributes.shipping,
          image: item.attributes.image,
        }));
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleFilter = (event: React.FormEvent) => {
    event.preventDefault();
    const filtered = products.filter((product) => {
      return (
        (searchTerm === "" ||
          product.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCategory === "" || product.category === selectedCategory) &&
        (selectedCompany === "" || product.company === selectedCompany) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        (!shippingFilter || product.shipping === shippingFilter)
      );
    });

    let sortedProducts = [...filtered];

    if (sortOption === "a-z") {
      sortedProducts = sortedProducts.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (sortOption === "z-a") {
      sortedProducts = sortedProducts.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    } else if (sortOption === "low") {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high") {
      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(sortedProducts);
    setCurrentPage(1);
  };

  const handleClear = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedCompany("");
    setPriceRange([0, 100000]);
    setShippingFilter(false);
    setFilteredProducts(products);
    setCurrentPage(1);
  };

  const handleImageClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="p-5 container mx-auto max-w-[1024px]">
      <form className="flex flex-col items-center mb-4 bg-base-200">
        <div className="flex justify-between gap-4 mb-4 w-full">
          <label className="block">
            Search Product
            <input
              type="text"
              className="input input-bordered w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>

          <label className="block">
            Select Category
            <select
              className="select select-bordered w-full"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="tables">Tables</option>
              <option value="chairs">Chairs</option>
              <option value="kids">Kids</option>
              <option value="sofas">Sofas</option>
              <option value="beds">Beds</option>
            </select>
          </label>

          <label className="block">
            Select Company
            <select
              className="select select-bordered w-full"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              <option value="">All</option>
              <option value="Modenza">Modenza</option>
              <option value="Luxora">Luxora</option>
              <option value="Artifex">Artifex</option>
              <option value="Homestead">Homestead</option>
            </select>
          </label>

          <label className="block">
            Sort By
            <select
              className="select select-bordered w-full"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="a-z">a-z</option>
              <option value="z-a">z-a</option>
              <option value="low">low</option>
              <option value="high">high</option>
            </select>
          </label>
        </div>

        <div className="flex justify-between mb-4 w-[1024px] max-w-[1024px]">
          <label className="block">
            <div>
              <span>Select Price</span> <span>{`$${priceRange[1]}`}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100000"
              value={priceRange[1]}
              className="range range-primary"
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            />
          </label>

          <label className="block">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={shippingFilter}
              onChange={(e) => setShippingFilter(e.target.checked)}
            />
          </label>

          <div className="flex gap-2">
            <button
              onClick={handleFilter}
              className="btn btn-primary w-full"
            >
              SEARCH
            </button>
            <button
              onClick={handleClear}
              className="btn btn-accent w-full"
            >
              RESET
            </button>
          </div>
        </div>
      </form>

      <div className="mb-4">
        <p className="text-center">{`Page ${currentPage} of ${totalPages}`}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <div
            onClick={() => handleImageClick(product.id)}
            key={product.id}
            className="card bg-base-100 shadow-xl"
          >
            <figure>
              <img
                className="rounded-xl h-64 md:h-48 w-full object-cover cursor-pointer"
                src={product.image}
                alt={product.title}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.title}</h2>
              <p>${product.price}</p>
              <p>{product.shipping ? "Free Shipping" : "No Free Shipping"}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <div className="btn-group">
          <button
            className="btn"
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            PREV
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`btn ${currentPage === i + 1 ? "btn-active" : ""}`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="btn"
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;
