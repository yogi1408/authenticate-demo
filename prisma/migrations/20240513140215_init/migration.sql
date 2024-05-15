-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "is_spam" BOOLEAN NOT NULL DEFAULT false,
    "spam_count" INTEGER NOT NULL DEFAULT 0,
    "user_link" INTEGER,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "FK__user" FOREIGN KEY ("user_link") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

--InsertDummyRecord
-- Insert dummy records into the contact table
INSERT INTO contact (name, phone, email, is_spam, spam_count, user_link)
VALUES
('John Doe', '1234567890', 'john@example.com', false, 0, null),
('Alice Smith', '9876543210', 'alice@example.com', false, 0, null),
('Bob Johnson', '5551234567', null, false, 0, null),
('Emily Brown', '9998887776', 'emily@example.com', false, 0, null),
('Michael Davis', '4445556667', null, false, 0, null),
('Sarah Wilson', '1112223334', 'sarah@example.com', false, 0, null),
('David Martinez', '7778889991', null, false, 0, null),
('Jennifer Taylor', '2223334445', 'jennifer@example.com', false, 0, null),
('James Anderson', '6667778882', null, false, 0, null),
('Linda Thomas', '3334445553', 'linda@example.com', false, 0, null),
('William White', '8889990000', null, false, 0, null),
('Jessica Lee', '4445556667', 'jessica@example.com', false, 0, null),
('Christopher Harris', '1112223334', null, false, 0, null),
('Amanda Clark', '2223334445', 'amanda@example.com', false, 0, null),
('Matthew Lewis', '5556667778', null, false, 0, null);
