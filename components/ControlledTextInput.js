import React from 'react';

function ControlledTextInput({
  field, setField, fieldName,
}) {
  function handleFieldChange(event) {
    setField(event.target.value);
  }
  return (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="label is-flex is-align-items-center mt-2">
      <h6 className="mb-0 mr-3">
        {fieldName}
        :
      </h6>
      <div className="field">
        <input
          type="text"
          className="input"
          value={field}
          onChange={handleFieldChange}
        />
      </div>
    </label>
  );
}

export default ControlledTextInput;
