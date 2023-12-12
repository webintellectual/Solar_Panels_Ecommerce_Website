import BACKEND_URL from './config.js';

fetch(`${BACKEND_URL}/api/userProfiles`)
  .then(response => response.json())
  .then(data => {
    const table = document.createElement('table');
    table.innerHTML = `
      <tr>
        <th>Username</th>
        <th>Password</th>
        <th>Email</th>
        <th>Gender</th>
        <th>Profile Image</th>
        <th>Order History</th>
      </tr>
    `;
    data.forEach(item => {
        const row = document.createElement('tr');
        let orderHistoryContent = '';
        if (item.orderHistory && item.orderHistory.length > 0) {
          const orderHistoryTable = document.createElement('table');
          orderHistoryTable.innerHTML = `
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Billed Amount</th>
              <th>Address</th>
              <th>Phone Number</th>
            </tr>
          `;
          item.orderHistory.forEach(order => {
            const orderRow = document.createElement('tr');
            [
              order.orderId,
              order.date,
              order.productName,
              order.quantity,
              order.billedAmount,
              order.address,
              order.phoneNumber
            ].forEach(text => {
              const orderCell = document.createElement('td');
              orderCell.textContent = text;
              orderRow.appendChild(orderCell);
            });
            orderHistoryTable.appendChild(orderRow);
          });
          orderHistoryContent = orderHistoryTable.outerHTML;
        }
        [
          item.username,
          item.password,
          item.email,
          item.gender,
          item.profileImage,
          orderHistoryContent
        ].forEach(content => {
          const cell = document.createElement('td');
          cell.innerHTML = content;
          row.appendChild(cell);
        });
        table.appendChild(row);
      });
    document.getElementById('tableContainer').appendChild(table);
  })
  .catch(error => console.error('Error:', error));