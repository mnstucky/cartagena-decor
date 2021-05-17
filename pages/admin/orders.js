import React, { useState } from 'react';
import { useSession } from 'next-auth/client';
import useFetch from '../../services/useFetch';
import LoadingSpinner from '../../components/LoadingSpinner';
import Error from '../../components/Error';

function Orders() {
  const [session] = useSession();
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const { data: orders, error, loading } = useFetch('getallorders', needsRefresh);
  const { data: admins, adminError, adminLoading } = useFetch('getadmins');
  let keyValue = 0;
  async function setTrackingInfo(event) {
    event.preventDefault();
    const trackingInfo = {
      id: event.target.id,
      trackingNumber: event.target.form.elements[1].value,
    };
    const response = await fetch('/api/updateorder', {
      method: 'POST',
      body: JSON.stringify(trackingInfo),
    });
    const json = await response.json();
    setNeedsRefresh((currentValue) => !currentValue);
  }
  if (loading || adminLoading) {
    return (
      <LoadingSpinner />
    );
  }
  if (error || adminError) {
    return <Error />;
  }
  if (!admins.some((admin) => admin.email === session?.user?.email)) {
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
      <h1 className="is-size-4 has-text-weight-bold mb-3">Open Orders</h1>
      <div className="block">
        {orders.map((order) => (
          <section key={order._id}>
            <div className="columns mb-0">
              <div className="column">
                <p>
                  {new Date(order.date).toLocaleString({
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </p>
                {!order.shipping.hasShipped && (
                <>
                  <p className="has-text-danger-dark">Has Not Shipped</p>
                  <form>
                    <button id={order._id} type="button" className="button is-primary" onClick={setTrackingInfo}>Set Tracking Info</button>
                    <div className="field">
                      <label className="label" htmlFor="tracking">
                        Tracking #
                        <input
                          className="input"
                          type="text"
                          id="tracking"
                          required
                        />
                      </label>
                    </div>
                  </form>
                </>
                )}
                {order.shipping.hasShipped && (
                <>
                  <p className="has-text-weight-bold">Shipped</p>
                  <p>
                    Tracking #:
                    {' '}
                    {order.shipping.tracking}
                  </p>
                </>
                )}
              </div>
              <div className="column">
                <p className="has-text-weight-bold">Shipping Info:</p>
                <p>{order.shipping.name}</p>
                <p>{order.shipping.address.line1}</p>
                <p>{order.shipping.address.line2}</p>
                <p>
                  {order.shipping.address.city}
                  ,
                  {' '}
                  {order.shipping.address.state}
                  {' '}
                  {order.shipping.address.postal_code}
                </p>
                <p>{order.shipping.address.country}</p>
              </div>
              <div className="column">
                <p className="has-text-weight-bold">Items</p>
                {order.items.map((item) => <p key={keyValue++}>{`${item.description} x ${item.quantity}`}</p>)}
                <p className="mt-5">{`Subtotal: $${order.subtotal / 100.0}`}</p>
                <p className="has-text-weight-bold">{`Total: $${order.total / 100.0}`}</p>
              </div>
            </div>
            <hr className="navbar-divider mt-0" />
          </section>
        ))}
      </div>
    </div>
  );
}

export default Orders;
