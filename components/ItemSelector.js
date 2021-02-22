import React from 'react';

function ItemSelector({ options, selection, setSelection }) {
  function handleSelection(event) {
    setSelection(event.target.value);
    event.preventDefault();
  }

  if (options.length === 0) {
    return null;
  }
  return (
    <div className="select mb-2 mr-2">
      <select value={selection} onChange={handleSelection}>
        <option value="default">Select an Option:</option>
        {options.map((productType) => (
          <option value={productType}>{productType}</option>
        ))}
      </select>
    </div>
  );
}

export default ItemSelector;
