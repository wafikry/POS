const paymentMethod = ['QR', 'Cash', 'Credit Card', 'Debit Card'];
const menuCategory = ['coffee', 'tea', 'chocolate', 'smoothies', 'pastries'];
const menuItems = {
    coffee: [
        { name: 'Espresso', price: 2.5 },
        { name: 'Latte', price: 3.0 },
        { name: 'Cappuccino', price: 3.5 },
        { name: 'Americano', price: 2.8 },
        { name: 'Mocha', price: 3.7 },
        { name: 'Macchiato', price: 3.2 },
        { name: 'Flat White', price: 3.0 },
        { name: 'Affogato', price: 3.8 },
        { name: 'Cold Brew', price: 3.5 },
        { name: 'Frappuccino', price: 4.0 },
        { name: 'Irish Coffee', price: 4.5 }
    ],
    tea: [
        { name: 'Black Tea', price: 2.0 },
        { name: 'Green Tea', price: 2.2 },
        { name: 'Oolong Tea', price: 2.3 },
        { name: 'Herbal Tea', price: 2.4 },
        { name: 'Chai Tea', price: 2.5 },
        { name: 'White Tea', price: 2.6 },
        { name: 'Matcha Tea', price: 3.0 },
        { name: 'Earl Grey', price: 2.2 },
        { name: 'Jasmine Tea', price: 2.4 },
        { name: 'Lemon Tea', price: 2.5 }
    ],
    chocolate: [
        { name: 'Hot Chocolate', price: 3.2 },
        { name: 'Chocolate Milkshake', price: 4.0 },
        { name: 'Chocolate Smoothie', price: 3.8 },
        { name: 'Chocolate Frappuccino', price: 4.2 },
        { name: 'White Hot Chocolate', price: 3.5 },
        { name: 'Chocolate Mocha', price: 4.0 },
        { name: 'Chocolate Affogato', price: 4.3 },
        { name: 'Chocolate Latte', price: 3.9 },
        { name: 'Chocolate Espresso', price: 3.5 },
        { name: 'Double Chocolate', price: 4.5 }
    ],
    smoothies: [
        { name: 'Strawberry Smoothie', price: 4.0 },
        { name: 'Mango Smoothie', price: 4.2 },
        { name: 'Banana Smoothie', price: 3.8 },
        { name: 'Blueberry Smoothie', price: 4.1 },
        { name: 'Mixed Berry Smoothie', price: 4.3 },
        { name: 'Pineapple Smoothie', price: 4.0 },
        { name: 'Peach Smoothie', price: 4.2 },
        { name: 'Tropical Smoothie', price: 4.5 },
        { name: 'Green Smoothie', price: 4.0 },
        { name: 'Protein Smoothie', price: 4.8 }
    ],
    pastries: [
        { name: 'Croissant', price: 2.5 },
        { name: 'Muffin', price: 2.8 },
        { name: 'Scone', price: 2.7 },
        { name: 'Danish', price: 3.0 },
        { name: 'Bagel', price: 2.0 },
        { name: 'Donut', price: 1.5 },
        { name: 'Brownie', price: 3.2 },
        { name: 'Cookie', price: 1.8 },
        { name: 'Cinnamon Roll', price: 3.5 },
        { name: 'Eclair', price: 3.0 }
    ]
};

const optionClickPosItem = ['Override', 'Bill Discount', 'Test'];

export { paymentMethod, menuCategory, menuItems, optionClickPosItem };
