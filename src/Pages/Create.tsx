import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Uploadicon2 from './../assets/Uploadicon2.png';
import React, { useState } from "react";
import FileUpload from "../Components/FileUpload";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Create: React.FC = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [name, setName] = useState<string>("");  
  const [price, setPrice] = useState<string>("");  

  const handleFileUpload = (file: File) => {
    setImage(file); 
    setImagePreview(URL.createObjectURL(file)); 
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!image) {
      console.log("error: Image file is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name); 
    formData.append("price", price); 
    formData.append("image", image);  

    const token = localStorage.getItem("token");
    if (token) {
      axios.post("https://test1.focal-x.com/api/items", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", 
        },
      })
      .then((response) => {
        console.log("Product created:", response.data);
        navigate("/home");  
      })
      .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col pt-[24px] pb-[48px] ps-[64px] pr-28 w-full gap-4">
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
        <h1 className="xl:text-[60px] font-semibold xl:mb-[76px] lg:mb-6 text-[30px]">ADD NEW ITEM</h1>
        <div className="flex xl:flex-row flex-col xl:justify-between justify-start LG:mb-[76px] mb-[10px] xl:gap-[40px] gap-4">
          <div className="flex flex-col justify-between flex-1 xl:gap-0 gap-4 ">
            <div>
              <label className="xl:text-[32px] text-[16px] mb-[16px] font-medium text-label-color" htmlFor="">
                Name
              </label>
              <input
                className="w-full p-[15px] border placeholder:text-[12px]"
                placeholder="Enter the product name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)} 
              />
            </div>
            <div>
              <label className="xl:text-[32px] text-[16px] mb-[16px] font-medium text-label-color" htmlFor="">
                Price
              </label>
              <input
                className="w-full p-[15px] border placeholder:text-[12px] "
                placeholder="Enter the product price"
                type="text"
                value={price}
                onChange={(event) => setPrice(event.target.value)}  
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="xl:text-[32px] text-[16px] font-medium text-label-color" htmlFor="">Image</label>
            <div className="relative">
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Uploaded preview" 
                  className="w-[547px] h-[209px] object-contain p-1 !mb-0 border-dashed border-2 bg-upload border-gray-300" 
                />
              ) : (
                <FileUpload
                  img={Uploadicon2} 
                  className2="w-[120px]"
                  className="xl:w-[547px] w-full xl:h-[209px] h-[130px] !mb-0"
                  setImage={setImage}
                  onFileUpload={handleFileUpload}
                />
              )}
            </div>
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="bg-orange text-white p-3 rounded w-[200px] text-center">Save</button>
        </div>
      </form>
    </>
  );
};

export default Create;
