import { useEffect } from "react";
import FocusTrap from "focus-trap-react";
import { RatingStar } from "./RatingStar";
import { Button } from "./Button";
import { FaStar } from "react-icons/fa6";

export const EditRatingPopUp = ({ onClick }) => {
  const handleParentClick = (e) => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.name === "hs-ratings-readonly") {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          const next = e.target.previousElementSibling?.previousElementSibling;
          if (next && next.tagName === "INPUT") {
            next.focus();
            next.checked = true;
          }
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          const prev = e.target.nextElementSibling?.nextElementSibling;
          if (prev && prev.tagName === "INPUT") {
            prev.focus();
            prev.checked = true;
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <FocusTrap initialFocus="#hs-ratings-readonly-10">
      <div
        className="w-full h-screen fixed top-0 left-0 bg-white bg-opacity-20 z-10 backdrop-blur-sm flex justify-center items-center"
        onClick={handleParentClick}
      >
        <div
          className="w-80 bg-black px-4 py-2"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="font-bold text-lg mb-4">Personal Rating</h3>

          <div className="flex flex-row-reverse justify-center items-center mb-6">
            {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((rating) => (
              <RatingStar
                key={rating}
                id={`hs-ratings-readonly-${rating}`}
                value={rating}
                name="hs-ratings-readonly"
                icon={FaStar}
              />
            ))}
          </div>

          <div className="flex items-center justify-center space-x-2 mb-4 w-52 mx-auto">
            <Button label={"Cancel"} onClick={onClick} isActive />
            <Button label={"Done"} onClick={onClick} />
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};
