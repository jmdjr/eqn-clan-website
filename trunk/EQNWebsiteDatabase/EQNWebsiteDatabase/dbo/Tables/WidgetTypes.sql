CREATE TABLE [dbo].[WidgetTypes] (
    [WidgetTypeId]      INT            IDENTITY (1, 1) NOT NULL,
    [WidgetTypeName]    NVARCHAR (MAX) NOT NULL,
    [WidgetTooltip]     NVARCHAR (MAX) NOT NULL,
    [WidgetDescription] NVARCHAR (MAX) NOT NULL,
    CONSTRAINT [PK_WidgetTypes] PRIMARY KEY CLUSTERED ([WidgetTypeId] ASC)
);

