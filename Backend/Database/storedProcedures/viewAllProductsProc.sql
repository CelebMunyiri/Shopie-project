CREATE OR ALTER PROCEDURE viewAllProductsProc
AS 
BEGIN 
SELECT productName,productDescription,productImg,productCost,earlyCost,productCategory,productClassification,productId FROM productTable 
END;

 
