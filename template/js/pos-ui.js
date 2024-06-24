'use strict';

import { paymentMethod, menuCategory, menuItems, optionClickPosItem} from './data.js';

$(document).ready(function(){
    posOrder();
});

function posOrder() {
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Generate category buttons
    let categoryHtml = '';
    menuCategory.forEach(function(item){
        categoryHtml += '<div class="cat-item" data-category="' + item + '">' + item + '</div>';
    });
    $(".category").html(categoryHtml);

    // Event delegation for category click
    $(document).on('click', '.cat-item', function(){
        // Clear the list area
        $(".list").html("");

        // Retrieve the items based on the selected category
        const type = $(this).data('category');
        const items = menuItems[type] || [];

        let menuHtml = '';
        items.forEach(function(item) {
            menuHtml += '<div class="prd-item" data-price="' + item.price + '">' + item.name + '<br>$' + item.price.toFixed(2) + '</div>';
        });

        // Display the menu items in the list area
        $(".list").html(menuHtml);
    });

    // Click event handler for the list items
    $(document).on('click', '.prd-item', function(){
        const selectedItem = $(this).text().split('$')[0].trim();
        let $posItem = $(".pos-item[data-item='" + selectedItem + "']");
        let $posQty = $(".a0-qty-num[data-item='" + selectedItem + "']");
        let $posPrice = $(".a0-price-num[data-item='"+ selectedItem + "']");
    
        if ($posItem.length) {
            // Increment count if item already exists
            let count = parseInt($posItem.attr('data-count'), 10) + 1;
            $posItem.attr('data-count', count);
            //--------------------------------------
            $posQty.attr('data-count', count);
            $posQty.find('.count').text(count); // Update count
            //--------------------------------------
            const price = parseFloat($posItem.attr('data-price'));
            $posPrice.text('$' + (price).toFixed(2)); // Update price
        } else {
            // Add new item if it doesn't exist
            const price = parseFloat($(this).data('price'));
            const posQty = "<div class='a0-qty-num' data-count='1' data-item='" + selectedItem + "'>x<span class='count'>1</span> " + "</div>";
            const posItemHtml = "<div class='pos-item' data-item='" + selectedItem + "' data-price='" + price + "' data-count='1'>" + selectedItem + "</div>";
            const posPriceHtml = "<div class='a0-price-num' data-item='" + selectedItem + "'>$" + price.toFixed(2) + "</div>";
            $(".pos").append(posItemHtml);
            $(".a0-qty").append(posQty);
            $(".a0-price").append(posPriceHtml);
        }
        updateTotalPrice();
    });
    

    // Confirm order
    $(document).on('click','.confirm-order',function(){
        if ($(this).text() === 'Order Confirm') {
            $(this).text('Confirmed').addClass('confirmed');
        } else {
            $(this).text('Order Confirm').removeClass('confirmed');
        }
    });

    // Function to update total price
    function updateTotalPrice(){
        let totalPrice = 0;
        let sst = 8/100;
        $(".pos-item").each(function(){
            const price = parseFloat($(this).attr('data-price'));
            const count = parseInt($(this).attr('data-count'));
            totalPrice += (price * count);
        });
        let tax = totalPrice * sst;
        const totalBeforePrice = totalPrice;
        totalPrice = tax + totalPrice;
        $(".tax").text("Tax: " + tax.toFixed(2));
        $(".total-before-tax").text("Total: " + totalBeforePrice.toFixed(2));
        $(".total-price").text("Total Amount: " + totalPrice.toFixed(2));
    }

    // Click event handler for .payment
    $(document).on('click', '.payment', function(){
        // Toggle visibility of payment methods
        $(".payment-methods").toggleClass("visible");
        
        // If payment methods are visible, populate them
        if ($(".payment-methods").hasClass("visible")) {
            $(".payment-methods").html(""); // Clear existing content
            let paymentMethodHtml = '';
            paymentMethod.forEach(function(item) {
                paymentMethodHtml += '<div class="payment-method-list">' + item + '</div>';
            });
            $(".payment-methods").html(paymentMethodHtml); // Set new content
        }
    });

    // Click event handler for .-pos-item
    $(document).on('click', '.pos-item', function(event){
    console.log("click .pos-item"); // Test console log

    // Close any open option-pos-item elements
    $('.option-pos-item').remove();

    // Generate and append optionHtml to the clicked .pos-item element
    let optionHtml = '';
    optionClickPosItem.forEach(function(item){
        optionHtml += '<div class="option-pos-item">' + item + '</div>';
    });
    $(this).append(optionHtml);

    // Prevent event propagation to avoid closing immediately
    event.stopPropagation();
});

// Close option-pos-item when clicking anywhere else on document
$(document).on('click', function(event){
    // Check if the clicked element is not a .pos-item or its child
    if (!$(event.target).closest('.pos-item').length) {
        $('.option-pos-item').remove(); // Remove all .option-pos-item elements
    }
});
    // Handle navigation clicks
    $('.nav-item').on('click', function(){
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

    // Update date and time function
    function updateDateTime() {
        const now = new Date();
        $('.datetime').text(now.toLocaleString()); // Update element content with current date and time
    }
}
