import React from "react";
import img_1 from './../assets/bookmark 1.png'
import img_2 from './../assets/Vector (3).png'

export interface Button {
  label: string;
  styles: string; 
  style: string; 
  img : string;
}


export const buttons: Button[] = [
  { img: img_2  ,label: "Products",style :"w-[15px] me-1" , styles: "flex justify-center items-baseline gap-3 bg-transparent w-[193px] text-black text-[14px] font-medium hover:bg-orange" },
  { img: img_1 ,label: "Favorites", style : "w-[10px]" , styles: "flex justify-center items-baseline gap-4  bg-transparent w-[193px] text-black text-[14px] font-medium hover:bg-orange" },
  { img: img_1 ,label: "order list", style : "w-[10px]" , styles:"flex justify-center items-baseline gap-4 bg-transparent w-[193px] text-black text-[14px] font-medium hover:bg-orange" },
];


export const ButtonComponent: React.FC<{ label: string; styles: string; img:string; style:string }> = ({
  label,
  styles,
  img,
  style,
}) => {
  return (
    <button className={`py-3 px-2 rounded ${styles}`}>
        <img className={`${style}`} src={img} alt="" />
      {label}
    </button>
  );
};
