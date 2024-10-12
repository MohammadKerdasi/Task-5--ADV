import React, { useState } from "react";
import axios from "axios";
import logo from "./../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import FileUpload from "../Components/FileUpload";
import Upload_icon from "./../assets/Upload-icon.png";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConf, setPasswordConf] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    setImage(file); 
    setImagePreview(URL.createObjectURL(file)); 
  };

  const generateUserName = (firstName: string, lastName: string) => {
    const timestamp = Date.now();
    return `${firstName.toLowerCase()}_${lastName.toLowerCase()}_${timestamp}`;
  };

  const send = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== passwordConf) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    const userName = generateUserName(firstName, lastName);

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConf);
    formData.append("user_name", userName);

    if (image) {
      console.log("Appending image to formData:", image);
      formData.append("profile_image", image, image.name);
    } else {
      console.warn("No image selected!");
    }

    axios.post('https://test1.focal-x.com/api/register', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
        console.log("Token received:", res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        console.log(localStorage.setItem)
        navigate('/');
    })
    .catch((err) => {
      console.error("API error:", err.response ? err.response.data : err.message);
      setErrorMessage("Error during registration. Please try again.");
    });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-orange to-light-orange">
      <div className="w-[276px] md:w-[476px] lg:py-[42px] lg:px-[30.6px] px-7 py-4 rounded-[20px] bg-white">
        <form className="flex flex-col" onSubmit={send}>
          <div className="text-3xl text-center">
            <img className="mx-auto lg:mb-[43px] mb-4 lg:w-[150px] w-[100px]" src={logo} alt="Logo" />
            <h2 className="font-semibold lg:text-[22px] text-[18px]">SIGN UP</h2>
            <p className="text-sm text-light-gray-2">
              Fill in the following fields to create an account
            </p>
          </div>
          <label className="text-light-gray-2 text-sm mb-[10px]">Name</label>
          <div className="flex justify-between flex-col md:flex-row">
            <input
              type="text"
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="First Name"
              required
              className="p-2 border w-[200px] rounded-[4px] placeholder-gray-300 text-sm lg:mb-[20px] mb-[10px]"
            />
            <input
              type="text"
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Last Name"
              required
              className="p-2 border w-[200px] rounded-[4px] placeholder-gray-300 text-sm lg:mb-[20px] mb-[10px]"
            />
          </div>
          <label className="text-light-gray-2 text-sm mb-[10px]">Email</label>
          <input
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
            className="p-2 border w-full rounded-[4px] placeholder-gray-300 text-sm lg:mb-[30px] mb-[10px]"
          />
          <label className="text-light-gray-2 text-sm mb-[10px]">Password</label>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-[10px]">{errorMessage}</p>
          )}
          <div className="flex justify-between flex-col md:flex-row">
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              required
              className="p-2 border w-[200px] rounded-[4px] placeholder-gray-300 text-sm mb-[20px]"
            />
            <input
              type="password"
              onChange={(event) => setPasswordConf(event.target.value)}
              placeholder="Confirm password"
              required
              className="p-2 border w-[200px] rounded-[4px] placeholder-gray-300 text-sm mb-[20px]"
            />
          </div>
          <div className="relative">
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Uploaded preview" 
                  className=" w-[120px] object-contain p-1 my-2 border-dashed border-2 bg-upload border-gray-300 " 
                />
              ) : (
                <FileUpload
                  img={Upload_icon} 
                  className2="w-[40px] object-contain"
                  className="w-[100px] h-[100px] "
                  setImage={setImage}
                  onFileUpload={handleFileUpload}
                />
              )}
            </div>
          <input
            type="submit"
            value="SEND"
            className="p-2 bg-orange cursor-pointer rounded-[4px] lg:mb-[27px] mb-2 text-white"
          />
          <p className="text-sm text-light-gray-2 text-center">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-orange underline underline-offset-1 decoration-orange"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
