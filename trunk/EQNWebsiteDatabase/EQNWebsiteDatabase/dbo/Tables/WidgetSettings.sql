CREATE TABLE [dbo].[WidgetSettings] (
    [WidgetSettingId] INT            IDENTITY (1, 1) NOT NULL,
    [UserWidgetId]    INT            NOT NULL,
    [SettingName]     NVARCHAR (MAX) NOT NULL,
    [SettingValue]    NVARCHAR (MAX) NOT NULL,
    CONSTRAINT [PK_WidgetSettings] PRIMARY KEY CLUSTERED ([WidgetSettingId] ASC),
    CONSTRAINT [FK_WidgetSettingUserWidget] FOREIGN KEY ([UserWidgetId]) REFERENCES [dbo].[UserWidgets] ([UserWidgetId])
);


GO
CREATE NONCLUSTERED INDEX [IX_FK_WidgetSettingUserWidget]
    ON [dbo].[WidgetSettings]([UserWidgetId] ASC);

