import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  created_at: string;  
  updated_at: string;  
}

const ShowItem: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<Product>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      if (id) {
        axios
          .get(`https://test1.focal-x.com/api/items/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            setShow(response.data);
          })
          .catch((err) => console.error("Error fetching product:", err));
      } else {
        console.log("Item ID is missing in the URL");
      }
    }
  }, [id, navigate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <div className="flex flex-col pt-[24px] pb-[48px] px-[64px] w-full">
        <div className="w-[40px] h-[40px] flex justify-center items-center border-[1px] border-black rounded-full cursor-pointer xl:mb-[20px] mb-3" onClick={() => navigate('/home')}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="sm"
            style={{ color: "#000000" }}
          />
        </div>
        <h1 className="2xl:text-[40px] xl:mb-0 mb-4 lg:text-[40px] text-[30px] font-semibold">{show?.name}</h1>
        <img className="block mx-auto xl:my-10 my-5 xl:w-[375px] xl:h-[250px] w-[150px] object-contain" src={show?.image_url} alt={show?.name} />
        <div className="flex justify-between flex-wrap gap-3 xl:mb-[40px] mb-3">
          <p className="2xl:text-[40px] xl:mb-0 mb-4 lg:text-[40px] text-[30px] font-semibold">
            Price: <span className="xl:text-[30px] text-[20px] text-graylight font-medium">{show?.price} $</span>
          </p>
          <p className="2xl:text-[40px] xl:mb-0 mb-4 lg:text-[40px] text-[30px] font-semibold">
            Added At: <span className="xl:text-[30px] text-[20px] text-graylight font-medium">{show?.created_at ? formatDate(show.created_at) : "--"}</span>
          </p>
        </div>
        <p className="2xl:text-[40px] xl:mb-0 mb-4 lg:text-[40px] text-[30px] font-semibold xl:text-center text-left">
          Updated At: <span className="xl:text-[30px] text-[20px] text-graylight font-medium">{show?.updated_at ? formatDate(show.updated_at) : "--"}</span>
        </p>
      </div>
    </>
  );
};

export default ShowItem;
