DROP TABLE IF EXISTS room;
CREATE TABLE room (
	room_id int(5) NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	area int(5) NULL,
	PRIMARY KEY (room_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO room (name, area) VALUES
	('Large', 1200),
	('Medium', 700),
	('Small', 300);

DROP TABLE IF EXISTS cat;
CREATE TABLE cat (
	cat_id int(5) NOT NULL AUTO_INCREMENT,
	name varchar(255) DEFAULT NOT NULL,
	area int(5) DEFAULT NULL,
	PRIMARY KEY (room_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO room (name, area) VALUES
	('Large', 1200),
	('Medium', 700),
	('Small', 300);

