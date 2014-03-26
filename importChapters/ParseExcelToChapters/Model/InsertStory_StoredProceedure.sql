-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE dbo.InsertStory
			@StoryName nvarchar(Max)
			, @StoryPrice decimal(18,0)
AS
BEGIN
DECLARE @RET int
	IF (EXISTS(SELECT 1 FROM dbo.Story s WHERE s.StoryName = @StoryName))
	BEGIN
		SET @RET = -10
	END
	ELSE
	BEGIN
		INSERT INTO dbo.Story (
			StoryName
			, Price
		)
		VALUES (
			@StoryPrice
			, @StoryName
		)

		SET @RET = 0
	END

	SELECT @RET
END
GO