import React, { useContext, useEffect } from 'react';
import useFetch from '../services/useFetch';
import LoadingSpinner from '../components/LoadingSpinner';
import Error from '../components/Error';
import { CartContext } from '../components/CartContextProvider';

export default function Success({ sessionId }) {
  const { data, error, loading } = useFetch(`handleorder?session_id=${sessionId}`);
  const { cart, setCart } = useContext(CartContext);
  useEffect(() => {
    setCart([]);
  }, []);
  if (loading) {
    return (
      <LoadingSpinner />
    );
  }
  if (error) {
    return <Error />;
  }
  return (
    <div className="container pr-3 pl-3">
      <div>
        <p className="mt-4">
          Thanks for your order,
          {' '}
          {data.customer.name}
          ! You will receive a confirmation email at
          {' '}
          {data.customer.email}
        </p>
      </div>
    </div>
  );
}

Success.getInitialProps = async (context) => ({ sessionId: context.query.session_id });
