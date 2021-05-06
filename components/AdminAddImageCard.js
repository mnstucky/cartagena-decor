import React, { useState } from 'react';

function AdminAddImageCard({
  optionName, convertedImageName, uploaded, setUploaded,
}) {
  const [newUploadToggle, setNewUploadToggle] = useState(false);
  async function uploadImage(event) {
    const file = event.target.files[0];
    const convertedImageUrl = `${event.target.id}.JPG`;
    const filename = encodeURIComponent(convertedImageUrl);
    const response = await fetch(`/api/upload?file=${filename}`);
    const { url: returnedUrl, fields } = await response.json();
    const formData = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const upload = await fetch(returnedUrl, {
      method: 'POST',
      body: formData,
    });
    if (upload.ok) {
      console.log('Uploaded successfully!');
      if (!uploaded.includes(convertedImageUrl)) {
        const newUploaded = [...uploaded];
        newUploaded.push(convertedImageUrl);
        setUploaded(newUploaded);
      } else {
        // Use toggle to force component rerender to update image query string and fetch new image
        setNewUploadToggle((previousValue) => !previousValue);
      }
    } else {
      console.error('Upload failed.');
    }
  }
  const paneStyle = {
    width: 300,
  };
  return (
    <div className="card ml-2 mr-2" style={paneStyle}>
      {uploaded.includes(`${convertedImageName}.JPG`)
                && (
                <div className="card-image">
                  <div className="image is-4by3">
                    <img
                    // Append query string to image URL to force refresh if user uploads new image
                      src={`https://cartagena-decor.s3.amazonaws.com/${convertedImageName}.JPG?${Math.floor(Math.random() * 10000)}`}
                      alt={`Uploaded at ${convertedImageName}.JPG`}
                    />
                  </div>
                </div>
                )}
      <div className="card-content">
        <div className="content">
          <label className="button is-primary">
            Set
            {' '}
            {optionName}
            {' '}
            Image
            <input className="is-hidden" id={`${convertedImageName}`} onChange={uploadImage} type="file" accept="image/jpg" />
          </label>
        </div>
      </div>
    </div>
  );
}

export default AdminAddImageCard;
