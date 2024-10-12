import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import FileUpload from "./../Components/FileUpload"; 
import Uploadicon2 from "./../assets/Upload-icon.png"; 

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

const Update: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | string>(0);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && id) {
      axios
        .get(`https://test1.focal-x.com/api/items/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const productData = response.data;
          setProduct(productData);
          setName(productData.name);
          setPrice(productData.price);
          setImageUrl(productData.image_url);
        })
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id]);

  const handleUpdateProduct = (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (token && product) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price.toString());
      formData.append("_method", "PUT");
      if (image) {
        formData.append("image", image);
      }

      axios
        .post(`https://test1.focal-x.com/api/items/${product.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          navigate("/home");
        })
        .catch((err) => console.error("Error updating product:", err));
    }
  };

  const handleFileUpload = (file: File) => {
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  return (
    <form onSubmit={handleUpdateProduct} className="flex flex-col pt-[24px] pb-[48px] ps-[64px] pr-28 w-full gap-4">
      <div
        className="w-[40px] h-[40px] flex justify-center items-center border-[1px] border-black rounded-full cursor-pointer xl:mb-[76px] lg:mb-6"
        onClick={() => navigate("/home")}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="sm"
          style={{ color: "#000000" }}
        />
      </div>
      <h1 className="xl:text-[60px] font-semibold xl:mb-[76px] lg:mb-6 text-[30px]">UPDATE ITEM</h1>
      <div className="flex xl:flex-row flex-col xl:justify-between justify-start lg:mb-[76px] mb-[10px] xl:gap-[40px] gap-4">
        <div className="flex flex-col justify-between flex-1 xl:gap-0 gap-4">
          <div>
            <label className="xl:text-[32px] text-[16px] mb-[16px] font-medium text-label-color" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="w-full p-[15px] border"
              placeholder="Enter the product name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div>
            <label className="xl:text-[32px] text-[16px]  mb-[16px] font-medium text-label-color" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              className="w-full p-[15px] border placeholder:text-[12px]"
              placeholder="Enter the product price"
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="xl:text-[32px] text-[16px] text-label-color font-medium mb-0" htmlFor="image">
            Image
          </label>
          <FileUpload
            img={Uploadicon2}
            imageUrl={imageUrl} 
            className="xl:w-[547px] w-full xl:h-[209px] h-[130px] !mb-0"
            setImage={setImage}
            onFileUpload={handleFileUpload}
            className2=" object-contain h-full"
          />
        </div>
      </div>
      <div className="text-center">
        <button type="submit" className="bg-orange text-white p-3 rounded w-[200px] text-center">
          Save
        </button>
      </div>
    </form>
  );
};

export default Update;