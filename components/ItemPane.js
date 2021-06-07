import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import useFetch from '../services/useFetch';

function ItemPane({
  image, name, price, url, setNeedsRefresh,
}) {
  const paneStyle = {
    width: 300,
  };
  const [session, loading] = useSession();
  const { data: admins, error, adminLoading } = useFetch('getadmins');
  async function deleteItem(event) {
    const response = await fetch('/api/deleteitem', {
      method: 'DELETE',
      body: JSON.stringify({ url: event.target.id }),
    });
    setNeedsRefresh((currentState) => !currentState);
  }
  return (
    <div className="card m-2" style={paneStyle}>
      <Link href={`\\${url}`}>
        <a className="card-image">
          <div className="image is-3by2">
            <img alt="Product display" src={image} />
          </div>
        </a>
      </Link>
      <Link href={`\\${url}`}>
        <div className="card-content">
          <a className="name is-5 has-text-weight-semibold has-text-black">{name}</a>
          <br />
          <a className="subname is-6 has-text-black">
            $
            {price}
          </a>
        </div>
      </Link>
      {admins && admins.some((admin) => admin.email === session?.user?.email) && (
        <div className="is-flex is-justify-content-flex-end">
          <button type="button" className="button is-danger mr-2" id={url} onClick={deleteItem}>Delete</button>
          <Link href={`/admin/${url}`}>
            <button type="button" className="button is-info mb-2 mr-2">Edit</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ItemPane;
