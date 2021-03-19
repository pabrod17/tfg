-- Indexes for primary keys have been explicitly created.

DROP TABLE SeasonTeam;
DROP TABLE User;
DROP TABLE Season;
DROP TABLE Team;


CREATE TABLE User (
    id BIGINT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(60) COLLATE latin1_bin NOT NULL,
    password VARCHAR(60) NOT NULL, 
    firstName VARCHAR(60) NOT NULL,
    lastName VARCHAR(60) NOT NULL, 
    email VARCHAR(60) NOT NULL,
    role TINYINT NOT NULL,
    CONSTRAINT UserPK PRIMARY KEY (id),
    CONSTRAINT UserNameUniqueKey UNIQUE (userName)
) ENGINE = InnoDB;

CREATE INDEX UserIndexByUserName ON User (userName);

CREATE TABLE Season (
    id BIGINT NOT NULL AUTO_INCREMENT,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL, 
    Calendario VARCHAR(60) NOT NULL,
    CONSTRAINT SeasonPK PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE INDEX UserIndexByStartDate ON Season (startDate);

CREATE TABLE Team (
    id BIGINT NOT NULL AUTO_INCREMENT,
    teamName VARCHAR(60) COLLATE latin1_bin NOT NULL,
    CONSTRAINT TeamPK PRIMARY KEY (id),
    CONSTRAINT TeamNameUniqueKey UNIQUE (teamName)
) ENGINE = InnoDB;

CREATE INDEX TeamIndexByTeamName ON Team (teamName);

CREATE TABLE SeasonTeam (
    id BIGINT NOT NULL AUTO_INCREMENT,    
    seasonId BIGINT,
    teamId BIGINT,
    userId BIGINT,    
    CONSTRAINT SeasonTeamPK PRIMARY KEY (id),
    CONSTRAINT SeasonTeamUserIdFK FOREIGN KEY(userId)
        REFERENCES User (id),    
    CONSTRAINT SeasonTeamSeasonIdFK FOREIGN KEY(seasonId)
        REFERENCES Season (id),
    CONSTRAINT SeasonTeamTeamIdFK FOREIGN KEY(teamId)
        REFERENCES Team (id)
) ENGINE = InnoDB;