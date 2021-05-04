import React from 'react';

function ControlledTextareaList({
  fields, setFields, fieldName,
}) {
  function handleFieldChange(event) {
    const newFields = [];
    fields.forEach((bullet, index) => {
      if (parseInt(event.target.id, 10) === index) {
        newFields.push(event.target.value);
      } else {
        newFields.push(bullet);
      }
    });
    setFields(newFields);
  }
  async function addField() {
    const newFields = [...fields];
    newFields.push('');
    setFields(newFields);
  }
  async function deleteField(event) {
    const newFields = [...fields];
    newFields.splice(event.target.id, 1);
    setFields(newFields);
  }
  // Declare iterable indices for fields that are arrays; indices are used to identify
  //    the correct index to update in the handler functions
  let fieldId = 0;
  return (
    <>
      <label className="label">
        <h6>
          {fieldName}
          :
        </h6>
        {fields.map((bullet) => (
          <div className="field">
            <textarea
              className="textarea"
              rows="2"
              value={bullet}
              id={fieldId}
              onChange={handleFieldChange}
            />
            <div className="is-flex is-flex-direction-row-reverse">
              <button id={fieldId++} type="button" className="button is-danger mt-1" onClick={deleteField}>X</button>
            </div>
          </div>
        ))}
      </label>
      <button type="button" className="button is-primary mb-3" onClick={addField}>
        Add
        {' '}
        {fieldName}
      </button>
    </>
  );
}

export default ControlledTextareaList;
