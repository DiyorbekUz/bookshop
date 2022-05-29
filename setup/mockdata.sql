insert into users (user_name, user_password, user_is_admin) values
('admin','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', true),
('nosir', 'c7408c4a070422ede36cb745899fbf584b73bd165258312ac1564812246c6366', false),
('hikmat', 'eabc4524a29bfee29953b3e9a3110a884b495693e051e52dd74599f951445ab7', false);


insert into categories (category_name, category_img) values
('diniy kitoblar', 'diniykitoblar.jpg'),
('ertak kitoblar', 'ertakkitoblar.jpg');


insert into products (category_id, product_name, product_img, product_price, short_description, long_description) values
(1, 'Jannatga oshiq qalb', 'jannatgaoshiqqalb.jpg', 50000, 'Jannatga oshiq qalb yangi kitob', 'Jannatga oshiq qalb juda ajoyib kitob sotib olishga arziydi'),
(2, 'Harsang tosh', 'harsangtosh.jpg', 25000, 'yosh bolalar uchun yaxshi ertak kitob', 'Yosh bolalar uchun juda ajoyib kitob ekan bolalarni uxlashidan avval oqib berish uchun ham juda yaxshi');


insert into orders (user_id, product_id, product_price, order_count, order_is_paid) values
(2, 1, 50000, 1, false),
(3, 2, 50000, 2, false);

SELECT 
    u.user_id,
    u.username,
    count(c.contact_body) AS contacts_count
FROM users u
INNER JOIN contacts c ON c.user_id = u.user_id
GROUP BY u.user_id
;


SELECT 
    o.order_id,
    u.username,
    f.product_name,
    o.order_count
FROM orders o
INNER JOIN products f  ON o.product_id = f.product_id
INNER JOIN users u ON o.user_id = u.user_id;


ALTER SEQUENCE users RESTART WITH 1;
