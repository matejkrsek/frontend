import React from "react";

const DarkModeToggle = ({ handleChange, isChecked }) => {
  return (
    <div>
      <input
        type="checkbox"
        id="check"
        className="toggle"
        onChange={() => handleChange()}
        checked={isChecked}
      />
      <label htmlFor="check" style={{ color: "grey" }}>
        Dark Mode
      </label>
    </div>
  );
};

export default DarkModeToggle;
