$(document).ready(function() {
    // Click event handler for setting items
    $('.set-item').on('click', function(){
        const settingType = $(this).data('setting');
        $('.setting-details').html(''); // Clear existing content

        if (settingType === 'food') {
            // Create a form for configuring food items
            const foodFormHtml = `
                <h2>Food Settings</h2>
                <form id="food-form">
                    <div class="form-group">
                        <label for="food-name">Food Name</label>
                        <input type="text" id="food-name" name="food-name" required />
                    </div>
                    <div class="form-group">
                        <label for="food-category">Category</label>
                        <select id="food-category" name="food-category">
                            <option value="coffee">Coffee</option>
                            <option value="tea">Tea</option>
                            <option value="chocolate">Chocolate</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="food-price">Price ($)</label>
                        <input type="number" id="food-price" name="food-price" step="0.01" required />
                    </div>
                    <div class="form-group">
                        <label for="food-quantity">Quantity</label>
                        <input type="number" id="food-quantity" name="food-quantity" required />
                    </div>
                    <button type="submit">Save Food Item</button>
                </form>
            `;
            $('.setting-details').html(foodFormHtml);

            // Handle form submission
            $('#food-form').on('submit', function(event) {
                event.preventDefault();
                const foodName = $('#food-name').val();
                const foodCategory = $('#food-category').val();
                const foodPrice = parseFloat($('#food-price').val()).toFixed(2);
                const foodQuantity = parseInt($('#food-quantity').val(), 10);

                // Display the configured food item (for demo purposes)
                const foodItemHtml = `
                    <h3>Configured Food Item</h3>
                    <p><strong>Name:</strong> ${foodName}</p>
                    <p><strong>Category:</strong> ${foodCategory}</p>
                    <p><strong>Price:</strong> $${foodPrice}</p>
                    <p><strong>Quantity:</strong> ${foodQuantity}</p>
                `;
                $('.setting-details').append(foodItemHtml);
            });
        } else if (settingType === 'payment') {
            $('.setting-details').html('<h2>Payment Method Settings</h2><p>Configure your payment methods here.</p>');
        } else if (settingType === 'inventory') {
            $('.setting-details').html('<h2>Inventory Settings</h2><p>Manage your inventory here.</p>');
        }
    });

    // Handle navigation to UI.html
    $(document).on('click', '.navigate-to-ui', function() {
        window.location.href = 'UI.html';
    });
});
