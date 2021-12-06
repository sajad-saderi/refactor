import React, { useState, useContext, useEffect } from "react";

const imageModal = ({ imageUrl }: IImageModal) => {
  return (
    <>
      <div className="modal_box_div">
        <img className="imageInsideModal" src={imageUrl} alt="user profile" />
      </div>
    </>
  );
};

interface IImageModal {
  imageUrl: string;
}

export default imageModal;
