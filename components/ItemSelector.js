import React from "react";

function ItemSelector({ options, selection, setSelection }) {
  function handleSelection(event) {
    setSelection(event.target.value);
    event.preventDefault();
  }
  return (
    <div className="select">
      <select value={selection} onChange={handleSelection}>
        <option value="default"> </option>
        {options.map((productType) => (
          <option value={productType}>{productType}</option>
        ))}
      </select>
    </div>
  );
}

export default ItemSelector;
