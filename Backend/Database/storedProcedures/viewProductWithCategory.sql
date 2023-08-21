CREATE OR ALTER PROCEDURE viewProductWithCategory(@productCategory VARCHAR(50))
AS 
BEGIN 
SELECT * FROM productTable 
WHERE productCategory=@productCategory
END;