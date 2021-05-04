import React, { useState } from 'react';
import { useSession } from 'next-auth/client';
import useFetch from '../../services/useFetch';
import AdminItemContainer from '../../components/AdminItemContainer';
import LoadingSpinner from '../../components/LoadingSpinner';
import Error from '../../components/Error';

function AddItem({ itemUrl }) {
  const [session] = useSession();
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
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input className="input" type="text" name="name" />
          </div>
        </div>
        <div className="field">
          <label className="label">Category</label>
          <div className="select">
            <select>
              {categories.map((category) => <option>{category}</option>)}
            </select>
          </div>
        </div>
      </form>
    </div>

  );
}

export default AddItem;
