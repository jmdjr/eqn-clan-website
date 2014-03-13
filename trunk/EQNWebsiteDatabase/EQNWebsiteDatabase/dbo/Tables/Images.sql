CREATE TABLE [dbo].[Images] (
    [ImageId]       INT             IDENTITY (1, 1) NOT NULL,
    [ImageName]     NVARCHAR (MAX)  NOT NULL,
    [ImageLocation] NVARCHAR (MAX)  NOT NULL,
    [Binary]        VARBINARY (MAX) NOT NULL,
    [UserId]        INT             NOT NULL,
    CONSTRAINT [PK_Images] PRIMARY KEY CLUSTERED ([ImageId] ASC),
    CONSTRAINT [FK_ImageUser] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([UserId])
);


GO
CREATE NONCLUSTERED INDEX [IX_FK_ImageUser]
    ON [dbo].[Images]([UserId] ASC);

