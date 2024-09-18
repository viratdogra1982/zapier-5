-- CreateTable
CREATE TABLE "ZapRunOutbOx" (
    "id" TEXT NOT NULL,
    "zapRunId" TEXT NOT NULL,

    CONSTRAINT "ZapRunOutbOx_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ZapRunOutbOx_zapRunId_key" ON "ZapRunOutbOx"("zapRunId");

-- AddForeignKey
ALTER TABLE "ZapRunOutbOx" ADD CONSTRAINT "ZapRunOutbOx_zapRunId_fkey" FOREIGN KEY ("zapRunId") REFERENCES "ZapRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
