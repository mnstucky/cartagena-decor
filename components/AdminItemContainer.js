import React, { useState } from 'react';
import ItemImage from './ItemImage';
import ControlledTextareaList from './ControlledTextareaList';
import DecrementStockButton from './DecrementStockButton';
import IncrementStockButton from './IncrementStockButton';
import ControlledTextareaSingle from './ControlledTextareaSingle';
import ControlledNumberInput from './ControlledNumberInput';

function AdminItemContainer({
  selection, setSelection, item, itemUrl,
}) {
  const [description, setDescription] = useState(item.description);
  const [features, setFeatures] = useState(item.features);
  const [highlights, setHighlights] = useState(item.highlights);
  const [stock, setStock] = useState(item.stock);
  const [price, setPrice] = useState(item.price);
  const [category, setCategory] = useState(item.category);
  const [updateMessage, setUpdateMessage] = useState(undefined);
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
      category,
    };
    const response = await fetch('/api/updateitem', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const json = await response.json();
    setUpdateMessage(json.message);
  }
  // TODO: make the default view editable
  function handleSelection(event) {
    setSelection(event.target.value);
    // Format selection to match formatting of options in item object
    const unformattedSelectionArray = event.target.value.split(' ');
    unformattedSelectionArray[0] = unformattedSelectionArray[0].toLowerCase();
    const unformattedSelection = unformattedSelectionArray.join('');
    setStock(item.multiples.options[unformattedSelection]);
    event.preventDefault();
  }
  async function uploadImage(event) {
    const file = event.target.files[0];
    const convertedSelection = selection === 'default' ? 'main' : selection;
    const convertedImageUrl = `${itemUrl}_${convertedSelection.replaceAll(' ', '').toLowerCase()}.JPG`;
    const filename = encodeURIComponent(convertedImageUrl);
    const response = await fetch(`/api/uploadimage?file=${filename}`);
    const { url, fields } = await response.json();
    const formData = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    if (upload.ok) {
      console.log('Uploaded successfully!');
    } else {
      console.error('Upload failed.');
    }
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
                <p className="mb-0 mr-2 has-text-weight-bold">Stock:</p>
                <DecrementStockButton setStock={setStock} />
                <p className="ml-3 mr-3 mb-0">
                  {stock}
                </p>
                <IncrementStockButton setStock={setStock} />
              </div>
              <ControlledNumberInput field={price} setField={setPrice} fieldName="Price" />
              <label className="button is-primary">
                Change Image
                <input className="is-hidden" onChange={uploadImage} type="file" accept="image/png, image/jpg" />
              </label>
              <p>(Image must be in .JPG format. Preferred dimensions are 720 x 480.)</p>
            </>
            )}
          </section>
        </div>
        <div className="column">
          <section className="box content">
            <form onSubmit={handleSubmit}>
              <ControlledTextareaSingle fieldName="Category" field={category} setField={setCategory} />
              <ControlledTextareaList fieldName="Description" fields={description} setFields={setDescription} />
              <ControlledTextareaList fieldName="Feature" fields={features} setFields={setFeatures} />
              <ControlledTextareaSingle fieldName="Highlights" field={highlights} setField={setHighlights} />
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
