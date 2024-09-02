import React from "react";
import { ChevronLeft, ChevronRight, X, CircleChevronLeft } from "lucide-react";

export const Slider: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const images = [
    "https://static.wixstatic.com/media/9f744e_590c2e9c2c4b42d6aa1a51fd0b39ccd5~mv2.jpg/v1/fit/w_2520,h_1284,q_90/9f744e_590c2e9c2c4b42d6aa1a51fd0b39ccd5~mv2.webp",
    "https://static.wixstatic.com/media/9f744e_0af84c3c2b2f433495e5de68de60bc15~mv2.jpg/v1/fit/w_2520,h_1284,q_90/9f744e_0af84c3c2b2f433495e5de68de60bc15~mv2.webp",
    "https://static.wixstatic.com/media/9f744e_f72c0cf68b7d42ba81ce3eec089b66da~mv2.jpg/v1/fit/w_2880,h_1580,q_90/9f744e_f72c0cf68b7d42ba81ce3eec089b66da~mv2.webp",
    "https://static.wixstatic.com/media/9f744e_7af20d31ab1b4147b20f7b2f07eb2610~mv2.jpg/v1/fit/w_2520,h_1284,q_90/9f744e_7af20d31ab1b4147b20f7b2f07eb2610~mv2.webp",
    "https://static.wixstatic.com/media/9f744e_ccc7e7d4c3684155ba5bf660d8e91a9e~mv2.jpg/v1/fit/w_2520,h_1284,q_90/9f744e_ccc7e7d4c3684155ba5bf660d8e91a9e~mv2.webp",
  ];

  const nextSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % (images.length - 4));
  }, [images.length]);

  const prevSlide = React.useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + (images.length - 4)) % (images.length - 4)
    );
  }, [images.length]);

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const showPrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  React.useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <>
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Portfolio</h2>
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 20}%)` }}
              >
                {images.map((src, index) => (
                  <div key={index} className="w-1/5 flex-shrink-0 px-1">
                    <img
                      alt={`Portfolio image ${index + 1}`}
                      className="object-cover w-[241px] h-[301px] hover:opacity-75 cursor-pointer"
                      height={301}
                      src={src}
                      width={241}
                      onClick={() => openModal(index)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 transition-opacity duration-300 hover:bg-opacity-75"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 transition-opacity duration-300 hover:bg-opacity-75"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative max-w-screen-lg w-full">
            {/* 
            <button
              className="absolute top-1/2 left-4 text-white text-4xl font-bold"
              onClick={showPrevImage}
            >
              &larr;
            </button>
          */}
            <ChevronLeft
              className="absolute top-1/2 left-4 text-white text-4xl font-bold"
              onClick={showNextImage}
            />

            <ChevronRight
              className="absolute top-1/2 right-4 text-white text-4xl font-bold focus"
              onClick={showNextImage}
            />

            <X
              className="absolute top-4 right-5 text-white text-2xl cursor-pointer"
              onClick={closeModal}
            />

            <img
              src={images[currentImageIndex]}
              alt="Preview"
              className="object-contain w-full h-screen py-4"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};
