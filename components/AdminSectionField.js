import React from 'react';

function AdminSectionField({
  field, setField, fieldName,
}) {
  function handleFieldChange(event) {
    setField(event.target.value);
  }
  return (
    <label className="label">
      <h6>{fieldName}:</h6>
      <div className="field">
        <textarea
          className="textarea"
          rows="2"
          value={field}
          onChange={handleFieldChange}
        />
      </div>
    </label>
  );
}

export default AdminSectionField;
