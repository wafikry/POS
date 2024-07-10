'use strict';

import { paymentMethod, menuCategory, menuItems, optionClickPosItem, billSetting,addOnDrinks,addOnFood,tableNumber } from './data.js';

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
        // Check for selected option when saving
        let selectedOption = $('input[name="serviceOption"]:checked').val();
        // Toggle class and text for the button
        $(this).toggleClass('Cancel').text(function(i, text) {
            if(!selectedOption){
                alert("Please tick the order type...")
            }else
            return text === "Save" ? "Cancel" : "Save";
        });
    
        // If user cancels, clear out selected option and return
        if ($(this).hasClass('Save')) {
            $('input[name="serviceOption"]').prop('checked', false);
            return;
        }else if ($(this).hasClass('Cancel')){
            console.log
        } 
        // Handle different selected options
        if (selectedOption === "room-service") {
            alert("Room Service confirmed.");
        } else if (selectedOption === "take-away") {
            alert("Selected option: " + selectedOption);
        } else if (selectedOption === "dine-in") {
            alert("Selected option: " + selectedOption);
            showCustomerDetailsModal();
            $('input[name="serviceOption"]').prop('checked', false)
        }
    });

    function showCustomerDetailsModal() {
        // Modal HTML structure with dynamic table selection boxes
        let addCustDetailHtml = `
            <div class="guestModal modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <div>Table Number:</div>
                    <div class="table-selection">
                        <!-- Table boxes will be dynamically populated here -->
                    </div>
                    <div class="room-num-confirm "></div>
                    <button class="confirm-btn">Confirm</button>
                </div>
            </div>
        `;
    
        $('body').append(addCustDetailHtml); // Append the modal HTML to the body
        $('.guestModal').css('display', 'block'); // Display the modal
    
        // Generate table boxes after modal is appended (if needed)
        generateTableBoxes();
    
        // Close modal when clicking on close button
        $(document).on('click', '.close', function() {
            $('.guestModal').remove(); // Remove the modal from DOM
        });
    
        // Handle confirmation button click
        $(document).on('click', '.confirm-btn', function() {
            var guestName = $('.guestName').val(); // Example of retrieving guest name (ensure .guestName exists in modal)
            var tableNumber = $('.tableNumber').val(); // Example of retrieving table number
            var roomNumber = $('.roomNumber').val(); // Example of retrieving room number
    
            // Example: Log the values
            console.log(`Guest Name: ${guestName}, Table Number: ${tableNumber}, Room Number: ${roomNumber}`);
    
            $('.guestModal').remove(); // Remove the modal from DOM
        });
    }

    //----------------------------------------------------------------
    var orderIdCounter = 1; // Initial order ID counter
    // Function to generate formatted order ID
    function generateOrderId() {
        var orderId = orderIdCounter.toString().padStart(6, '0'); // Pad with leading zeros
        return orderId;
    }

    // Event listener for generating and appending order ID
    $('.confirm-order').on('click', function() {
        var orderId = generateOrderId();

        // Append order ID to .order-id div
        $('.order-id').text('Order ID: ' + orderId);

        // Increment order ID counter for next order
        orderIdCounter++;
    });
    
    
    function generateTableBoxes() {
        // Function to generate table selection boxes dynamically
        var availableTableOptions = getAvailableTableOptions(); // Example function to get available table options
        $('.table-selection').html(availableTableOptions); // Replace with actual content
    }
    
    function getAvailableTableOptions() {
        // Example function to generate HTML for available table options
        var tables = ['Table 1', 'Table 2', 'Table 3']; // Example data
        var optionsHtml = tables.map(table => `<div class="table-box" data-table="${table}">${table}</div>`).join('');
        return optionsHtml;
    }
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
        $(".total-price .value").text(totalPrice.toFixed(2));
    }
    function updateTotalAfterDiscount(totalAmount, discountAmount) {
        let totalPrice = totalAmount 
        $(".discount .value").text(discountAmount.toFixed(2));
        $(".total-price .value").text(totalPrice.toFixed(2));
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
                $(".total-price .value").text(totalAmount.toFixed(2));
                $('.balance .value').text(change.toFixed(2));

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
            $(".tax .value").text("0.00"); 
            $(".total-before-tax .value").text("0.00"); 
            $(".total-price .value").text("$ 0.00"); 
            $(".balance .value").text("0.00")
            $(".service-charge .value").text("0.00");

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
        const guestSelectedItem = $(this).text().trim();
        console.log(guestSelectedItem);
        
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
        
        // Slide in the option-pos-item-container
        setTimeout(function() {
            $('.option-pos-item-container').addClass('active');
        }, 10); // Slight delay to ensure the element is added to the DOM before applying the class
        
        // Prevent event propagation to avoid closing immediately
        event.stopPropagation();
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
         $(".total-price .value").text("0.00"); 
         $('.service-charge .value').text("0.00")
        }
    })

    //---------------------------------------------------
    // Function to get available table options
    function getAvailableTableOptions() {
        return tableNumber.map(number => `<option value="${number}">${number}</option>`).join('');
    }

    // Function to generate table boxes dynamically
    function generateTableBoxes() {
        const tables = tableNumber; // Assuming tableNumber is defined in data.js
        
        let tableHtml = '';
        tables.forEach(function(table) {
            tableHtml += `<div class="table-box" data-table="${table}">Table ${table}</div>`;
        });
        
        $(".table-selection").html(tableHtml);
    }

    // Click event for table box selection
    $(document).on('click', '.table-box', function() {
        $(this).toggleClass('selected');
        updateSelectedTables();
    });
    
    function updateSelectedTables() {
        var selectedTables = $('.table-box.selected').map(function() {
            return $(this).data('table');
        }).get();
        
        $('.room-num-confirm').text('Selected Tables: ' + selectedTables.join(', '));
    
        // Update the selected table number in an input field (if applicable)
        if (selectedTables.length > 0) {
            $('.tableNumber').val(selectedTables[0]); // Assuming you want to set the first selected table number
        } else {
            $('.tableNumber').val(''); // Clear input field if no tables are selected
        }
    } 
    // Click event for adding customer detail
    $(document).on('click', '.add-cust-button', function() {
        const availableTableOptions = getAvailableTableOptions(); // Get available table options as HTML
        
        // Modal HTML structure with dynamic table selection boxes
        let addCustDetailHtml = `
            <div class="guestModal modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <div>Table Number: </div>
                    <div class="table-selection">
                        <!-- Table boxes will be dynamically populated here -->
                    </div>
                    <div class="room-num-confirm"></div>
                    <button class="confirm-btn">Confirm</button>
                </div>
            </div>
        `;
        
        $('body').append(addCustDetailHtml); // Append the modal HTML to the body
        $('.guestModal').css('display', 'block'); // Display the modal
        
        // Generate table boxes after modal is appended
        generateTableBoxes();
        
        // Close modal when clicking on close button
        $('.close').click(function() {
            $(this).closest('.guestModal').css('display', 'none');
            $(this).closest('.guestModal').remove();
        });
        
        // Handle confirmation button click
        $('.confirm-btn').click(function() {
            var guestName = $(this).siblings('.guestName').val(); // Example of retrieving guest name
            var tableNumber = $(this).siblings('.tableNumber').val(); // Example of retrieving table number
            var roomNumber = $(this).siblings('.roomNumber').val(); // Example of retrieving room number
            
            // Example: Log the values
            console.log(`Guest Name: ${guestName}, Table Number: ${tableNumber}, Room Number: ${roomNumber}`);
            
            $(this).closest('.guestModal').css('display', 'none'); // Hide the modal
            $(this).closest('.guestModal').remove(); // Remove the modal from DOM
        });
    });
    

    //---------------------------------------------------
    // Edit Bill setting
    $(document).on('click', '.bill-setting', function(event) {
        // Construct HTML for bill settings container
        let optionHtml = '<div class="bill-setting-container">';
        optionHtml += '<div class="bill-setting-close">✖</div>';
        billSetting.forEach(function(item) {
            optionHtml += '<div class="bill-setting-item">' + item + '</div>';
        });
        optionHtml += '</div>';
    
        // Append HTML to body
        $('body').append(optionHtml);
    
        // Slide in the bill-setting-container
        $('.bill-setting-container').addClass('open');
    
        // Prevent event from propagating further
        event.stopPropagation();
    });
    
    // Close bill-setting-container when clicking outside of it
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.bill-setting-container, .bill-setting').length) {
            $('.bill-setting-container').removeClass('open');
        }
    });
    
    
    // Close button event handler
    $(document).on('click', '.bill-setting-close', function() {
        $('.bill-setting-container').remove();
    });
    $(document).on('click', '.bill-setting-container', function() {
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
        $(document).on('click', '.confirm-btn-modal', function() {
            const countInput = parseInt($('.quantity-input').val(), 10); // Get the input value
            const price = parseFloat($qtyContainer.prev('.pos-item').attr('data-price'));
            console.log("CountINput = " + countInput + "and Price = " + price);//debug
    
    
            if (!isNaN(countInput) && countInput >= 1) {
                $qtyContainer.attr('data-count', countInput);
                console.log("CountINput = " + countInput + "and Price = " + price);//debug
                $qtyContainer.find('.count').text(countInput);
                updateTotalPrice(); // Update total price after quantity change
                $('.current-quantity').text(countInput);
                $(".total-price .value").text((price * countInput).toFixed(2));
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
    let selectedSplitItem = null;
    $(document).on('click', '.bill-setting-item', function() {
        if ($(this).text().trim() === "Bill Discount") {
            $('.discount-div').toggleClass('show');
            $('.bill-setting-container').removeClass('show')
        } else if ($(this).text().trim() === "Split Bill") {
            $('.split-bill-container').toggleClass('show');
        } else if($(this).text().trim() === "Split Item"){
            $('.split-item-container').toggleClass('show');
        }
    });
    $(document).on('click', '.apply-split-item-btn', function() {
    const numberOfSplits = $('#split-item-amount').val();
    const itemPrice = parseFloat(selectedSplitItem.find('.a0-price-num').text().trim().replace('$', ''));
    const splitPrice = (itemPrice / numberOfSplits).toFixed(2);

    let splitDetailsHtml = `<p>Total Amount: $${itemPrice.toFixed(2)}</p>`;
    for (let i = 1; i <= numberOfSplits; i++) {
        splitDetailsHtml += `<p>Split ${i}: $${splitPrice}</p>`;
    }

    selectedSplitItem.find('.split-item-details').html(splitDetailsHtml);
    $('.split-item-container').removeClass('show');
});

// Close modal when clicking outside of content
$(document).on('click', '.split-item-container', function(e) {
    if ($(e.target).is('.split-item-container')) {
        $(this).removeClass('show');
    }
});
    $(document).on('click','.close-split',function(){
        $('.split-bill-container').removeClass('show');
    })
    
    $(document).on('click', '.apply-split-bill-btn', function() {
        const numberOfSplits = parseInt($('#split-bill-amount').val());
        const totalAmount = parseFloat($('.total-price .value').text());
        const splitType = $('input[name="split-type"]:checked').val();
    
        if (splitType === 'percent') {
            let splitDetailsHtml = `<p>Total Amount: $${totalAmount.toFixed(2)}</p>`;
            const percentages = $('.split-percentage').map(function() {
                return parseFloat($(this).val());
            }).get();
    
            percentages.forEach((percent, index) => {
                const splitAmount = (totalAmount * (percent / 100)).toFixed(2);
                splitDetailsHtml += `<p>Split ${index + 1}: $${splitAmount} (${percent}%)</p>`;
            });
    
            $('.split-bill-details').html(splitDetailsHtml);
        } else if (splitType === 'amount') {
            let splitDetailsHtml = `<p>Total Amount: $${totalAmount.toFixed(2)}</p>`;
            const amounts = $('.split-amount').map(function() {
                return parseFloat($(this).val());
            }).get();
    
            amounts.forEach((amount, index) => {
                splitDetailsHtml += `<p>Split ${index + 1}: $${amount.toFixed(2)}</p>`;
            });
    
            $('.split-bill-details').html(splitDetailsHtml);
        }
    });
    
    // Function to dynamically add input fields for split percentage or amount
    $(document).on('change', '#split-bill-amount', function() {
        const numberOfSplits = parseInt($(this).val());
        const splitType = $('input[name="split-type"]:checked').val();
        let inputFieldsHtml = '';
    
        for (let i = 1; i <= numberOfSplits; i++) {
            if (splitType === 'percent') {
                inputFieldsHtml += `<div><label>Split ${i} (%):</label><input type="number" class="split-percentage" min="0" max="100" value="0"></div>`;
            } else if (splitType === 'amount') {
                inputFieldsHtml += `<div><label>Split ${i} ($):</label><input type="number" class="split-amount" min="0" value="0"></div>`;
            }
        }
    
        $('.split-input-fields').html(inputFieldsHtml);
    });


    $('.apply-discount-btn').on('click', function() {
        const discountType = $('.discount-type').val();
        const discountValue = parseFloat($('.discount-value').val());
        let totalAmount = parseFloat($(".total-pric .value").text());
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
    $('.cancel').on('click',function(){
        $('.discount-div').removeClass('show');
    })
    //------------------------------------------------------------
    $(document).on('click', '.option-pos-item', function() {
        if ($(this).text().trim() === "Add-On") {
            // Clear the previous add-ons
            $('.add-ons').empty();
            // Add the close button
            const closeButton = '<div class="add-ons-close">X</div>';
            $('.add-ons').append(closeButton);
    
            // Function to create add-on elements
            const createAddOnElement = (item) => {
                return `<div class="add-on-item">
                            <span class="add-on-name">${item.name}</span>
                            <span class="add-on-price">$${item.price.toFixed(2)}</span>
                        </div>`;
            };
    
            // Append add-on food items
            addOnFood.forEach(item => {
                $('.add-ons').append(createAddOnElement(item));
            });
    
            // Check if the category is "Beverage" and append add-on drink items
            if ($('.cat-item').text().trim() === "Beverage") {
                addOnDrinks.forEach(item => {
                    $('.add-ons').append(createAddOnElement(item));
                });
            }
    
            // Slide in the add-ons container
            $('.add-ons-container').addClass('show');
        } else if ($(this).text().trim() === "Override") {
            console.log("Override");
            $('.override').empty();
            const overrideHtml = `
                <div class="override-content">
                    <div class="override-close">X</div>
                    <h2>Override Price</h2>
                    <div class="override-price">
                        <label for="new-price">New Price:</label>
                        <input type="number" id="new-price" class="new-price" min="0" step="0.01">
                        <button class="apply-override-btn">Apply</button>
                    </div>
                </div>
            `;
            $('.override').append(overrideHtml);
            $('.override-container').addClass('show');
        } else if ($(this).text().trim() === "Item Discount") {
            console.log("Item Discount");
            $('.item-discount').empty();
            const itemDiscountHtml = `
                <div class="item-discount-content">
                    <div class="item-discount-close">X</div>
                    <h2>Apply Item Discount</h2>
                    <label for="discount-type">Discount Type:</label>
                    <select class="item-discount-type">
                        <option value="percent">Percentage</option>
                        <option value="amount">Amount</option>
                    </select>
                    <label for="discount-value">Value:</label>
                    <input type="number" class="item-discount-value" min="0" step="0.01">
                    <button class="apply-item-discount-btn">Apply</button>
                </div>
            `;
            $('.item-discount').append(itemDiscountHtml);
            $('.item-discount-container').addClass('show');
        }
    });
    $(document).on('click', '.apply-item-discount-btn', function() {
        $('.item-discount-container').removeClass('show');
    });
    $(document).on('click', '.item-discount-close', function() {
        $('.item-discount-container').removeClass('show');
    });
    
    $(document).on('click', '.apply-item-discount-btn', function() {
        let discountType = $('.item-discount-type').val();
        let discountValue = $('.item-discount-value').val();
    
        if (discountValue !== "") {
            // Calculate discounted price based on type
            let currentPrice = parseFloat($('.a0-price-num').text().replace('$', ''));
            let discountedPrice = 0;
    
            if (discountType === "percent") {
                discountedPrice = currentPrice * (1 - parseFloat(discountValue) / 100);
            } else if (discountType === "amount") {
                discountedPrice = currentPrice - parseFloat(discountValue);
            }
    
            // Update displayed price
            $('.a0-price-num').text(`$${discountedPrice.toFixed(2)}`);
    
            console.log(`Applying ${discountType} discount of ${discountValue} to item price.`);
        } else {
            alert("Please enter a valid discount value.");
        }
    });
    
    $(document).on('click', '.override-close', function() {
        $('.override-container').removeClass('show');
    });
    
    $(document).on('click', '.apply-override-btn', function() {
        let newPrice = $('.new-price').val();
        if (newPrice !== "") {
            // Update displayed price
            $('.a0-price-num').text(`$${parseFloat(newPrice).toFixed(2)}`);
            
            // Implement any other logic related to applying the new price
    
            console.log("Applying new price:", newPrice);
            $('.override-container').removeClass('show');
            updateTotalPrice();
        } else {
            alert("Please enter a valid new price.");
        }

    });
    $(document).on('click', '.overide-close', function() {
        $('.override-container').removeClass('show');
    });
    // Handle close button click to hide the add-ons container
    $(document).on('click', '.add-ons-close', function() {
        $('.add-ons-container').removeClass('show');
    });

    let selectedPosItem = null;

// Event listener for selecting a pos-item
$(document).on('click', '.pos-item', function() {
    selectedPosItem = $(this);
    // Highlight the selected pos-item (optional)
    $('.pos-item').removeClass('selected');
    $(this).addClass('selected');
});

// Event listener for clicking an add-on item
$(document).on('click', '.add-on-item', function() {
    if (selectedPosItem) {
        const addOnName = $(this).find('.add-on-name').text().trim();
        const addOnPrice = parseFloat($(this).find('.add-on-price').text().trim().substring(1)); // Remove $ and parse to float
        const appendNameHtml = `<div class="addOnItem" data-name="${addOnName}"> + ${addOnName} ($${addOnPrice.toFixed(2)})</div>`;
        
        // Append the add-on item to the selected pos-item
        selectedPosItem.append(appendNameHtml);
        
        // Update the price in the a0-price-num element
        const priceElement = selectedPosItem.find('.a0-price-num');
        const currentPrice = parseFloat(priceElement.text().substring(1)); // Remove $ and parse to float
        const newPrice = currentPrice + addOnPrice;
        priceElement.text(`$${newPrice.toFixed(2)}`);
        
        $('.add-ons-container').removeClass('show');
    } else {
        alert("Please select a POS item first.");
    }
});

$(document).ready(function() {
    // Example: Navigate to view-orders.html on click
    $('.nav-item[data-target="view-orders.html"]').click(function() {
        window.location.href = 'view-orders.html'; // Navigate to view-orders.html
    });
});


// Close modal when clicking outside of content (optional)
$(document).on('click', '.add-ons-container', function(e) {
    if ($(e.target).is('.add-ons-container')) {
        $(this).removeClass('show');
    }
});

$(document).on('click', '.confirm-btn', function() {
    var selectedTables = $('.table-box.selected').map(function() {
        return $(this).data('table');
    }).get();
    var orderId = $('.order-id').text().trim();
    var tableNum = selectedTables;
    //var tableNum = $('.table-box').text().trim();
    console.log('Order ID = ', orderId);

    let orders = [];
    let quantityArr = [];
    let priceArr = [];

    // Collect item names
    $('.pos-item').each(function(index) {
        let itemName = $(this).text().trim();
        orders.push(itemName);
    });

    // Collect prices
    $('.a0-price-num').each(function(index) {
        let price = $(this).text().trim();
        priceArr.push(price);
    });

    // Collect quantities
    $('.a0-qty-num').each(function(index) {
        let quantity = $(this).text().trim();
        quantityArr.push(quantity);
    });

    // Debugging: Log the collected arrays
    console.log('Item Names:', orders);
    console.log('Prices:', priceArr);
    console.log('Quantities:', quantityArr);

    // Combine item names, prices, and quantities
    let orderNum = orderId;
    let combinedOrders = orders.map((itemName, index) => {
        let quantity = quantityArr[index];
        let price = priceArr[index];
        return `${itemName} - Quantity: ${quantity}, Price: ${price}`;
    });

    // Debugging: Log the combined orders
    console.log('Combined Orders:', combinedOrders);

    // Store orders in localStorage
    localStorage.setItem('tableNum', JSON.stringify(tableNum));
    localStorage.setItem('orderNum', JSON.stringify(orderNum));
    localStorage.setItem('orders', JSON.stringify(combinedOrders));

    // Redirect to view-orders.html or navigate using JavaScript
    window.location.href = 'view-orders.html';
});

function formatDate(date) {
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

// Get current date and format it
let currentDate = new Date();
let formattedDate = formatDate(currentDate);

// Update transaction date in the UI
document.querySelector('.transaction-date .date').textContent = formattedDate;
    
};


