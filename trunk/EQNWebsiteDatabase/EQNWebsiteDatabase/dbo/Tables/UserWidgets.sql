CREATE TABLE [dbo].[UserWidgets] (
    [UserWidgetId] INT IDENTITY (1, 1) NOT NULL,
    [UserId]       INT NOT NULL,
    [WidgetId]     INT NOT NULL,
    CONSTRAINT [PK_UserWidgets] PRIMARY KEY CLUSTERED ([UserWidgetId] ASC),
    CONSTRAINT [FK_UserWidgetUser] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([UserId]),
    CONSTRAINT [FK_WidgetUserWidget] FOREIGN KEY ([WidgetId]) REFERENCES [dbo].[Widgets] ([WidgetId])
);


GO
CREATE NONCLUSTERED INDEX [IX_FK_UserWidgetUser]
    ON [dbo].[UserWidgets]([UserId] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_FK_WidgetUserWidget]
    ON [dbo].[UserWidgets]([WidgetId] ASC);

