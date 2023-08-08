CREATE PROCEDURE [dbo].[AddDemos]
    @first_name VARCHAR(10),
    @last_name VARCHAR(10)
AS
BEGIN
    BEGIN TRY
        INSERT INTO milan (first_name, last_name)
        VALUES (@first_name, @last_name);
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END