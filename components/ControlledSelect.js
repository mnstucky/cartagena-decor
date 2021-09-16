import React from 'react';

function ControlledSelect({ setField, fieldName, options, field }) {
  function handleFieldChange(event) {
    setField(event.target.value);
  }
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className='label is-flex is-align-items-center mt-2'>
      <h6 className='mb-0 mr-3'>{fieldName}:</h6>
      <div className='select'>
        <select onChange={handleFieldChange} value={field}>
          <option value=''>All</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}

export default ControlledSelect;
