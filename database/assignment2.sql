-- assignment2.sql
-- Task 1: SQL CRUD Statements
-- IMPORTANT: These queries are tested AFTER having the database built

-- 1. Insert new Tony Stark record into accounts table
-- The account_id and account_type fields handle their own values and don't need to be part of this query
INSERT INTO accounts (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- 2. Modify Tony Stark's record to change account type to "Admin"
UPDATE accounts 
SET account_type = 'Admin' 
WHERE account_email = 'tony@starkent.com';

-- 3. Delete Tony Stark's record from the database
DELETE FROM accounts 
WHERE account_email = 'tony@starkent.com';

-- 4. Modify the "GM Hummer" record to change "small interiors" to "a huge interior"
-- Using PostgreSQL's REPLACE function
UPDATE inventory 
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- 5. Select make, model and classification using INNER JOIN for "Sport" category
SELECT i.inv_make, i.inv_model, c.classification_name
FROM inventory i
INNER JOIN classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- 6. Update image paths to add "/vehicles" in inv_image and inv_thumbnail
UPDATE inventory 
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');