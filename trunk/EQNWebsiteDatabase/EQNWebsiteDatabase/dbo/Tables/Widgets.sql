CREATE TABLE [dbo].[Widgets] (
    [WidgetId]               INT      IDENTITY (1, 1) NOT NULL,
    [WidgetTypeId]           INT      NOT NULL,
    [DateCreated]            DATETIME NOT NULL,
    [WidgetTypeWidgetTypeId] INT      NOT NULL,
    CONSTRAINT [PK_Widgets] PRIMARY KEY CLUSTERED ([WidgetId] ASC),
    CONSTRAINT [FK_WidgetTypeWidget] FOREIGN KEY ([WidgetTypeId]) REFERENCES [dbo].[WidgetTypes] ([WidgetTypeId])
);


GO
CREATE NONCLUSTERED INDEX [IX_FK_WidgetTypeWidget]
    ON [dbo].[Widgets]([WidgetTypeId] ASC);

