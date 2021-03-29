import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/client';

function ItemPane({
  image, name, price, url,
}) {
  const paneStyle = {
    width: 300,
  };
  const [session, loading] = useSession();
  return (
    <div className="card m-2" style={paneStyle}>
      <Link href={`\\${url}`}>
        <a className="card-image">
          <div className="image is-3by2">
            <img src={image} />
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
      {session?.user?.email === 'mnstucky@gmail.com' && (
        <div className="is-flex is-justify-content-flex-end">
          <Link href={`/admin/${url}`}>
            <button type="button" className="button is-info mb-2 mr-2">Edit</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ItemPane;
