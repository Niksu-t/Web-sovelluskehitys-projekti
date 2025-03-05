USE Cats;

-- Examples of deleting and updating tables creted in assingment.sql

UPDATE someCats
    SET description = "An orange cat with fluffy ears"
    WHERE cat_id = 1;

DELETE from catsHats 
    WHERE hat_id = 1;


SELECT * FROM someCats;