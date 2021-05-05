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
  const { data: categories, error, loading } = useFetch('db?list=category');
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
  return (
    <div className="container">
      <h1 className="is-size-4 has-text-weight-bold">Add Item</h1>
      <form>
        <ControlledTextInput fieldName="Name" field={name} setField={setName} />
        <ControlledSelect fieldName="Category" setField={setCategory} options={categories} />
        <ControlledNumberInput fieldName="Stock" field={stock} setField={setStock} />
        <ControlledNumberInput fieldName="Price" field={price} setField={setPrice} />
        <ControlledTextareaSingle fieldName="Highlights" field={highlights} setField={setHighlights} />
        <ControlledTextareaList fieldName="Description" fields={description} setFields={setDescription} />
        <ControlledTextareaList fieldName="Features" fields={features} setFields={setFeatures} />
        <ControlledMultiplesInput options={options} setOptions={setOptions} hasMultiples={hasMultiples} setHasMultiples={setHasMultiples} />
        <ControlledUrlField url={url} setUrl={setUrl} />
      </form>
    </div>

  );
}

export default AddItem;
