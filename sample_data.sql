-- Sample Data for 'products' table
INSERT INTO products (name, description, price, image, category, sizes, colors, stock)
VALUES
  ('Cyber-Punk Jersey', 'A futuristic jersey with neon accents and a sleek design. Perfect for the urban athlete.', 79.99, 'https://via.placeholder.com/300x300.png?text=Cyber-Punk+Jersey', 'Sci-Fi', '{"S", "M", "L", "XL"}', '{"#00FFFF", "#FF00FF", "#000000"}', 50),
  ('Galaxy Explorer Jersey', 'Explore the cosmos in this comfortable and stylish jersey, featuring a vibrant galaxy print.', 89.99, 'https://via.placeholder.com/300x300.png?text=Galaxy+Jersey', 'Space', '{"M", "L", "XL"}', '{"#8A2BE2", "#4B0082", "#000000"}', 30),
  ('Matrix Glitch Jersey', 'Embrace the digital world with this unique glitch-effect jersey. Stand out from the crowd.', 69.99, 'https://via.placeholder.com/300x300.png?text=Matrix+Jersey', 'Digital', '{"S", "L", "XL"}', '{"#00FF00", "#000000"}', 40),
  ('Retro Wave Jersey', 'Step back into the 80s with this vibrant retro-inspired jersey. Pure nostalgia.', 74.99, 'https://via.placeholder.com/300x300.png?text=Retro+Jersey', 'Retro', '{"S", "M", "L"}', '{"#FF1493", "#00BFFF", "#FFD700"}', 25),
  ('Steampunk Aviator Jersey', 'A blend of Victorian elegance and industrial innovation. Fly high in style.', 99.99, 'https://via.placeholder.com/300x300.png?text=Steampunk+Jersey', 'Fantasy', '{"M", "L", "XL"}', '{"#A0522D", "#8B4513", "#000000"}', 20);

-- Sample Data for 'profiles' table (Requires a user to be registered first)
-- Replace 'YOUR_REGISTERED_USER_UUID' with the actual UUID of a user from your auth.users table
-- You can find user UUIDs in your Supabase project under Authentication -> Users
-- INSERT INTO profiles (id, username, avatar_url, website, updated_at)
-- VALUES
--   ('YOUR_REGISTERED_USER_UUID', 'jerseyfan1', 'https://via.placeholder.com/150', 'https://mywebsite.com', now());

-- Sample Data for 'orders' table (Requires a user to be registered first)
-- Replace 'YOUR_REGISTERED_USER_UUID' with the actual UUID of a user
-- INSERT INTO orders (user_id, total_amount, status, shipping_address)
-- VALUES
--   ('YOUR_REGISTERED_USER_UUID', 169.98, 'completed', '{"address": "123 Cyber St", "city": "Neo City", "state": "CA", "zip": "90210", "country": "USA"}');

-- Sample Data for 'order_items' table (Requires an order and products to exist)
-- Replace 'YOUR_ORDER_ID' with the actual ID of an order from your orders table
-- Replace 'PRODUCT_ID_1' and 'PRODUCT_ID_2' with actual product IDs from your products table
-- INSERT INTO order_items (order_id, product_id, quantity, price)
-- VALUES
--   ('YOUR_ORDER_ID', 'PRODUCT_ID_1', 1, 79.99),
--   ('YOUR_ORDER_ID', 'PRODUCT_ID_2', 1, 89.99);

-- Sample Data for 'wishlist' table (Requires a user and products to exist)
-- Replace 'YOUR_REGISTERED_USER_UUID' with the actual UUID of a user
-- Replace 'PRODUCT_ID_3' with an actual product ID
-- INSERT INTO wishlist (user_id, product_id)
-- VALUES
--   ('YOUR_REGISTERED_USER_UUID', 'PRODUCT_ID_3');

-- Sample Data for 'reviews' table (Requires a user and products to exist)
-- Replace 'PRODUCT_ID_1' with an actual product ID
-- Replace 'YOUR_REGISTERED_USER_UUID' with the actual UUID of a user
-- INSERT INTO reviews (product_id, user_id, rating, comment)
-- VALUES
--   ('PRODUCT_ID_1', 'YOUR_REGISTERED_USER_UUID', 5, 'Amazing jersey, great quality and futuristic look!'),
--   ('PRODUCT_ID_2', 'YOUR_REGISTERED_USER_UUID', 4, 'Comfortable and stylish, but the print could be a bit sharper.');
