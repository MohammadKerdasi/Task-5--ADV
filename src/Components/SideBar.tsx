import React from "react";
import logo from "./../assets/Logo.png";
import logout from "./../assets//sign-out-alt 1.png";
import { buttons, ButtonComponent } from "./../Components/Button";
import { navigate, useNavigate } from "react-router-dom";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  profile_image_url: string;
}

interface SideBarProps {
  user: User | null;
}


const SideBar: React.FC<SideBarProps> = ({ user }) => {
  const navigate = useNavigate()
  
const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/"); 
};
  
  return (
    <div className="md:min-w-[250px] lg:min-w-[270px] h-[100vh] flex flex-col bg-light-orange2 justify-between items-center py-[35px]">
      <div className="font-semibold flex items-center uppercase md:mb-5">
        <div className="w-1 h-[23px] bg-orange mr-3"></div>
        <img className="w-[85px] h-[23px] " src={logo} alt="Logo" />
      </div>
      {user ? (
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-[120px] h-[120px] rounded-full mb-[18px] bg-white"
            src={user.profile_image_url}
            alt={`${user.first_name} ${user.last_name}`}
          />
          <h2 className="text-lg font-bold mb-3 ">
            {user.first_name} {user.last_name}
          </h2>
        </div>
      ) : (
        <p className="text-sm text-gray-600">No user data available</p>
      )}
      <div className="flex flex-col justify-between itmes-end h-[300px] transition-all">
      <div className="flex flex-col justify-between items-center">
      {buttons.map((button, index) => (
        <ButtonComponent key={index} label={button.label} styles={button.styles} img={button.img} style={button.style} />
      ))}
      
    </div>
      </div>
      <div onClick={handleLogout} className="text-center text-[14px] font-semibold flex gap-3 ">
        <button>Logout</button>
        <img src={logout} alt="" />
        </div>
    </div>
  );
};

export default SideBar;