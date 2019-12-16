DROP TABLE IF EXISTS room;
CREATE TABLE room (
	room_id int(5) NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	area int(5) DEFAULT NULL,
	PRIMARY KEY (room_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO room (name, area) VALUES
	('Large', 1200),
	('Medium', 700),
	('Small', 300);

DROP TABLE IF EXISTS cat;
CREATE TABLE cat (
	cat_id int(5) NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	breed varchar(255) NOT NULL,
	color varchar(255) NOT NULL,
	hair varchar(255) NOT NULL,
	age int(5) DEFAULT NULL,
	weight int(5) DEFAULT NULL,
	room int(5) DEFAULT NULL,
	PRIMARY KEY (cat_id),
	CONSTRAINT cat_fk_1 FOREIGN KEY (room) REFERENCES room (room_id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO cat (name, breed, color, hair, age, weight, room) VALUES
	('Little Bone', 'Dragon-li','tabby', 'short', 3, 6, 1),
	('Yuki', 'Domestic', 'white', 'short', 10, 10, 1);
	

