import React from "react";

const Banner = () => {

  return (
    <div className="carousel carousel-center rounded-box mx-4">
        <div className="carousel-item">
            <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Pizza" />
        </div>
        <div className="carousel-item">
            <img
            src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
            alt="Pizza" />
        </div>
        <div className="carousel-item">
            <img
            src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
            alt="Pizza" />
        </div>
        <div className="carousel-item">
            <img
            src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
            alt="Pizza" />
        </div>      
    </div>
  );
};

export default Banner;