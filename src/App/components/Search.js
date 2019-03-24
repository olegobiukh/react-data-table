import React from "react";

const Search = ({ onChangeQuery, visibleQuery }) => {
  return (
    <div className="md-form active-purple active-purple-2 mb-3">
      <input
        className="Search"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={onChangeQuery}
        value={visibleQuery}
      />
    </div>
  );
};

export default Search;
