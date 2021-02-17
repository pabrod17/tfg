-- ----------------------------------------------------------------------------
-- Put here INSERT statements for inserting data required by the application
-- in the "pa-project" database.
-------------------------------------------------------------------------------
INSERT INTO Season (startDate, endDate, Calendario) VALUES ('2012-01-01', '2014-01-01', 'Calendario1');
INSERT INTO Season (startDate, endDate, Calendario) VALUES ('2015-01-01', '2017-01-01', 'Calendario2');
INSERT INTO Season (startDate, endDate, Calendario) VALUES ('2018-01-01', '2020-01-01', 'Calendario3');

INSERT INTO Team (teamName) VALUES ('PRIMERO');
INSERT INTO Team (teamName) VALUES ('SEGUNDO');
INSERT INTO Team (teamName) VALUES ('TERCERO');
INSERT INTO Team (teamName) VALUES ('CUARTO');
INSERT INTO Team (teamName) VALUES ('QUINTO');
INSERT INTO Team (teamName) VALUES ('SEXTO');

INSERT INTO User(userName, password, firstName, lastName, email, role)
    VALUES ('pablo', 'pablo', 'pablo', 'pablo', 'pablo@gmail.com', 5);