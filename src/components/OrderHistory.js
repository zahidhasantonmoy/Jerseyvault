import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { user } = supabase.auth.getSession();

        if (!user) {
          setError('You must be logged in to view order history.');
          setLoading(false);
          return;
        }

        let { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (
              *,
              products (
                name,
                image
              )
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="order-history-loading">Loading order history...</div>;
  }

  if (error) {
    return <div className="order-history-error">Error: {error}</div>;
  }

  if (orders.length === 0) {
    return <div className="order-history-empty">No orders found.</div>;
  }

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">Your Order History</h2>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h3>Order #{order.id}</h3>
              <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
              <p>Total: ${order.total_amount.toFixed(2)}</p>
              <p>Status: <span className={`status-${order.status}`}>{order.status}</span></p>
            </div>
            <div className="order-items">
              <h4>Items:</h4>
              {order.order_items.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.products.image} alt={item.products.name} className="order-item-image" />
                  <div className="order-item-details">
                    <p>{item.products.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
