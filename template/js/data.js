// data.js
export const paymentMethod = ["Cash", "Credit Card", "Mobile Payment", "Gift Card", "Voucher"];

export const menuCategory = ["Appetizers", "Main Course", "Desserts", "Beverages", "Sides", "Salads"];

export const menuItems = {
    "Appetizers": [
        { name: "Spring Rolls", price: 5.99 },
        { name: "Garlic Bread", price: 3.99 },
        { name: "Bruschetta", price: 4.99 },
        { name: "Stuffed Mushrooms", price: 6.99 }
    ],
    "Main Course": [
        { name: "Grilled Chicken", price: 12.99 },
        { name: "Spaghetti Bolognese", price: 10.99 },
        { name: "Beef Steak", price: 15.99 },
        { name: "Vegetable Stir Fry", price: 9.99 }
    ],
    "Desserts": [
        { name: "Chocolate Cake", price: 4.99 },
        { name: "Ice Cream", price: 2.99 },
        { name: "Cheesecake", price: 5.99 },
        { name: "Apple Pie", price: 3.99 }
    ],
    "Beverages": [
        { name: "Coca Cola", price: 1.99 },
        { name: "Orange Juice", price: 2.49 },
        { name: "Lemonade", price: 2.99 },
        { name: "Coffee", price: 1.49 }
    ],
    "Sides": [
        { name: "French Fries", price: 2.99 },
        { name: "Mashed Potatoes", price: 3.49 },
        { name: "Onion Rings", price: 3.99 },
        { name: "Coleslaw", price: 2.49 }
    ],
    "Salads": [
        { name: "Caesar Salad", price: 5.99 },
        { name: "Greek Salad", price: 6.49 },
        { name: "Garden Salad", price: 4.99 },
        { name: "Cobb Salad", price: 7.99 }
    ]
};

export const billSetting = ["Bill Discount","Split Bill","Split Item"];

export const optionClickPosItem = ["Add-On","Change Item","Override", "Item Discount"];

export const addOnFood = [
    { name: "Extra Cheese", price: 1.50 },
    { name: "Bacon", price: 2.00 },
    { name: "Avocado", price: 1.75 },
    { name: "Mushrooms", price: 1.25 },
    { name: "Fried Egg", price: 1.50 }
];

export const addOnDrinks = [
    { name: "Whipped Cream", price: 0.50 },
    { name: "Extra Shot of Espresso", price: 1.00 },
    { name: "Flavor Syrup", price: 0.75 },
    { name: "Almond Milk", price: 0.50 },
    { name: "Ice Cubes", price: 0.25 }
];


export const tableNumber = Array.from({ length: 20 }, (_, i) => i + 1);
