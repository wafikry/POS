'use strict';

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve orders, orderNum, and tableNum from local storage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let orderNum = JSON.parse(localStorage.getItem('orderNum')) || '';
    let tableNum = JSON.parse(localStorage.getItem('tableNum')) || '';

    console.log('Orders:', orders);
    console.log('Order Number:', orderNum);
    console.log('Table Number:', tableNum);

    // Initialize HTML strings
    let ordersHtml = '';
    let tableHtml = '';

    // Build HTML for table number
    tableHtml = `<div class="table-number">Table: ${tableNum}</div>`;

    // Build HTML for order items including orderNum
    orders.forEach(function(orderText) {
        ordersHtml += `<div class="order-item">${orderNum} - ${orderText}</div>`;
    });

    // Update .table-order container with table number
    let tableOrder = document.querySelector('.table-order');
    if (tableOrder) {
        tableOrder.innerHTML = tableHtml;
    } else {
        console.error('.table-order element not found.');
    }

    // Update .orders-list container with order items
    let ordersList = document.querySelector('.orders-list');
    if (ordersList) {
        ordersList.innerHTML = ordersHtml;
    } else {
        console.error('.orders-list element not found.');
    }
    document.querySelector('.back-button').addEventListener('click', function() {
        console.log("BAck")
        window.location.href = 'UI.html';});
});
