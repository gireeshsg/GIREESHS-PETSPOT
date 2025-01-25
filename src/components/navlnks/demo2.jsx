import React from 'react';

// Sample order data
const orders = [
  { orderNumber: '#12345', date: '2024-10-10', itemName: 'Wireless Headphones', quantity: 1, status: 'Shipped', totalPrice: '$79.99' },
  { orderNumber: '#12346', date: '2024-10-05', itemName: 'Smartwatch', quantity: 2, status: 'Delivered', totalPrice: '$149.98' },
  { orderNumber: '#12347', date: '2024-09-28', itemName: 'Bluetooth Speaker', quantity: 1, status: 'Processing', totalPrice: '$59.99' },
  { orderNumber: '#12348', date: '2024-09-20', itemName: 'USB-C Charging Cable', quantity: 3, status: 'Delivered', totalPrice: '$29.97' },
];

const MyOrderPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.greeting}>Welcome back, [User's Name]!</h1>
      <p style={styles.subGreeting}>Here’s a summary of your recent orders:</p>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Date</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.orderNumber}>
              <td>{order.orderNumber}</td>
              <td>{order.date}</td>
              <td>{order.itemName}</td>
              <td>{order.quantity}</td>
              <td>{order.status}</td>
              <td>{order.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={styles.thankYou}>Thank you for shopping with us!</p>
      <p>If you have any questions about your orders, feel free to reach out to our customer support.</p>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  greeting: {
    color: '#333',
    fontSize: '24px',
  },
  subGreeting: {
    color: '#555',
    fontSize: '18px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  thankYou: {
    fontWeight: 'bold',
    marginTop: '20px',
  },
};

export default MyOrderPage;
