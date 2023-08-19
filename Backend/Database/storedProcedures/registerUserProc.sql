CREATE OR ALTER PROCEDURE registerUserProc(@userId VARCHAR(100),@userName VARCHAR(100),@userPhone VARCHAR,@userEmail VARCHAR(100),@userPassword VARCHAR(MAX))
AS 
BEGIN 
INSERT INTO
    userTable(userId, userName, userEmail, userPhone, userPassword)
VALUES
    (@userId,@userName,@userEmail,@userPhone,@userPassword)
END;