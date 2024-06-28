// 3 tests
// input field is rendered
// onChange is called when enter is pressed and the input field isn't empty
// onChange isn't called when enter is pressed and input field is empty

import { useState } from "react";

interface Props {
  onChange: (text: string) => void;
}
// SearchBox component expects onChange fxn as a prop, which takes a string as an arg and doesn't return anything

const SearchBox = ({ onChange }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        className="input"
        onChange={(e) => setSearchTerm(e.target.value)}
        // onChange handler updates searchTerm state whenever the user types into the input field
        onKeyDown={(e) => {
          if (e.key === "Enter" && searchTerm) onChange(searchTerm);
        }}
        // onKeyDown handler checks if enter key is pressed && if searchTerm isn't empty. If both conditions are met, it calls onChange fxn (not to be confused with onChange handler) with current searchTerm
      />
    </div>
  );
};

export default SearchBox;
