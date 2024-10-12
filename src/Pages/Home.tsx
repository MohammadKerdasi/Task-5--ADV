import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

interface User {
  first_name: string;
  last_name: string;
  email: string;
  profile_image_url: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchLetters, setSearchLetters] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(8);
  const [isPopUpOpen, setisPopUpOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      navigate("/");
    } else {
      axios
        .get("https://test1.focal-x.com/api/items", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProducts(response.data);
          setFilteredProducts(response.data);
        })
        .catch((err) => console.log(err));

      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, [navigate]);

  useEffect(() => {
    const updateProductsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setProductsPerPage(8);
      } else if (width >= 1024) {
        setProductsPerPage(6);
      } else if (width >= 768) {
        setProductsPerPage(2);
      } else {
        setProductsPerPage(1);
      }
    };

    updateProductsPerPage();
    window.addEventListener("resize", updateProductsPerPage);

    return () => window.removeEventListener("resize", updateProductsPerPage);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const letter = event.target.value.toLowerCase();
    setSearchLetters(letter);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(letter)
    );
    setFilteredProducts(filtered);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setisPopUpOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .delete(`https://test1.focal-x.com/api/items/${selectedProduct.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            setFilteredProducts((prevProducts) =>
              prevProducts.filter(
                (product) => product.id !== selectedProduct.id
              )
            );
            setisPopUpOpen(false);
            setSelectedProduct(null);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const handleCancelDelete = () => {
    setisPopUpOpen(false);
    setSelectedProduct(null);
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const paginationButtons = [];

    paginationButtons.push(
      <button
        key={1}
        className={`lg:w-[60px] lg:h-[60px] w-[35px] h-[35px] rounded-full border flex justify-center items-center ${
          currentPage === 1 ? "bg-orange text-white" : "bg-white text-black"
        }`}
        onClick={() => goToPage(1)}
      >
        1
      </button>
    );

    if (totalPages > 3) {
      if (currentPage > 2) {
        paginationButtons.push(
          <span
            key="ellipsis"
            className="lg:w-[60px] lg:h-[60px] w-[35px] h-[35px] flex justify-center items-center"
          >
            ...
          </span>
        );
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(currentPage + 2, totalPages - 1);

      for (let i = start; i <= end; i++) {
        paginationButtons.push(
          <button
            key={i}
            className={`lg:w-[60px] lg:h-[60px] w-[35px] h-[35px] rounded-full border flex justify-center items-center ${
              currentPage === i ? "bg-orange text-white" : "bg-white text-black"
            }`}
            onClick={() => goToPage(i)}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 1) {
        paginationButtons.push(
          <span
            key="ellipsis-end"
            className="lg:w-[60px] lg:h-[60px] w-[35px] h-[35px] flex justify-center items-center"
          >
            ...
          </span>
        );
      }
      paginationButtons.push(
        <button
          key={totalPages}
          className={`lg:w-[60px] lg:h-[60px] w-[35px] h-[35px] rounded-full border flex justify-center items-center ${
            currentPage === totalPages
              ? "bg-orange text-white"
              : "bg-white text-black"
          }`}
          onClick={() => goToPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    } else {
      for (let i = 2; i <= totalPages; i++) {
        paginationButtons.push(
          <button
            key={i}
            className={`lg:w-[60px] lg:h-[60px] w-[35px] h-[35px]rounded-full border flex justify-center items-center ${
              currentPage === i ? "bg-orange text-white" : "bg-white text-black"
            }`}
            onClick={() => goToPage(i)}
          >
            {i}
          </button>
        );
      }
    }

    return paginationButtons;
  };

  return (
    <>
      <div className="flex flex-col items-center flex-1 md:w-full md:h-full md:px-3">
        <div className="md:px-4 md:flex md:flex-col md:justify-between lg:h-[85vh] md:h-[70vh]">
          <div className="w-full flex justify-center pt-[24px] xl:mb-[40px] mb-[20px]">
            <div className="relative lg:w-[664px] md:w-[450px]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search product by name"
                  value={searchLetters}
                  onChange={handleSearchChange}
                  className="lg:p-3 p-1 border border-gray-300 rounded-lg w-full pl-4 lg:placeholder:text-[14px] placeholder:text-[12px]"
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size="sm"
                  style={{ color: "#c4c4c4" }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                />
              </div>
            </div>
          </div>
          <div className="lg:mb-[32px] flex justify-end w-full">
            <Link to={"create"}>
              <p className="bg-orange uppercase text-white rounded-e lg:py-[13px] lg:px-[24px] py-2 px-4 lg:text-[14px] text-[12px]">
                ADD NEW PRODUCT
              </p>
            </Link>
          </div>
          <div className="grid md:w-[max-content] xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 md:mx-auto xl:gap-[40px] gap-[30px]">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="relative group lg:w-[180px] lg:h-[180px] md:w-[180px] md:h-[180px]"
              >
                <div className="relative lg:w-[180px] lg:h-[180px] md:w-[180px] md:h-[180px]">
                  <img
                    className="bg-white drop-shadow-3xl rounded-2xl lg:w-[180px] lg:h-[180px] md:w-[180px] md:h-[180px] flex justify-center items-center p-1 object-contain"
                    src={product.image_url}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.src = "./../../public/image 2.png";
                      e.currentTarget.alt = "Fallback product image";
                    }}
                  />
                </div>
                <div className="absolute top-0 left-0 lg:w-[180px] lg:h-[180px] md:w-[180px] md:h-[180px] bg-yellow-100 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex flex-col justify-center items-center space-x-4">
                  <Link
                    to={`/home/show/${product.id}`}
                    className="text-[25px] font-medium mb-[32px] text-center"
                  >
                    {product.name}
                  </Link>
                  <div className="flex justify-between items-center gap-[8px] !m-0">
                    <button
                      className="bg-orange text-white lg:w-[81px] w-[70px] py-1 rounded"
                      onClick={() => navigate(`/home/edit/${product.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-delete-red text-white lg:w-[81px] w-[70px] py-1 rounded"
                      onClick={() => handleDeleteClick(product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              className="bg-white text-black lg:w-[60px] lg:h-[60px] w-[35px] h-[35px] rounded-full border flex justify-center items-center hover:bg-orange transition-all"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            {renderPaginationButtons()}
            <button
              className="bg-white text-black lg:w-[60px] lg:h-[60px] w-[35px] h-[35px] rounded-full border flex justify-center items-center hover:bg-orange transition-all"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>

      {isPopUpOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black backdrop-blur-md bg-opacity-50">
          <div className="bg-white xl:py-[8%] xl:px-[8%] px-8 py-10 shadow-lg flex flex-col items-center w-[65.8333%] rounded-20px">
            <p className="xl:text-[22px] text-[15px] xl:mb-[80px] mb-10 uppercase">
              Are you sure you want to delete the product?
            </p>
            <div className="flex justify-evenly w-full">
              <button
                className="bg-orange text-white xl:text-[32px] text-[14px] px-5 py-1 rounded w-[180px]"
                onClick={handleConfirmDelete}
              >
                Yes
              </button>
              <button
                className="bg-orange text-white xl:text-[32px] text-[14px] px-5 py-1 rounded w-[180px]"
                onClick={handleCancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
