-- Indexes for primary keys have been explicitly created.

DROP TABLE SeasonTeam;
DROP TABLE User;
DROP TABLE Season;
DROP TABLE PlayerLesion;
DROP TABLE Note;
DROP TABLE Player;
DROP TABLE Lesion;
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

CREATE TABLE Player (
    id BIGINT NOT NULL AUTO_INCREMENT,
    playerName VARCHAR(60) COLLATE latin1_bin NOT NULL,
    primaryLastName VARCHAR(60) COLLATE latin1_bin NOT NULL,
    secondLastName VARCHAR(60) COLLATE latin1_bin NOT NULL,
    position    ENUM('PointGuard','ShootingGuard', 'SmallForward', 'PowerForward', 'Center') NOT NULL,
    trends VARCHAR(60) NOT NULL,
    tutorPhoneNumber VARCHAR(60) NOT NULL, 
    email VARCHAR(60) NOT NULL,
    dni VARCHAR(60) NOT NULL,
    teamId BIGINT,
    CONSTRAINT PlayerTeamIdFK FOREIGN KEY(teamId)
        REFERENCES Team (id),
    CONSTRAINT PlayerPK PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE Note (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(60) COLLATE latin1_bin NOT NULL,
    description VARCHAR(200) NOT NULL,
    noteDate DATE NOT NULL,
    playerId BIGINT,
    CONSTRAINT PlayerPlayerIdFK FOREIGN KEY(playerId)
        REFERENCES Player (id),
    CONSTRAINT NotePK PRIMARY KEY (id),
    CONSTRAINT TitleUniqueKey UNIQUE (title)
) ENGINE = InnoDB;

CREATE TABLE Lesion (
    id BIGINT NOT NULL AUTO_INCREMENT,
    lesionName VARCHAR(60) COLLATE latin1_bin NOT NULL,
    description VARCHAR(200) NOT NULL,
    medication VARCHAR(200) NOT NULL,
    lesionType    ENUM('PointGuard','ShootingGuard', 'SmallForward', 'PowerForward', 'Center') NOT NULL,
    CONSTRAINT LesionPK PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE PlayerLesion (
    id BIGINT NOT NULL AUTO_INCREMENT,   
    playerId BIGINT,
    lesionId BIGINT,
    CONSTRAINT PlayerLesionPK PRIMARY KEY (id),
    CONSTRAINT PlayerLesionPlayerIdFK FOREIGN KEY(playerId)
        REFERENCES Player (id),    
    CONSTRAINT PlayerLesionLesionIdFK FOREIGN KEY(lesionId)
        REFERENCES Lesion (id)
) ENGINE = InnoDB;