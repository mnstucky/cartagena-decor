import React, { useState } from 'react';
import ItemImage from './ItemImage';
import AdminSectionList from './AdminSectionList';
import DecrementStockButton from './DecrementStockButton';
import IncrementStockButton from './IncrementStockButton';
import AdminSectionField from './AdminSectionField';

function AdminItemContainer({
  selection, setSelection, item, itemUrl,
}) {
  const [description, setDescription] = useState(item.description);
  const [features, setFeatures] = useState(item.features);
  const [highlights, setHighlights] = useState(item.highlights);
  const [stock, setStock] = useState(item.stock);
  const [price, usePrice] = useState(item.price);
  const [updateMessage, setUpdateMessage] = useState(undefined);
  console.log(item);
  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      description,
      features,
      highlights,
      url: itemUrl,
      stock,
      price,
      selection,
    };
    const response = await fetch('/api/admin', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const json = await response.json();
    setUpdateMessage(json.message);
  }
  function handleHighlightChange(event) {
    setHighlights(event.target.value);
  }
  function handleSelection(event) {
    setSelection(event.target.value);
    // Format selection to match formatting of options in item object
    const unformattedSelectionArray = event.target.value.split(' ');
    unformattedSelectionArray[0] = unformattedSelectionArray[0].toLowerCase();
    const unformattedSelection = unformattedSelectionArray.join('');
    setStock(item.multiples.options[unformattedSelection]);
    event.preventDefault();
  }
  const options = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(item.multiples.options)) {
    const keyWithSpacesAdded = key.replace(/([A-Z])/g, ' $1');
    const formattedOption = keyWithSpacesAdded.charAt(0).toUpperCase()
        + keyWithSpacesAdded.slice(1);
    options.push(formattedOption);
  }
  // Declare iterable indices for fields that are arrays; indices are used to identify
  //    the correct index to update in the handler functions
  return (
    <div className="container pl-3 pr-3">
      <h1 className="title is-4 mt-2 has-text-centered">{item.name}</h1>
      <div className="columns">
        <div className="column">
          <ItemImage selection={selection} item={item} itemUrl={itemUrl} />
          <section className="box content">
            <h6>Make a Selection to View Image and Make Changes:</h6>
            <div className="select mb-2 mr-2">
              <select value={selection} onChange={handleSelection}>
                <option value="default">Default View</option>
                {options.map((productType) => (
                  <option key={productType} value={productType}>{productType}</option>
                ))}
              </select>
            </div>
            {/* Hide fields if the item page has multiple options and no option is selected */}
            {!(item.multiples.hasMultiples && selection === 'default') && (
            <>
              <div className="is-flex is-align-items-center">
                <p className="mb-0 mr-2">Stock:</p>
                <DecrementStockButton setStock={setStock} />
                <p className="ml-3 mr-3 mb-0">
                  {stock}
                </p>
                <IncrementStockButton setStock={setStock} />
              </div>
              <div>
                <p>
                  Price:
                  {' '}
                  {price}
                </p>
              </div>
            </>
            )}
          </section>
        </div>
        <div className="column">
          <section className="box content">
            <form onSubmit={handleSubmit}>
              <AdminSectionList fieldName="Description" fields={description} setFields={setDescription} />
              <AdminSectionList fieldName="Feature" fields={features} setFields={setFeatures} />
              <AdminSectionField fieldName="Highlights" field={highlights} setField={setHighlights} />
              <div className="is-flex is-align-items-center">
                <input
                  className="button is-primary"
                  type="submit"
                  value="Save Changes"
                />
                {updateMessage && <p className="ml-3">{updateMessage}</p>}
              </div>

            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AdminItemContainer;
