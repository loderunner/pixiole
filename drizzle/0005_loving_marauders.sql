CREATE TABLE `images` (
	`id` text PRIMARY KEY NOT NULL,
	`chat_id` text NOT NULL,
	`name` text NOT NULL,
	`prompt` text NOT NULL,
	`size` text NOT NULL,
	`status` text NOT NULL,
	`image_url` text,
	`error_message` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`chat_id`) REFERENCES `chats`(`id`) ON UPDATE no action ON DELETE cascade
);
