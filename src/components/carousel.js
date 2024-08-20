import { useState } from "react";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

export const Carousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  const previousSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition ease-out duration-300"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <img
            key={index}
            src={`https://images.igdb.com/igdb/image/upload/t_screenshot_big/${slide.image_id}.jpg`}
            alt={`Slide ${index + 1}`}
            className="min-w-full"
          />
        ))}
      </div>

      <div className="absolute top-0 h-full w-full flex justify-between items-center px-10 text-3xl">
        <button onClick={previousSlide}>
          <FaCircleArrowLeft />
        </button>
        <button onClick={nextSlide}>
          <FaCircleArrowRight />
        </button>
      </div>

      <div className="absolute bottom-0 py-4 flex justify-center gap-2 w-full">
        {slides.map((slide, index) => {
          return (
            <div
                onClick={() => {
                    setCurrent(index);
                }}
              key={index + 1}
              className={`rounded-full h-2.5 w-2.5 cursor-pointer ${
                index === current ? "bg-gray-200" : "bg-gray-400"
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};
