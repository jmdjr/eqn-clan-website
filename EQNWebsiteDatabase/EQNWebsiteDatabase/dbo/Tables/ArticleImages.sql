CREATE TABLE [dbo].[ArticleImages] (
    [ArticleImageId] INT IDENTITY (1, 1) NOT NULL,
    [ArticleId]      INT NOT NULL,
    [ImageId]        INT NOT NULL,
    CONSTRAINT [PK_ArticleImages] PRIMARY KEY CLUSTERED ([ArticleImageId] ASC),
    CONSTRAINT [FK_ArticleArticleImage] FOREIGN KEY ([ArticleId]) REFERENCES [dbo].[Articles] ([ArticleId]),
    CONSTRAINT [FK_ImageArticleImage] FOREIGN KEY ([ImageId]) REFERENCES [dbo].[Images] ([ImageId])
);


GO
CREATE NONCLUSTERED INDEX [IX_FK_ImageArticleImage]
    ON [dbo].[ArticleImages]([ImageId] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_FK_ArticleArticleImage]
    ON [dbo].[ArticleImages]([ArticleId] ASC);

