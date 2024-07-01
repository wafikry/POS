'use strict';

import { paymentMethod, menuCategory, menuItems, optionClickPosItem } from './data.js';

$(document).ready(function() {
    posOrder();
});

function posOrder() {
    updateDateTime();
    setInterval(updateDateTime, 1000);    
    //---------------------------------------------------
    // Generate category buttons
    let categoryHtml = '';
    menuCategory.forEach(function(item) {
        categoryHtml += `<div class="cat-item" data-category="${item}">${item}</div>`;
    });
    $(".category").html(categoryHtml);
    //---------------------------------------------------
    // Event delegation for category click
    $(document).on('click', '.cat-item', function() {
        // Clear the list area
        $(".list").html("");

        // Retrieve the items based on the selected category
        const type = $(this).data('category');
        const items = menuItems[type] || [];

        let menuHtml = '';
        items.forEach(function(item) {
            menuHtml += `<div class="prd-item" data-price="${item.price}">${item.name}<br>$${item.price.toFixed(2)}</div>`;
        });

        // Display the menu items in the list area
        $(".list").html(menuHtml);
    });
    //---------------------------------------------------
    // Search functionality
    $(".searchInput").on('input', function() {
        const searchQuery = $(this).val().trim().toLowerCase();
        const filteredItems = filterMenuItems(searchQuery);

        let menuHtml = '';
        filteredItems.forEach(function(item) {
            menuHtml += `<div class="prd-item" data-price="${item.price}">${item.name}<br>$${item.price.toFixed(2)}</div>`;
        });

        // Display the filtered menu items in the list area
        $(".list").html(menuHtml);
    });
    //---------------------------------------------------
    // Function to filter menu items based on search query
    function filterMenuItems(query) {
        let filteredItems = [];
        Object.keys(menuItems).forEach(function(category) {
            menuItems[category].forEach(function(item) {
                if (item.name.toLowerCase().includes(query)) {
                    filteredItems.push(item);
                }
            });
        });
        return filteredItems;
    }
    //---------------------------------------------------
    // Click event handler for the list items
    $(document).on('click', '.prd-item', function() {
        const selectedItem = $(this).text().split('$')[0].trim();
        let $posItem = $(".pos-item[data-item='" + selectedItem + "']");
        let $posQty = $(".a0-qty-num[data-item='" + selectedItem + "']");
        let $posPrice = $(".a0-price-num[data-item='"+ selectedItem + "']");
    
        if ($posItem.length) {
            // Increment count if item already exists
            let count = parseInt($posItem.attr('data-count'), 10) + 1;
            $posItem.attr('data-count', count);
            $posQty.attr('data-count', count);
            $posQty.find('.count').text(count); // Update count
            const price = parseFloat($posItem.attr('data-price'));
            $posPrice.text('$' + (price * count).toFixed(2)); // Update price
            //C:\Users\Latitude 5310\Desktop\My Project\POS\template\picture\mathematical-basic-signs-of-plus-and-minus-with-a-slash.png
        } else {
            // Add new item if it doesn't exist
            const price = parseFloat($(this).data('price'));
            const posQty = `<div class='a0-qty-num' data-count='1' data-item='${selectedItem}'>
                            <span class='count'>1</span>x
                            </div>`;            
            const posItemHtml = `<div class='pos-item' data-item='${selectedItem}' data-price='${price}' data-count='1'>${selectedItem}</div>`;
            const posPriceHtml = `<div class='a0-price-num' data-item='${selectedItem}'>$${price.toFixed(2)}</div>`;
            $(".pos").append(posItemHtml);
            $(".a0-qty").append(posQty);
            $(".a0-price").append(posPriceHtml);
        }
        updateTotalPrice();
    });
    //---------------------------------------------------
    // Click event handler for .confirm-order
    $(document).on('click', '.confirm-order', function() {
        $(this).toggleClass('Cancel').text(function(i, text) {
            return text === "Save" ? "Cancel" : "Save";
        });
    });
    //---------------------------------------------------
    // Click event handler for .payment
    $(document).on('click', '.total-price', function() {
        let $this = $(this);
        let totalPrice = 0; // Initialize totalPrice variable

        // Calculate total price based on POS items
        $(".pos-item").each(function() {
            const price = parseFloat($(this).attr('data-price'));
            const count = parseInt($(this).attr('data-count'));
            totalPrice += (price * count);
        });

        let sst = 8 / 100;
        let tax = totalPrice * sst;
        totalPrice += tax; // Add tax to totalPrice

        // Toggle text between "Payment" and "Cancel"
       /* if ($this.text() === 'Total Amount: ' + totalPrice.toFixed(2)) {
            $this.text('Cancel');
        } else {
            $this.text("Total Amount: " + totalPrice.toFixed(2));
        }*/
        // Toggle visibility of payment methods
        $(".payment-methods").toggleClass("visible");

        // If payment methods are visible, populate them
        if ($(".payment-methods").hasClass("visible")) {
            $(".payment-methods").html(""); // Clear existing content
            let paymentMethodHtml = '';
            let paymentCancel = '<img class = "cancel-payment" src="./picture/cancel.png">'
            paymentMethod.forEach(function(item) {
                paymentMethodHtml += `<div class="payment-method-list" data-method="${item}">${item}</div>`;
            });
            $(".payment-methods").html(paymentCancel);
            $(".payment-methods").append(paymentMethodHtml); // Set new content
        } else {
            $(".payment-methods").html(""); // Clear existing content if hidden
        }
        
    });

    $(document).on('click','.cancel-payment', function(){
        $(".payment-methods").html("");
        $(".payment-methods").removeClass("visible")
    })
    //---------------------------------------------------
    // Click event handler for .payment-method-list
    $(document).on('click', '.payment-method-list', function() {
        const selectedMethod = $(this).data('method');
        // Start cashiering process
        cashiering(selectedMethod);

        // Create and populate a new div for order details
        $(".order-details").html(`<div class="order"><h3>Order Details for ${selectedMethod}</h3></div>`);

        // Hide payment methods after selection
        $(".payment-methods").removeClass("visible").html(""); // Clear existing content if hidden
    });
    //---------------------------------------------------

    // Function to update total price
    function updateTotalPrice() {
        let totalPrice = 0;
        let sst = 8 / 100;

        // Iterate through each POS item to calculate total price
        $(".pos-item").each(function() {
            const price = parseFloat($(this).attr('data-price'));
            const count = parseInt($(this).attr('data-count'));
            totalPrice += (price * count);
        });

        // Calculate tax and update tax display
        let tax = totalPrice * sst;
        const totalBeforePrice = totalPrice;
        totalPrice = tax + totalPrice;

        // Update display with calculated values
        $(".tax .value").text(tax.toFixed(2));
        $(".total-before-tax .value").text(totalBeforePrice.toFixed(2));
        $(".total-price").text("$ " + totalPrice.toFixed(2));
    }


    //---------------------------------------------------
    // Cashiering function
    function cashiering(method) {
        // Your cashiering logic here, for example:
        alert('Payment with ' + method);
        // You can add more detailed logic for processing the payment here
        
        $(".price-input-container").html(`
            <div class="calculator">
                <div class="calculator-screen">
                    <span class="price-input">$0.00</span>
                </div>
                <div class="calculator-keys">
                    <button class="key">1</button>
                    <button class="key">2</button>
                    <button class="key">3</button>
                    <button class="key">4</button>
                    <button class="key">5</button>
                    <button class="key">6</button>
                    <button class="key">7</button>
                    <button class="key">8</button>
                    <button class="key">9</button>
                    <button class="key">0</button>
                    <button class="key dot">.</button>
                    <button class="key clear">C</button>
                </div>
                <button class="exact-btn">Exact</button>
                <button class="pay-btn">Pay</button>
                <button class="cancel-btn">Cancel</button>
            </div>
        `);

        // Keypad input handling
        let currentInput = ''; // Variable to store current input
        $(document).on('click', '.key', function() {
            const key = $(this).text(); // Get the key value from button text

            if (key === 'C') {
                currentInput = ''; // Clear current input
            } else if (key === '.') {
                if (!currentInput.includes('.')) { // Ensure only one dot is allowed
                    currentInput += key;
                }
            } else {
                currentInput += key; // Append the key to current input
            }

            updateDisplay(currentInput); // Update display with current input
        });

        // Click event handler for .pay-btn
        $(document).on('click', '.pay-btn', function() {
            const paymentAmount = parseFloat(currentInput);
            let totalAmount = parseFloat($(".total-price").text().replace("$ ", ""));

            if (!isNaN(paymentAmount) && paymentAmount >= totalAmount) {
                const change = paymentAmount - totalAmount;
                alert(`Payment successful! Change: $${change.toFixed(2)}`);

                // Update total amount after payment
                totalAmount = 0; // Update with your new total amount logic
                $(".total-price").text("$ " + totalAmount.toFixed(2));
                $('.balance').text("Balance: " + change.toFixed(2));

                // Reset current input and update display
                currentInput = '';
                updateDisplay(currentInput);

                // Create and append the "Done" button div dynamically
                const doneButtonHtml = '<div class="done-btn">Done</div>';
                $(".calculator").append(doneButtonHtml);
            } else {
                alert("Insufficient payment amount.");
            }
        });

        // Click event handler for dynamically created .done-btn
        $(document).on('click', '.done-btn', function() {
            // Clear the order details
            $(".pos").empty(); // Clear the order items
            $(".a0-qty").empty(); // Clear the quantity display
            $(".a0-price").empty(); // Clear the price display
            $(".tax").text("Tax: 0.00"); // Reset tax display
            $(".total-before-tax .value").text("0.00"); // Reset total before tax display
            $(".total-price").text("$ 0.00"); // Reset total price display

            // Optional: Reset any other necessary parts of your UI or application state

            // Show a message or perform any other actions after clearing the order
            alert("Order cleared.");

            // Remove the "Done" button
            $(this).remove();
        });

        // Cancel button handling
        $(document).on('click', '.cancel-btn', function() {
            $(".calculator").remove(); // Remove the entire calculator
            $(".done-btn").hide(); // Hide the done button if visible
        });

        // Exact button handling
        $(document).on('click', '.exact-btn', function() {
            // Get the total amount as text and remove any non-numeric characters
            let totalAmountText = $(".total-price").text().replace(/[^\d.-]/g, '');
            let totalAmount = parseFloat(totalAmountText);

            if (!isNaN(totalAmount)) {
                currentInput = totalAmount.toFixed(2); // Set current input to initial amount
                updateDisplay(currentInput); // Update display with initial amount
            } else {
                console.error("Unable to parse total amount.");
            }
        });

        // Done button handling
        $(document).on('click', '.done-btn', function() {
            // Handle what happens when the user clicks "Done"
            alert("Transaction completed and closed.");

            // Example: Resetting interface or redirecting somewhere else
            location.reload(); // Reload the page as an example
        });

        // Function to update display with current input
        function updateDisplay(input) {
            $(".price-input").text("$" + input);
        }
    }
    //---------------------------------------------------
    // Click event handler for .pos-item
    $(document).on('click', '.pos-item', function(event) {
        console.log("click .pos-item"); // Test console log

        // Close any open option-pos-item elements
        $('.option-pos-item').remove();
        let selectedItem = $(this).attr('data-item');
        // Generate and append optionHtml to the clicked .pos-item element
        let optionHtml = '';
        optionClickPosItem.forEach(function(item) {
            optionHtml += '<div class="option-pos-item">' + item + '</div>';
        });
        $(this).append(optionHtml);

        // Prevent event propagation to avoid closing immediately
        event.stopPropagation();
    });

    // Close option-pos-item when clicking anywhere else on document
    $(document).on('click', function(event) {
        // Check if the clicked element is not a .pos-item or its child
        if (!$(event.target).closest('.pos-item').length) {
            $('.option-pos-item').remove(); // Remove all .option-pos-item elements
        }
    });
    //---------------------------------------------------
    // Clear Order
    $(document).on('click','.bin', function(){
         // Clear the order details
         $(".pos").empty(); 
         $(".a0-qty").empty(); 
         $(".a0-price").empty();
         $("tax .label").text("Tax: ") 
         $(".tax .value").text("0.00"); 
         $(".total-before-tax .value").text("0.00"); 
         $(".total-price").text("$ 0.00"); 
    })

    //---------------------------------------------------
    // Edit quantity
   $(document).on('click', '.a0-qty-num', function() {
    const $qtyContainer = $(this).closest('.a0-qty-num'); // Find the parent container holding quantity information
    console.log('$qtyContainer =',$qtyContainer);
    const selectedItem = $qtyContainer.data('item'); // Get the selected item name
    let count = parseInt($qtyContainer.attr('data-count'), 10); // Get current quantity count
    console.log('count = ',$qtyContainer);
    // Update the quantity display in the modal
    $('.current-quantity').text(count);
    // Show the modal
    $('.modal').css('display', 'block');
    // Close the modal when clicking the close button (×)
    $('.close').on('click', function() {
        $('.modal').css('display', 'none');
    });

    // Click event handler for confirmation button
    $(document).on('click', '.confirm-btn', function() {
        const countInput = parseInt($('.quantity-input').val(), 10); // Get the input value
        const price = parseFloat($qtyContainer.prev('.pos-item').attr('data-price'));
        console.log("CountINput = " + countInput + "and Price = " + price);//debug


        if (!isNaN(countInput) && countInput >= 1) {
            $qtyContainer.attr('data-count', countInput);
            console.log("CountINput = " + countInput + "and Price = " + price);//debug
            $qtyContainer.find('.count').text(countInput);
            updateTotalPrice(); // Update total price after quantity change
            $('.current-quantity').text(countInput);
            $(".total-price").text('$ ' + (price * countInput).toFixed(2));
            $('.modal').css('display', 'none'); // Close the modal after confirmation
        } else {
            // Handle invalid input (not a number or less than 1)
            alert('Please enter a valid quantity (must be a number and at least 1).');
            // Optionally reset the input to 1 or do other error handling
            $('.quantity-input').val('1');
        }
    });
});

    //---------------------------------------------------
    // Update date and time function
    function updateDateTime() {
        const now = new Date();
        $('.datetime').text(now.toLocaleString()); // Update element content with current date and time
    }



    $('.search-item').on('click', function() {
        $('.searchInput').toggle(); // Show or hide the search input on click
    });
    //---------------------------------------------------
    // Handle navigation clicks
    $('.nav-item').on('click', function() {
        const target = $(this).data('target');
        if (target === 'pos') {
            // Load POS content or navigate to POS page
            window.location.href = 'UI.html';
        } else if (target === 'settings') {
            // Load settings content or navigate to settings page
            window.location.href = 'setting.html';
        }
        // Add more cases as needed
    });

    // Toggle navigation visibility
    $('.toggle-nav').on('click', function() {
        $('.navbar').toggle();
    });
    //---------------------------------------------------
};
