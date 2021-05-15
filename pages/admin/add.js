import React, {
  useState,
} from 'react';
import { useSession } from 'next-auth/client';
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
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
  // State for add item form
  const [session] = useSession();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [highlights, setHighlights] = useState('');
  const [description, setDescription] = useState([]);
  const [features, setFeatures] = useState([]);
  const [hasMultiples, setHasMultiples] = useState(false);
  const [options, setOptions] = useState(new Map());
  const [url, setUrl] = useState('');
  const [readyToAddImages, setReadyToAddImages] = useState(false);
  const [uploaded, setUploaded] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { data: categories, error, loading } = useFetch('getitems?list=category');
  const { data: admins, adminError, adminLoading } = useFetch('getadmins');
  function makeReadyToAddImages(event) {
    setReadyToAddImages(true);
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
    const formattedResponse = await response.json();
    setErrorMessage(formattedResponse.error);
  }
  if (loading || adminLoading || !admins) {
    return (
      <LoadingSpinner />
    );
  }
  if (error || adminError) {
    return <Error />;
  }
  if (admins.some((admin) => admin.email !== session?.user?.email)) {
    return (
      <div className="container pr-3 pl-3">
        <h1 className="title is-4 mt-2">Add Item</h1>
        <p className="block">
          Sorry, you do not have permission to access this page.
        </p>
      </div>
    );
  }
  return (
    <div className="container pl-3 pr-3">
      <h1 className="is-size-4 has-text-weight-bold mb-3">Add Item</h1>
      <form>
        {!readyToAddImages
            && (
            <>
              <ControlledTextInput fieldName="Name" field={name} setField={setName} />
              {!name && <p className="has-text-danger-dark">An item name is required.</p>}
              <ControlledSelect fieldName="Category" setField={setCategory} options={categories} />
              {!category && <p className="has-text-danger-dark">You must select a category.</p>}
              <ControlledNumberInput fieldName="Stock" field={stock} setField={setStock} />
              {stock < 0 && <p className="has-text-danger-dark">Stock must be nonnegative.</p>}
              <ControlledNumberInput fieldName="Price" field={price} setField={setPrice} />
              {price < 0 && <p className="has-text-danger-dark">Price must be nonnegative.</p>}
              <ControlledTextareaSingle fieldName="Highlights" field={highlights} setField={setHighlights} />
              <ControlledTextareaList fieldName="Description" fields={description} setFields={setDescription} />
              {description.length < 1 && <p className="has-text-danger-dark">A description is required.</p>}
              <ControlledTextareaList fieldName="Features" fields={features} setFields={setFeatures} />
              <ControlledMultiplesInput
                options={options}
                setOptions={setOptions}
                hasMultiples={hasMultiples}
                setHasMultiples={setHasMultiples}
              />
              <ControlledUrlField url={url} setUrl={setUrl} />
              {name && category && stock && stock >= 0 && price && price >= 0
              && url.length === 2 && description.length > 0
              && (
              <button type="button" className="button is-primary" onClick={makeReadyToAddImages}>
                Save and Add Images
              </button>
              )}
            </>
            )}
        {readyToAddImages
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
          {uploaded.length > 0
          && (
          <>
            <button type="button" className="button is-primary mt-3" onClick={handleSubmit}>
              Submit Item
            </button>
            <p className="mt-4">{errorMessage}</p>
          </>
          )}
        </>
        )}
      </form>
    </div>
  );
}

export default AddItem;
