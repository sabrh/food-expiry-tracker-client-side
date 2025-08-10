import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
    const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };

  const banners = [
    {
        image: "https://img.freepik.com/free-photo/top-view-colourful-veggies-white-background-with-copy-space_23-2148290756.jpg",
        title: "Track Your Fresh Produce",
        subtitle: "Never let your fruits and vegetables go to waste again."
        },
        {
        image: "https://www.drberg.com/wp-content/uploads/2025/04/fresh-dairy-products-milk-cottage-cheese.jpg",
        title: "Monitor Meat & Dairy Expiry",
        subtitle: "Stay safe with timely alerts for perishable foods."
        },
        {
        image: "https://img.freepik.com/premium-photo/variety-food-wooden-table_254791-297.jpg",
        title: "Organize All Fridge Items",
        subtitle: "Keep snacks, drinks, and more fresh for longer."
    }
  ];

  return (
    <div className="mx-auto mt-14">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="relative">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-start bg-black/40">
              <div className="text-white p-8 max-w-lg">
                <h2 className="text-4xl font-bold mb-4">{banner.title}</h2>
                <p className="text-lg">{banner.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;