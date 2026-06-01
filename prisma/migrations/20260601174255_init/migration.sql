-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'AUDITOR',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Framework" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Control" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "frameworkId" TEXT NOT NULL,
    "parentId" TEXT,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    CONSTRAINT "Control_frameworkId_fkey" FOREIGN KEY ("frameworkId") REFERENCES "Framework" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Control_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Control" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Audit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "frameworkId" TEXT NOT NULL,
    "auditorId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'IN_PROGRESS',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Audit_frameworkId_fkey" FOREIGN KEY ("frameworkId") REFERENCES "Framework" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Audit_auditorId_fkey" FOREIGN KEY ("auditorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuditEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "auditId" TEXT NOT NULL,
    "controlId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NOT_STARTED',
    "comments" TEXT,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AuditEntry_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "Audit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AuditEntry_controlId_fkey" FOREIGN KEY ("controlId") REFERENCES "Control" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Evidence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "auditEntryId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Evidence_auditEntryId_fkey" FOREIGN KEY ("auditEntryId") REFERENCES "AuditEntry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AuditEntry_auditId_controlId_key" ON "AuditEntry"("auditId", "controlId");
