CREATE OR ALTER PROCEDURE registerUserProc(@userId VARCHAR(MAX),@userName VARCHAR(100),@userPhone INT,@userEmail VARCHAR(100),@userPassword VARCHAR(MAX))
AS 
BEGIN 
INSERT INTO
    userTable(userId, userName, userEmail, userPhone, userPassword)
VALUES
    (
        @userId,
        @userName,
        @userEmail,
        @userPhone,
        @userPassword
    )
END;