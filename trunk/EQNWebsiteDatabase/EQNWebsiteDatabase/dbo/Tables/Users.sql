CREATE TABLE [dbo].[Users] (
    [UserId]   INT            IDENTITY (1, 1) NOT NULL,
    [UserName] NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([UserId] ASC)
);

