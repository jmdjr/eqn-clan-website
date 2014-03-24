
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, and Azure
-- --------------------------------------------------
-- Date Created: 03/18/2014 22:55:55
-- Generated from EDMX file: C:\Users\null\Documents\Visual Studio 2012\Projects\importChapters\importChapters\Model\StoryBuilds.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [StoryBuilds];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------


-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Users'
CREATE TABLE [dbo].[Users] (
    [UserId] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'UserChapters'
CREATE TABLE [dbo].[UserChapters] (
    [UserChapterId] int IDENTITY(1,1) NOT NULL,
    [UserId] int  NOT NULL,
    [ChapterId] int  NOT NULL
);
GO

-- Creating table 'Chapters'
CREATE TABLE [dbo].[Chapters] (
    [ChapterId] int IDENTITY(1,1) NOT NULL,
    [StoryId] int  NOT NULL,
    [Price] decimal(18,0)  NOT NULL,
    [FirstPageId] int  NOT NULL
);
GO

-- Creating table 'Stories'
CREATE TABLE [dbo].[Stories] (
    [StoryId] int IDENTITY(1,1) NOT NULL,
    [StoryName] nvarchar(max)  NOT NULL,
    [Price] decimal(18,0)  NOT NULL
);
GO

-- Creating table 'Pages'
CREATE TABLE [dbo].[Pages] (
    [PageId] int IDENTITY(1,1) NOT NULL,
    [ChapterId] int  NOT NULL,
    [DisplayText] nvarchar(max)  NOT NULL,
    [PageType] int  NOT NULL,
    [BackgroundImage] nvarchar(max)  NULL,
    [CharacterImage] nvarchar(max)  NULL,
    [IsImportantOption] bit  NOT NULL
);
GO

-- Creating table 'Choices'
CREATE TABLE [dbo].[Choices] (
    [ChoiceId] int IDENTITY(1,1) NOT NULL,
    [DisplayText] nvarchar(max)  NOT NULL,
    [TargetPageId] int  NOT NULL,
    [SourcePageId] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [UserId] in table 'Users'
ALTER TABLE [dbo].[Users]
ADD CONSTRAINT [PK_Users]
    PRIMARY KEY CLUSTERED ([UserId] ASC);
GO

-- Creating primary key on [UserChapterId] in table 'UserChapters'
ALTER TABLE [dbo].[UserChapters]
ADD CONSTRAINT [PK_UserChapters]
    PRIMARY KEY CLUSTERED ([UserChapterId] ASC);
GO

-- Creating primary key on [ChapterId] in table 'Chapters'
ALTER TABLE [dbo].[Chapters]
ADD CONSTRAINT [PK_Chapters]
    PRIMARY KEY CLUSTERED ([ChapterId] ASC);
GO

-- Creating primary key on [StoryId] in table 'Stories'
ALTER TABLE [dbo].[Stories]
ADD CONSTRAINT [PK_Stories]
    PRIMARY KEY CLUSTERED ([StoryId] ASC);
GO

-- Creating primary key on [PageId] in table 'Pages'
ALTER TABLE [dbo].[Pages]
ADD CONSTRAINT [PK_Pages]
    PRIMARY KEY CLUSTERED ([PageId] ASC);
GO

-- Creating primary key on [ChoiceId] in table 'Choices'
ALTER TABLE [dbo].[Choices]
ADD CONSTRAINT [PK_Choices]
    PRIMARY KEY CLUSTERED ([ChoiceId] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [ChapterId] in table 'Pages'
ALTER TABLE [dbo].[Pages]
ADD CONSTRAINT [FK_PageChapter]
    FOREIGN KEY ([ChapterId])
    REFERENCES [dbo].[Chapters]
        ([ChapterId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_PageChapter'
CREATE INDEX [IX_FK_PageChapter]
ON [dbo].[Pages]
    ([ChapterId]);
GO

-- Creating foreign key on [FirstPageId] in table 'Chapters'
ALTER TABLE [dbo].[Chapters]
ADD CONSTRAINT [FK_ChapterFirstPage]
    FOREIGN KEY ([FirstPageId])
    REFERENCES [dbo].[Pages]
        ([PageId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_ChapterFirstPage'
CREATE INDEX [IX_FK_ChapterFirstPage]
ON [dbo].[Chapters]
    ([FirstPageId]);
GO

-- Creating foreign key on [UserId] in table 'UserChapters'
ALTER TABLE [dbo].[UserChapters]
ADD CONSTRAINT [FK_UserUserChapter]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[Users]
        ([UserId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_UserUserChapter'
CREATE INDEX [IX_FK_UserUserChapter]
ON [dbo].[UserChapters]
    ([UserId]);
GO

-- Creating foreign key on [ChapterId] in table 'UserChapters'
ALTER TABLE [dbo].[UserChapters]
ADD CONSTRAINT [FK_UserChapterChapter]
    FOREIGN KEY ([ChapterId])
    REFERENCES [dbo].[Chapters]
        ([ChapterId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_UserChapterChapter'
CREATE INDEX [IX_FK_UserChapterChapter]
ON [dbo].[UserChapters]
    ([ChapterId]);
GO

-- Creating foreign key on [StoryId] in table 'Chapters'
ALTER TABLE [dbo].[Chapters]
ADD CONSTRAINT [FK_StoryChapter]
    FOREIGN KEY ([StoryId])
    REFERENCES [dbo].[Stories]
        ([StoryId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_StoryChapter'
CREATE INDEX [IX_FK_StoryChapter]
ON [dbo].[Chapters]
    ([StoryId]);
GO

-- Creating foreign key on [TargetPageId] in table 'Choices'
ALTER TABLE [dbo].[Choices]
ADD CONSTRAINT [FK_PageChoice]
    FOREIGN KEY ([TargetPageId])
    REFERENCES [dbo].[Pages]
        ([PageId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_PageChoice'
CREATE INDEX [IX_FK_PageChoice]
ON [dbo].[Choices]
    ([TargetPageId]);
GO

-- Creating foreign key on [SourcePageId] in table 'Choices'
ALTER TABLE [dbo].[Choices]
ADD CONSTRAINT [FK_PageChoice1]
    FOREIGN KEY ([SourcePageId])
    REFERENCES [dbo].[Pages]
        ([PageId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_PageChoice1'
CREATE INDEX [IX_FK_PageChoice1]
ON [dbo].[Choices]
    ([SourcePageId]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------