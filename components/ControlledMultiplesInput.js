import React from 'react';

function ControlledMultiplesInput({
  hasMultiples, setHasMultiples, options, setOptions,
}) {
  function handleHasMultiplesChange(event) {
    setHasMultiples((currentValue) => !currentValue);
    if (!event.target.checked) {
      setOptions(new Map());
    }
  }
  function handleOptionsNameChange(event) {
    const newOptions = new Map();
    options.forEach((stock, optionName) => {
      if (event.target.id === optionName) {
        newOptions.set(event.target.value, stock);
      } else {
        newOptions.set(optionName, stock);
      }
    });
    setOptions(newOptions);
  }
  function handleOptionsStockChange(event) {
    const newOptions = new Map();
    options.forEach((stock, optionName) => {
      if (event.target.id === optionName) {
        newOptions.set(optionName, event.target.value);
      } else {
        newOptions.set(optionName, stock);
      }
    });
    setOptions(newOptions);
  }
  async function addOption() {
    const newOptions = new Map(options);
    newOptions.set('Variety Name', 0);
    setOptions(newOptions);
  }
  async function deleteOption(event) {
    const newOptions = new Map(options);
    newOptions.delete(event.target.id);
    setOptions(newOptions);
  }
  return (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <>
      <label className="label is-flex is-align-items-center mt-2">
        <h6 className="mb-0 mr-3">
          Multiple Varieties?
          :
        </h6>
        <div className="checkbox">
          <input
            type="checkbox"
            checked={hasMultiples}
            onChange={handleHasMultiplesChange}
          />
        </div>
      </label>
      {hasMultiples && (
      <>
        {Array.from(options).map(([option, stock]) => (
          <div className="is-flex is-align-items-center">
            <label className="label is-flex is-align-items-center mt-2">
              <h6 className="mb-0 mr-3">
                Variety:
              </h6>
              <div className="field">
                <input
                  type="text"
                  className="input"
                  value={option}
                  id={option}
                  onChange={handleOptionsNameChange}
                />
              </div>
            </label>
            <label className="label is-flex is-align-items-center mt-2 ml-2">
              <h6 className="mb-0 mr-3">
                Stock:
              </h6>
              <div className="field">
                <input
                  type="number"
                  className="input"
                  value={stock}
                  id={option}
                  onChange={handleOptionsStockChange}
                />
              </div>
            </label>
            <div className="is-flex is-flex-direction-row-reverse">
              <button id={option} type="button" className="button is-danger" onClick={deleteOption}>X</button>
            </div>
          </div>

        ))}
        <button type="button" className="button is-primary mb-3" onClick={addOption}>
          Add Variety
        </button>
      </>
      )}
    </>
  );
}

export default ControlledMultiplesInput;
