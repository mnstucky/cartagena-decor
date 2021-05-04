import React from 'react';

function ControlledMultiplesInput({
  hasMultiples, setHasMultiples, options, setOptions,
}) {
  function handleHasMultiplesChange(event) {
    setHasMultiples((currentValue) => !currentValue);
  }
  return (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
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
  );
}

export default ControlledMultiplesInput;
