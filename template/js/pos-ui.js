'use strict';

import { paymentMethod, menuCategory, menuItems, optionClickPosItem, billSetting } from './data.js';

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
            $(".payment-methods").append(paymentMethodHtml); 
        } else {
            $(".payment-methods").html(""); 
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
        cashiering(selectedMethod);
        $(".order-details").html(`<div class="order"><h3>Order Details for ${selectedMethod}</h3></div>`);
        $(".payment-methods").removeClass("visible").html(""); 
    });
    //---------------------------------------------------
    // Function to update total price
    function updateTotalPrice() {
        let serviceCharge = 10 /100;
        let totalPrice = 0;
        let sst = 8 / 100;

        // Iterate through each POS item to calculate total price
        $(".pos-item").each(function() {
            const price = parseFloat($(this).attr('data-price'));
            const count = parseInt($(this).attr('data-count'));
            totalPrice += (price * count);
        });
        let totalServiceCharge = totalPrice * serviceCharge;       
        let tax = totalPrice * sst;
        const totalBeforePrice = totalPrice;
        totalPrice = tax + totalPrice + totalServiceCharge;
        $(".service-charge .value").text(totalServiceCharge.toFixed(2));
        $(".tax .value").text(tax.toFixed(2));
        $(".total-before-tax .value").text(totalBeforePrice.toFixed(2));
        $(".total-price").text("$ " + totalPrice.toFixed(2));
    }
    function updateTotalAfterDiscount(totalAmount, discountAmount) {
        let totalPrice = totalAmount 
        $(".discount .value").text(discountAmount.toFixed(2));
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
           
            $(".pos").empty();
            $(".a0-qty").empty();
            $(".a0-price").empty(); 
            $(".tax").text("Tax: 0.00"); 
            $(".total-before-tax .value").text("0.00"); 
            $(".total-price").text("$ 0.00"); 

            // Optional: Reset any other necessary parts of your UI or application state

            alert("Order cleared.");
            $(this).remove();
        });

        // Cancel button handling
        $(document).on('click', '.cancel-btn', function() {
            $(".calculator").remove(); 
            $(".done-btn").hide(); 
        });

        // Exact button handling
        $(document).on('click', '.exact-btn', function() {
            // Get the total amount as text and remove any non-numeric characters
            let totalAmountText = $(".total-price").text().replace(/[^\d.-]/g, '');
            let totalAmount = parseFloat(totalAmountText);

            if (!isNaN(totalAmount)) {
                currentInput = totalAmount.toFixed(2); 
                updateDisplay(currentInput); 
            } else {
                console.error("Unable to parse total amount.");
            }
        });

        // Done button handling
        $(document).on('click', '.done-btn', function() {
            
            alert("Transaction completed and closed.");

           e
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
        $('.option-pos-item-container').remove();
    
        let selectedItem = $(this).attr('data-item');
    
        // Generate and append optionHtml to the body element
        let optionHtml = '<div class="option-pos-item-container">';
        optionHtml += '<div class="option-pos-item-close">✖</div>';
        optionClickPosItem.forEach(function(item) {
            optionHtml += '<div class="option-pos-item">' + item + '</div>';
        });
        optionHtml += '</div>';
        $('body').append(optionHtml);
    
        
    
        // Prevent event propagation to avoid closing immediately
        event.stopPropagation();
    });
    
    // Hide the option-pos-item elements when clicking elsewhere on the body
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.option-pos-item-container, .pos-item').length) {
            $('.option-pos-item-container').remove();
        }
    });
    
    // Close button event handler
    $(document).on('click', '.option-pos-item-close', function() {
        $('.option-pos-item-container').remove();
    });
    //----------------------------------------------
    // Clear Order
    $(document).on('click','.bin', function(){
        if($('.confirm-order').text() === 'Cancel'){
            alert("You cannot void this without permission")
        }else{
         // Clear the order details
         $(".pos").empty(); 
         $(".a0-qty").empty(); 
         $(".a0-price").empty();
         $("tax .label").text("Tax: ") 
         $(".tax .value").text("0.00"); 
         $(".total-before-tax .value").text("0.00"); 
         $(".total-price").text("$ 0.00"); 
         $('.service-charge .value').text("0.00")
        }
    })

    //---------------------------------------------------
    // Add customer detail
    // class = add-cust-button
    $(document).on('click','.add-cust-button', function(){
        let addCustDetailHtml = `
            <div class="guestModal modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>Guest Information</h2>
                    <label for="guestName">Guest Name:</label>
                    <input type="text" class="guestName" name="guestName" required>
                    <label for="tableNumber">Table Number:</label>
                    <input type="text" class="tableNumber" name="tableNumber" required>
                    <label for="roomNumber">Room Number:</label>
                    <input type="text" class="roomNumber" name="roomNumber">
                    <img src="" alt="Search">
                    <button class="confirm-btn">Confirm</button>
                </div>
            </div>
        `;
        $('body').append(addCustDetailHtml);
        $('.guestModal').css('display', 'block');
        $('.close').click(function() {
            $(this).closest('.guestModal').css('display', 'none');
            $(this).closest('.guestModal').remove();
        });
        $('.confirm-btn').click(function() {
            var guestName = $(this).siblings('.guestName').val();
            var tableNumber = $(this).siblings('.tableNumber').val();
            var roomNumber = $(this).siblings('.roomNumber').val();
            
            $(this).closest('.guestModal').css('display', 'none');
            $(this).closest('.guestModal').remove();
        });
        
    })
    //---------------------------------------------------
    // Edit Bill setting
    $(document).on('click', '.bill-setting', function() {
        let optionHtml = '<div class="bill-setting-container">';
        optionHtml += '<div class="bill-setting-close">✖</div>';
        billSetting.forEach(function(item) {
            optionHtml += '<div class="bill-setting-item">' + item + '</div>';
        });
        optionHtml += '</div>';
        $('body').append(optionHtml);


        event.stopPropagation();
    })

    
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.bill-setting-container, .bill-setting').length) {
            $('.bill-setting-container').remove();
        }
    });
    
    // Close button event handler
    $(document).on('click', '.bill-setting-close', function() {
        $('.bill-setting-container').remove();
    });
    //---------------------------------------------------
    // Edit quantity
   $(document).on('click', '.a0-qty-num', function() {
    const $qtyContainer = $(this).closest('.a0-qty-num'); // Find the parent container holding quantity information
    console.log('$qtyContainer =',$qtyContainer);
    const selectedItem = $qtyContainer.data('item'); 
    let count = parseInt($qtyContainer.attr('data-count'), 10); 
    console.log('count = ',$qtyContainer);
    
    $('.current-quantity').text(count);
  
    $('.modal').css('display', 'block');
    
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
            $('.modal').css('display', 'none'); 
        } else {
            // Handle invalid input (not a number or less than 1)
            alert('Please enter a valid quantity (must be a number and at least 1).');
            // 
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

    $(document).on('click', '.bill-setting-item', function() {
        if ($(this).text().trim() === "Bill Discount") {
            $('.discount-div').toggleClass('show');
        }
    });

    $('.apply-discount-btn').on('click', function() {
        const discountType = $('.discount-type').val();
        const discountValue = parseFloat($('.discount-value').val());
        let totalAmount = parseFloat($(".total-price").text().replace("$ ", ""));
        let discountAmount = 0;
    
        if (discountType === 'percent') {
            discountAmount = totalAmount * (discountValue / 100);
        } else if (discountType === 'amount') {
            discountAmount = discountValue;
        }
    
        totalAmount -= discountAmount;
        updateTotalAfterDiscount(totalAmount, discountAmount);
    
        
        $('.discount-div').removeClass('show');
    });
};
