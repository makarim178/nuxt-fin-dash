ALTER TABLE `transactionHistory` RENAME COLUMN "id" TO "transaction_id";--> statement-breakpoint
CREATE TABLE `accountType` (
	`account_type_id` integer PRIMARY KEY NOT NULL,
	`account_type` text
);
--> statement-breakpoint
CREATE TABLE `accounts` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`account_type_id` integer NOT NULL,
	`account_number` text,
	`cvv` text,
	`expiry` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`account_type_id`) REFERENCES `accountType`(`account_type_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `cities` (
	`id` integer PRIMARY KEY NOT NULL,
	`city` text,
	`province_id` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`province_id`) REFERENCES `provinces`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `contactNumbers` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`countryCode` text,
	`type` text,
	`number` text,
	`is_valid` integer,
	`is_primary` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `countries` (
	`id` integer PRIMARY KEY NOT NULL,
	`code` text,
	`country` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `emails` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`email` text,
	`is_valid` integer,
	`is_primary` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `locations` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`street_number` text,
	`street_name` text,
	`city_id` integer,
	`is_valid` integer,
	`is_primary` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `provinces` (
	`id` integer PRIMARY KEY NOT NULL,
	`province` text,
	`country_id` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `roleTypes` (
	`id` integer PRIMARY KEY NOT NULL,
	`type` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `userLogin` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`uuid` text,
	`password` text,
	`salt` text,
	`md5` text,
	`sha1` text,
	`sha256` text,
	`valid_until_in_mins` integer,
	`is_valid` integer,
	`is_primary` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`first_name` text,
	`last_name` text,
	`dob` text,
	`role_id` integer NOT NULL,
	`contact_id` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`role_id`) REFERENCES `roleTypes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `userBankAccounts`;--> statement-breakpoint
ALTER TABLE `transactionHistory` ADD `user_id` integer;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_accountHistory` (
	`id` integer PRIMARY KEY NOT NULL,
	`month` integer,
	`year` integer,
	`total_balance` real,
	`total_debt` real,
	`total_credit` real,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
INSERT INTO `__new_accountHistory`("id", "month", "year", "total_balance", "total_debt", "total_credit", "updated_at") SELECT "id", "month", "year", "total_balance", "total_debt", "total_credit", "updated_at" FROM `accountHistory`;--> statement-breakpoint
DROP TABLE `accountHistory`;--> statement-breakpoint
ALTER TABLE `__new_accountHistory` RENAME TO `accountHistory`;--> statement-breakpoint
PRAGMA foreign_keys=ON;