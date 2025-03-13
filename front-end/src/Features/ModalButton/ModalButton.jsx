
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AboutUs from "../AboutUs/AboutUs";
import HelpModal from "../Help/Help";
import Login from "../Login/Login";
import Discover from "../Discover/Discover";

function ModalButton({ label, modalType, onClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    if (modalType === "discover") {
      navigate("/Discover");
    } else if (modalType === "post") {
      navigate("/eventform");
    } else {
      setIsModalOpen(!isModalOpen);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto";   
    }
    return () => {
      document.body.style.overflow = "auto";   
    };
  }, [isModalOpen]);

  return (
    <>
      <button className="nav-button" onClick={toggleModal}>
        {label}
      </button>

      {isModalOpen && modalType === "login" && (
        <Login onClose={toggleModal} />
      )}

      {isModalOpen && modalType === "about" && (
        <AboutUs onClose={toggleModal} />
      )}
      
      {isModalOpen && modalType === "help" && (
        <HelpModal onClose={toggleModal} />
      )}
    </>
  );
}

export default ModalButton;
