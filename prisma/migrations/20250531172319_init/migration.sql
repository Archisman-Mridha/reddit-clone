-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('UP', 'DOWN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "clerkID" TEXT NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "name" VARCHAR(30),
    "bio" VARCHAR(300),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubReddit" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "description" VARCHAR(300),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubReddit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "ownerID" INTEGER NOT NULL,
    "subRedditID" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "edited" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "ownerID" INTEGER NOT NULL,
    "postID" INTEGER,
    "commentID" INTEGER,
    "type" "VoteType" NOT NULL,
    "postId" INTEGER,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "postID" INTEGER NOT NULL,
    "ownerID" INTEGER NOT NULL,
    "comment" VARCHAR(100) NOT NULL,
    "edited" BOOLEAN NOT NULL DEFAULT false,
    "score" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SubRedditToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SubRedditToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkID_key" ON "User"("clerkID");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "SubReddit_name_key" ON "SubReddit"("name");

-- CreateIndex
CREATE INDEX "SubReddit_name_idx" ON "SubReddit"("name");

-- CreateIndex
CREATE INDEX "Post_ownerID_createdAt_idx" ON "Post"("ownerID", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "Vote_ownerID_idx" ON "Vote"("ownerID");

-- CreateIndex
CREATE INDEX "Vote_postID_idx" ON "Vote"("postID");

-- CreateIndex
CREATE INDEX "Vote_commentID_idx" ON "Vote"("commentID");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_ownerID_postID_key" ON "Vote"("ownerID", "postID");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_ownerID_commentID_key" ON "Vote"("ownerID", "commentID");

-- CreateIndex
CREATE INDEX "Comment_postID_score_idx" ON "Comment"("postID", "score" DESC);

-- CreateIndex
CREATE INDEX "_SubRedditToUser_B_index" ON "_SubRedditToUser"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_ownerID_fkey" FOREIGN KEY ("ownerID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_subRedditID_fkey" FOREIGN KEY ("subRedditID") REFERENCES "SubReddit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_commentID_fkey" FOREIGN KEY ("commentID") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_ownerID_fkey" FOREIGN KEY ("ownerID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubRedditToUser" ADD CONSTRAINT "_SubRedditToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "SubReddit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubRedditToUser" ADD CONSTRAINT "_SubRedditToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
