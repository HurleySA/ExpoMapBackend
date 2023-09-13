-- CreateTable
CREATE TABLE "EventSolicitation" (
    "id" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "typeEntrance" "EventType" NOT NULL,
    "emailAdmin" TEXT NOT NULL,
    "phoneAdmin" TEXT NOT NULL,
    "detailsEvent" TEXT NOT NULL,

    CONSTRAINT "EventSolicitation_pkey" PRIMARY KEY ("id")
);
