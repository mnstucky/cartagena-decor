import React, { useState } from 'react';
import { useSession } from 'next-auth/client';
import useFetch from '../../services/useFetch';
import LoadingSpinner from '../../components/LoadingSpinner';
import Error from '../../components/Error';
import ControlledNumberInput from '../../components/ControlledNumberInput';
import ControlledTextInput from '../../components/ControlledTextInput';
import ControlledTextareaSingle from '../../components/ControlledTextareaSingle';
import ControlledTextareaList from '../../components/ControlledTextareaList';
import ControlledSelect from '../../components/ControlledSelect';
import ControlledMultiplesInput from '../../components/ControlledMultiplesInput';
import ControlledUrlField from '../../components/ControlledUrlField';

function AddItem() {
  const [session] = useSession();
  const [name, setName] = useState('');
  const [category, setCategory] = useState();
  const [stock, setStock] = useState();
  const [price, setPrice] = useState();
  const [highlights, setHighlights] = useState('');
  const [description, setDescription] = useState([]);
  const [features, setFeatures] = useState([]);
  const [hasMultiples, setHasMultiples] = useState(false);
  const [options, setOptions] = useState(new Map());
  const [url, setUrl] = useState('');
  const [locked, setLocked] = useState(false);
  const [uploaded, setUploaded] = useState([]);
  const [newUploadToggle, setNewUploadToggle] = useState(false);
  const { data: categories, error, loading } = useFetch('db?list=category');
  function updateLocked(event) {
    setLocked(true);
  }
  async function uploadImage(event) {
    console.log(event);
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
  // TODO: Link authorized users to database
  if (session?.user?.email !== 'mnstucky@gmail.com') {
    return (
      <div className="container pr-3 pl-3">
        <h1 className="title is-4 mt-2">Add Item</h1>
        <p className="block">
          Sorry, you don't have permission to access this page.
        </p>
      </div>
    );
  }
  if (loading) {
    return (
      <LoadingSpinner />
    );
  }
  if (error) {
    return <Error />;
  }
  const paneStyle = {
    width: 300,
  };
  return (
    <div className="container pl-3 pr-3">
      <h1 className="is-size-4 has-text-weight-bold mb-3">Add Item</h1>
      <form>
        {!locked
            && (
            <>
              <ControlledTextInput fieldName="Name" field={name} setField={setName} />
              <ControlledSelect fieldName="Category" setField={setCategory} options={categories} />
              <ControlledNumberInput fieldName="Stock" field={stock} setField={setStock} />
              <ControlledNumberInput fieldName="Price" field={price} setField={setPrice} />
              <ControlledTextareaSingle fieldName="Highlights" field={highlights} setField={setHighlights} />
              <ControlledTextareaList fieldName="Description" fields={description} setFields={setDescription} />
              <ControlledTextareaList fieldName="Features" fields={features} setFields={setFeatures} />
              <ControlledMultiplesInput options={options} setOptions={setOptions} hasMultiples={hasMultiples} setHasMultiples={setHasMultiples} />
              <ControlledUrlField url={url} setUrl={setUrl} />
              {name && stock && price && url.length === 2
              && (
              <button type="button" className="button is-primary" onClick={updateLocked}>
                Save and Add Images
              </button>
              )}
            </>
            )}
        {locked
        && (
        <div className="is-flex">
          <div className="card ml-2 mr-2" style={paneStyle}>
            {uploaded.includes(`${url}_main.JPG`)
            && (
            <div className="card-image">
              <div className="image is-4by3">
                <img
                  // Append query string to image URL to force refresh upon rerender if user uploads new image
                  src={`https://cartagena-decor.s3.amazonaws.com/${url}_main.JPG?${Math.floor(Math.random() * 10000)}`}
                  alt={`Uploaded at ${url}_main.JPG`}
                />
              </div>
            </div>
            )}
            <div className="card-content">
              <div className="content">
                <label className="button is-primary">
                  Set Main Image
                  <input className="is-hidden" id={`${url}_main`} onChange={uploadImage} type="file" accept="image/jpg" />
                </label>
              </div>
            </div>
          </div>
          {Array.from(options).map(([name, stock]) => {
            const convertedImageName = `${url}_${name.replaceAll(' ', '').toLowerCase()}`;
            return (
              <div className="card ml-2 mr-2" style={paneStyle}>
                {uploaded.includes(`${convertedImageName}.JPG`)
                  && (
                  <div className="card-image">
                    <div className="image is-4by3">
                      <img
                          // Append query string to image URL to force refresh upon rerender if user uploads new image
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
                      {name}
                      {' '}
                      Image
                      <input className="is-hidden" id={`${convertedImageName}`} onChange={uploadImage} type="file" accept="image/jpg" />
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        )}
      </form>
    </div>

  );
}

export default AddItem;
