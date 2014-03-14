-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[AddNewUser]
	-- Add the parameters for the stored procedure here
	@UserName nvarchar(125)
AS
BEGIN
	DECLARE @returnVal INT
	SET @returnVal = 0

	IF (EXISTS(SELECT * FROM Users u
	WHERE u.UserName like @UserName))
	BEGIN
		SET @returnVal = -10
	END
	ELSE
	BEGIN
		BEGIN TRAN
			INSERT INTO dbo.Users
			(
				UserName
			)
			SELECT 
				@UserName
		COMMIT TRAN
	END

	RETURN @returnVal
END