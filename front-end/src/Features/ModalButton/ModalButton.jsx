// src/Features/Home/ModalButton.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AboutUs from "../AboutUs/AboutUs";
import HelpModal from "../Help/Help";
import Login from "../Login/Login";
import Discover from "../Discover/Discover";

function ModalButton({ label, modalType }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    if (modalType === "discover") {
      navigate("/Discover");
    } else {
      setIsModalOpen(!isModalOpen);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";  // Lock body scroll
    } else {
      document.body.style.overflow = "auto";    // Enable body scroll
    }
    return () => {
      document.body.style.overflow = "auto";    // Clean up on component unmount
    };
  }, [isModalOpen]);

  return (
    <>
      <button className="nav-button" onClick={toggleModal}>
        {label}
      </button>

      {/* Conditional Rendering for Modals */}
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
