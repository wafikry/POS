const paymentMethod = ['QR', 'Cash', 'Credit Card', 'Debit Card'];
const menuCategory = ['coffee', 'tea', 'chocolate'];
const menuItems = {
        coffee: [
            {name: 'Espresso', price: 2.5},
            {name: 'Latte', price: 3.0},
            {name: 'Cappuccino', price: 3.5},
            {name: 'Americano', price: 2.8},
            {name: 'Mocha', price: 3.7}
        ],
        tea: [
            {name: 'Black Tea', price: 2.0},
            {name: 'Green Tea', price: 2.2},
            {name: 'Oolong Tea', price: 2.3},
            {name: 'Herbal Tea', price: 2.4}
        ],
        chocolate: [
            {name: 'Hot Chocolate', price: 3.2},
            {name: 'Chocolate Milkshake', price: 4.0},
            {name: 'Chocolate Smoothie', price: 3.8}
        ]
    };

const optionClickPosItem = ['Override','Bill Discount','Test']

    export { paymentMethod, menuCategory, menuItems, optionClickPosItem };