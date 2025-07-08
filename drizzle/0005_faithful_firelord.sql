CREATE TABLE `transactionHistory` (
	`id` integer PRIMARY KEY NOT NULL,
	`fromAccountId` integer,
	`toAccountId` integer,
	`total_amount` real,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
