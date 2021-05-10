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
import AdminAddImageCard from '../../components/AdminAddImageCard';

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
  const { data: categories, error, loading } = useFetch('db?list=category');
  function updateLocked(event) {
    setLocked(true);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const formattedOptions = {};
    options.forEach((stockNum, option) => {
      let formattedOption = option.split(' ').map((word) => word[0].toUpperCase() + word.substring(1));
      formattedOption = formattedOption.join('');
      formattedOption = formattedOption[0].toLowerCase() + formattedOption.substring(1);
      Object.defineProperty(formattedOptions, formattedOption, {
        value: stockNum,
        enumerable: true,
      });
    });
    const data = {
      name,
      category,
      stock,
      price,
      highlights,
      description,
      features,
      hasMultiples,
      options: formattedOptions,
      images: uploaded,
      url,
    };
    const response = await fetch('/api/createitem', {
      method: 'POST',
      body: JSON.stringify(data),
    });
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
              {name && stock && price && url.length === 2 && description.length > 0
              && (
              <button type="button" className="button is-primary" onClick={updateLocked}>
                Save and Add Images
              </button>
              )}
            </>
            )}
        {locked
        && (
        <>
          <div className="is-flex">
            <AdminAddImageCard optionName="Main" convertedImageName={`${url}_main`} uploaded={uploaded} setUploaded={setUploaded} />
            {Array.from(options).map(([optionName, stock]) => {
              const convertedImageName = `${url}_${optionName.replaceAll(' ', '').toLowerCase()}`;
              return (
                <AdminAddImageCard
                  optionName={optionName}
                  convertedImageName={convertedImageName}
                  uploaded={uploaded}
                  setUploaded={setUploaded}
                />
              );
            })}
          </div>
          <button type="button" className="button is-primary mt-3" onClick={handleSubmit}>
            Submit Item
          </button>
        </>
        )}
      </form>
    </div>
  );
}

export default AddItem;
