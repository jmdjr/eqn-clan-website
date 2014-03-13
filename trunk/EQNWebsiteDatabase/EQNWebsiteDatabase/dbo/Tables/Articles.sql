CREATE TABLE [dbo].[Articles] (
    [ArticleId]     INT            IDENTITY (1, 1) NOT NULL,
    [ArticleText]   NVARCHAR (MAX) NOT NULL,
    [UserId]        INT            NOT NULL,
    [CreatedDate]   DATETIME       NOT NULL,
    [PublishedDate] DATETIME       NOT NULL,
    CONSTRAINT [PK_Articles] PRIMARY KEY CLUSTERED ([ArticleId] ASC)
);

