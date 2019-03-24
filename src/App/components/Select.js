import React from "react";

const Select = ({ perPage = 3, onPerPageChange }) => {
  return (
    <select
      className="Select browser-default custom-select"
      onChange={onPerPageChange}
      value={perPage}
    >
      <option value="3">3</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
  );
};

export default Select;
