

DROP DATABASE if EXISTS Cats;
CREATE DATABASE Cats;
USE Cats;


-- Cats because I love cats
Create table someCats (
    cat_id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(50) NOT NULL UNIQUE
);
Create table catsHats (
    hat_id INT AUTO_INCREMENT PRIMARY KEY,
    cat_id INT,
    hat_desc VARCHAR(50) NOT NULL UNIQUE,
    FOREIGN KEY (cat_id) REFERENCES someCats(cat_id)
);
INSERT INTO someCats(description) values
    ("An orange Cat with funny ears"),
    ("A Black cat with white spots"),
    ("Cat that looks like a shark");

INSERT INTO catsHats (cat_id, hat_desc) values
    (1, "Skimmer"),
    (2, "Bowler hat"),
    (3, "Straw hat");

