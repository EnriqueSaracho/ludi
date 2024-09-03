import { useState } from "react";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import { SpinnerMd } from "./spinners";

export const ImageCarousel = ({ slides, title }) => {
  const [current, setCurrent] = useState(0);

  if (!slides && !slides[0].image_id) return <SpinnerMd />;

  const previousSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative overflow-hidden w-full max-w-[1200px] m-auto mb-6 group">
      <h4 className="px-2 text-xl text-gray-100 text-center pb-3">{title}</h4>
      <div
        className="flex transition ease-out duration-300"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <img
            key={index}
            src={`https://images.igdb.com/igdb/image/upload/t_720p/${slide.image_id}.jpg`}
            alt={`Slide ${index + 1}`}
            className="min-w-full max-h-[600px] object-contain"
          />
        ))}
      </div>

      <div className="absolute top-0 h-full w-full flex justify-between items-center px-3 text-3xl sm:text-transparent transition-all ease-out duration-500 sm:group-hover:text-gray-200 sm:group-hover:px-6 md:group-hover:px-10">
        <button
          onClick={previousSlide}
          className="active:text-gray-700 transition ease-in duration-75"
        >
          <FaCircleArrowLeft />
        </button>
        <button
          onClick={nextSlide}
          className="active:text-gray-700 transition ease-in duration-75"
        >
          <FaCircleArrowRight />
        </button>
      </div>

      <div className="absolute bottom-0 py-2 flex justify-center gap-2 w-full sm:opacity-0 transition-opacity ease-out duration-500 sm:group-hover:opacity-100 sm:group-hover:py-4">
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

export const VideoCarousel = ({ slides, title }) => {
  const [current, setCurrent] = useState(0);

  if (!slides[0].video_id) return <SpinnerMd />;

  const previousSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative overflow-hidden w-full max-w-[1200px] m-auto mb-6 group">
      <h4 className="px-2 text-xl text-gray-100 text-center pb-3">{title}</h4>
      <div className="pb-[56.25%] relative">
        {slides.map(
          (slide, index) =>
            index === current && (
              <iframe
                key={index}
                src={`https://www.youtube.com/embed/${slide.video_id}`}
                title={`${slide.name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
                style={{ zIndex: 1 }}
              ></iframe>
            )
        )}
      </div>

      <div className="absolute top-0 h-full w-full flex justify-between items-center px-3 text-3xl sm:text-transparent transition-all ease-out duration-500 sm:group-hover:text-gray-200 sm:group-hover:px-6 md:group-hover:px-10">
        <button
          onClick={previousSlide}
          className="z-10 bg-transparent rounded-full active:text-gray-700 transition ease-in duration-75"
          style={{ pointerEvents: "auto" }}
        >
          <FaCircleArrowLeft />
        </button>
        <button
          onClick={nextSlide}
          className="z-10 bg-transparent rounded-full active:text-gray-700 transition ease-in duration-75"
          style={{ pointerEvents: "auto" }}
        >
          <FaCircleArrowRight />
        </button>
      </div>

      {/* <div className="absolute bottom-0 py-4 flex justify-center gap-2 w-full">
          {slides.map((slide, index) => (
            <div
              onClick={() => setCurrent(index)}
              key={index}
              className={`rounded-full h-2.5 w-2.5 cursor-pointer ${
                index === current ? "bg-gray-200" : "bg-gray-400"
              }`}
              style={{ zIndex: 10, pointerEvents: 'auto' }}
            ></div>
          ))}
        </div> */}
    </div>
  );
};
