CREATE TABLE `applications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`company` text NOT NULL,
	`position` text NOT NULL,
	`status` text NOT NULL,
	`location` text,
	`job_url` text,
	`applied_date` text NOT NULL,
	`notes` text
);
