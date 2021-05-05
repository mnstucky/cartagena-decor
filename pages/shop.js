import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import ItemGrid from '../components/ItemGrid';

function Shop() {
  const [session, loading] = useSession();
  return (
    <div className="container pr-3 pl-3">
      <h1 className="title is-4 mt-2">Shop</h1>
      <ItemGrid />
      {/* TODO: Link to database */}
      {session?.user?.email === 'mnstucky@gmail.com' && (
      <Link href="/admin/add">
        <button className="button is-primary">Add New Item</button>
      </Link>
      )}

    </div>
  );
}

export default Shop;
