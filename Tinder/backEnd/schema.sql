CREATE TABLE [user]  (
    "PersonID" INT IDENTITY(1,1) PRIMARY KEY,
    "FullName" VARCHAR(20),
    "Password" INT,
    "ProfileImage" TEXT
);
CREATE TABLE [activities] (
    "ActivitiesID" INT IDENTITY(1,1) PRIMARY KEY,
    "Activity" VARCHAR(100),
    "ActivityDate" DATE,
    "ActivityLocation" VARCHAR(20),
    "ResponsiblePersonID" INT,
    FOREIGN KEY ("ResponsiblePersonID") REFERENCES Persons("PersonID")
);
  CREATE TABLE [activity_registration] (
    "ID" INT IDENTITY(1,1) PRIMARY KEY,
    "IDUser" INT,
    "ActiveID" INT,
    "ResponsibleUserID" INT,
    Status TINYINT(1),
    FOREIGN KEY (IDUser) REFERENCES [user] (PersonID),
    FOREIGN KEY (ActiveID) REFERENCES activities(ActivitiesID),
    FOREIGN KEY (ResponsibleUserID) REFERENCES activities(ResponsiblePersonID)
);  
CREATE TABLE [friends] (
  "ID" INT IDENTITY(1,1),
  "UserID" INT,
  "FriendID" INT,
  FOREIGN KEY (UserID) REFERENCES [user](PersonID),
  FOREIGN KEY (FriendID) REFERENCES [user](PersonID),
  PRIMARY KEY (ID)
);