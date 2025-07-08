CREATE TABLE `accountHistory` (
	`id` integer PRIMARY KEY NOT NULL,
	`month` text,
	`year` text,
	`total_balance` real,
	`total_debt` real,
	`total_credit` real,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
