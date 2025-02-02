import FocusTrap from "focus-trap-react";
import { IoIosSearch, IoIosArrowBack } from "react-icons/io";

export const SearchField = () => {
  return (
    <FocusTrap>
      <div className="h-12 z-50 fixed bg-red-500 w-full py-2 px-3">
        <button>
          <IoIosArrowBack />
        </button>
        <input />
        <button>
          <IoIosSearch />
        </button>
      </div>
    </FocusTrap>
  );
};
