import { Radio } from "./Radio";
import { Button } from "./Button";
import FocusTrap from "focus-trap-react";

export const EditStatePopUp = ({ onClick }) => {
  const handleParentClick = (e) => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  return (
    <FocusTrap initialFocus="#hs-ratings-readonly-10">
      <div
        className="w-full h-screen fixed top-0 left-0 bg-white bg-opacity-20 z-50 backdrop-blur-sm flex justify-center items-center"
        onClick={handleParentClick}
      >
        <div
          className="w-80 bg-black px-4 py-2"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="font-bold text-lg mb-4">Game State</h3>

          <div className="flex flex-col space-y-2 m-4">
            <Radio
              id="not-played"
              label="Not played"
              name="game-state"
              value="not-played"
              defaultChecked
            />
            <Radio
              id="in-progress"
              label="In progress"
              name="game-state"
              value="in-progress"
            />
            <Radio
              id="abandoned"
              label="Abandoned"
              name="game-state"
              value="abandoned"
            />
            <Radio
              id="completed"
              label="Completed"
              name="game-state"
              value="completed"
            />
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
