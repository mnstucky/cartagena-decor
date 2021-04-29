import React, { useState } from 'react';
import ItemImage from './ItemImage';

function AdminItemContainer({
  selection, setSelection, item, itemUrl,
}) {
  const [description, setDescription] = useState(item.description);
  const [features, setFeatures] = useState(item.features);
  const [highlights, setHighlights] = useState(item.highlights);
  const [updateMessage, setUpdateMessage] = useState(undefined);
  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      description,
      features,
      highlights,
      url: itemUrl,
    };
    const response = await fetch('/api/admin', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const json = await response.json();
    setUpdateMessage(json.message);
  }
  function handleDescriptionChange(event) {
    const newDescription = [];
    description.forEach((bullet, index) => {
      if (parseInt(event.target.id, 10) === index) {
        newDescription.push(event.target.value);
      } else {
        newDescription.push(bullet);
      }
    });
    setDescription(newDescription);
  }
  function handleFeatureChange(event) {
    const newFeatures = [];
    features.forEach((bullet, index) => {
      if (parseInt(event.target.id, 10) === index) {
        newFeatures.push(event.target.value);
      } else {
        newFeatures.push(bullet);
      }
    });
    setFeatures(newFeatures);
  }
  function handleHighlightChange(event) {
    setHighlights(event.target.value);
  }
  function handleSelection(event) {
    setSelection(event.target.value);
    event.preventDefault();
  }
  const options = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(item.multiples.options)) {
    if (value > 0) {
      const keyWithSpacesAdded = key.replace(/([A-Z])/g, ' $1');
      const formattedOption = keyWithSpacesAdded.charAt(0).toUpperCase()
        + keyWithSpacesAdded.slice(1);
      options.push(formattedOption);
    }
  }
  // Declare iterable indices for fields that are arrays; indices are used to identify
  //    the correct index to update in the handler functions
  let descriptionId = 0;
  let featureId = 0;
  return (
    <div className="container pl-3 pr-3">
      <h1 className="title is-4 mt-2 has-text-centered">{item.name}</h1>
      <div className="columns">
        <div className="column">
          <ItemImage selection={selection} item={item} itemUrl={itemUrl} />
          <section className="box content">
            <h6>Make a Selection to View Image:</h6>
            <div className="select mb-2 mr-2">
              <select value={selection} onChange={handleSelection}>
                <option value="default">Default View</option>
                {options.map((productType) => (
                  <option value={productType}>{productType}</option>
                ))}
              </select>
            </div>
          </section>
        </div>
        <div className="column">
          <section className="box content">
            <form onSubmit={handleSubmit}>
              <label className="label">
                <h6>Description:</h6>
                {description.map((bullet) => (
                  <div className="field">
                    <textarea
                      className="textarea"
                      rows="2"
                      value={bullet}
                      id={descriptionId++}
                      onChange={handleDescriptionChange}
                    />
                  </div>
                ))}
              </label>
              <label className="label">
                <h6>Features:</h6>
                {features.map((bullet) => (
                  <div className="field">
                    <textarea
                      className="textarea"
                      rows="2"
                      value={bullet}
                      id={featureId++}
                      onChange={handleFeatureChange}
                    />
                  </div>
                ))}
              </label>
              <label className="label">
                <h6>Highlights:</h6>
                <div className="field">
                  <textarea
                    className="textarea"
                    rows="2"
                    value={highlights}
                    onChange={handleHighlightChange}
                  />
                </div>
              </label>
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
