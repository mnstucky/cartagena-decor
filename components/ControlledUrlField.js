import React, { useState } from 'react';
import useFetch from '../services/useFetch';

function ControlledUrlField({ url, setUrl }) {
  const [urlMessage, setUrlMessage] = useState('The URL must be exactly two lowercase letters.');
  const { data: urls, error, loading } = useFetch('getitems?list=url');
  function handleUrlChange(event) {
    if (!urls.find((url) => url === event.target.value)) {
      setUrl(event.target.value);
    } else {
      setUrl(event.target.value);
      setUrlMessage('The URL you have selected is not unique. Please try again.');
      return;
    }
    if (/^[a-z]{2}$/.test(event.target.value)) {
      setUrlMessage('Valid URL.');
    } else {
      setUrlMessage('The URL must be exactly two lowercase letters.');
    }
  }
  if (loading) {
    return (
      <div />
    );
  }
  if (error) {
    return <div />;
  }
  return (
    <label className="label is-flex is-align-items-center mt-2">
      <h6 className="mb-0 mr-3">
        Unique URL:
      </h6>
      <div className="field">
        <input
          type="text"
          className="input"
          value={url}
          onChange={handleUrlChange}
        />
      </div>
      {urlMessage && <h6 className="mb-0 ml-2">{urlMessage}</h6>}
    </label>
  );
}

export default ControlledUrlField;
