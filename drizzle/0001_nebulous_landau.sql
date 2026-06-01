PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_applications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`company` text NOT NULL,
	`role` text NOT NULL,
	`status` text DEFAULT 'applied' NOT NULL,
	`applied_at` text NOT NULL,
	`url` text,
	`notes` text
);
--> statement-breakpoint
INSERT INTO `__new_applications`("id", "company", "role", "status", "applied_at", "url", "notes") SELECT "id", "company", "role", "status", "applied_at", "url", "notes" FROM `applications`;--> statement-breakpoint
DROP TABLE `applications`;--> statement-breakpoint
ALTER TABLE `__new_applications` RENAME TO `applications`;--> statement-breakpoint
PRAGMA foreign_keys=ON;