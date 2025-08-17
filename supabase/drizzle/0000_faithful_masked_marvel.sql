CREATE TABLE "account_overview_report" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"month" integer,
	"year" integer,
	"issue_type" varchar(20),
	"total_balance" real,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "accounts" (
	"account_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"account_type_id" uuid,
	"balance" numeric(15, 2) DEFAULT '0.00',
	"status" varchar(20) DEFAULT 'active',
	"opened_at" timestamp with time zone DEFAULT now(),
	"closed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "accounts_type" (
	"type_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" text,
	"minimum_balance" numeric(12, 2) DEFAULT '0',
	"interest_rate" numeric(5, 2) DEFAULT '0.00',
	"monthly_fee" numeric(6, 2) DEFAULT '0.00',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "card_transactions" (
	"transaction_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"card_id" uuid NOT NULL,
	"account_id" uuid NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"currency" varchar(3) NOT NULL,
	"merchant" varchar(100) NOT NULL,
	"location" varchar(100),
	"category" varchar(50),
	"transaction_type" varchar(20) NOT NULL,
	"status" varchar(20) NOT NULL,
	"reference_id" varchar(50) NOT NULL,
	"raw_payload" jsonb,
	"authorized_at" timestamp with time zone,
	"executed_at" timestamp with time zone NOT NULL,
	"settled_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "card_transactions_reference_id_unique" UNIQUE("reference_id")
);
--> statement-breakpoint
CREATE TABLE "cards" (
	"card_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"card_number" varchar(20) NOT NULL,
	"card_type" varchar(20) NOT NULL,
	"card_status" varchar(20) NOT NULL,
	"user_id" uuid NOT NULL,
	"account_id" uuid NOT NULL,
	"limit_amount" numeric(12, 2),
	"daily_limit" numeric(12, 2),
	"billing_cycle_day" varchar(2),
	"card_network" varchar(20) NOT NULL,
	"expiration_date" timestamp with time zone,
	"activated_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "cards_card_number_unique" UNIQUE("card_number")
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"street_name" varchar(500) NOT NULL,
	"postcode" varchar(10) NOT NULL,
	"city" varchar(255),
	"province" varchar(255),
	"country" varchar(255),
	"is_valid" boolean,
	"is_primary" boolean,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "payee_accounts_holders" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"method_type" varchar NOT NULL,
	"payee_name" varchar(255),
	"interact_method" varchar(10),
	"account_number" varchar(255),
	"is_valid" boolean,
	"is_primary" boolean,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "transaction_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"payee_account_id" integer,
	"amount" real,
	"payDate" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"transaction_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"amount" numeric(15, 2) NOT NULL,
	"transaction_type" varchar(20) NOT NULL,
	"referece_id" uuid,
	"description" text,
	"running_balance" numeric(15, 2),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"contact_type" varchar(10),
	"contact" varchar(255),
	"country_code" varchar(5),
	"is_valid" boolean,
	"is_primary" boolean,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"image_url" varchar(255),
	"is_primary" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_role_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "user_role_types_role_unique" UNIQUE("role")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(5),
	"first_name" varchar(255),
	"last_name" varchar(255),
	"role_type_id" integer,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "account_overview_report" ADD CONSTRAINT "account_overview_report_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_account_type_id_accounts_type_type_id_fk" FOREIGN KEY ("account_type_id") REFERENCES "public"."accounts_type"("type_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "card_transactions" ADD CONSTRAINT "card_transactions_card_id_cards_card_id_fk" FOREIGN KEY ("card_id") REFERENCES "public"."cards"("card_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "card_transactions" ADD CONSTRAINT "card_transactions_account_id_accounts_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("account_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cards" ADD CONSTRAINT "cards_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cards" ADD CONSTRAINT "cards_account_id_accounts_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("account_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payee_accounts_holders" ADD CONSTRAINT "payee_accounts_holders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction_history" ADD CONSTRAINT "transaction_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction_history" ADD CONSTRAINT "transaction_history_payee_account_id_payee_accounts_holders_id_fk" FOREIGN KEY ("payee_account_id") REFERENCES "public"."payee_accounts_holders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_id_accounts_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("account_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_contacts" ADD CONSTRAINT "user_contacts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_images" ADD CONSTRAINT "user_images_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_role_type_id_user_role_types_id_fk" FOREIGN KEY ("role_type_id") REFERENCES "public"."user_role_types"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "month_index" ON "account_overview_report" USING btree ("month");--> statement-breakpoint
CREATE INDEX "year_index" ON "account_overview_report" USING btree ("year");--> statement-breakpoint
CREATE INDEX "issue_type_index" ON "account_overview_report" USING btree ("issue_type");--> statement-breakpoint
CREATE INDEX "idx_street_address" ON "locations" USING btree ("street_name");--> statement-breakpoint
CREATE INDEX "idx_postcode" ON "locations" USING btree ("postcode");--> statement-breakpoint
CREATE INDEX "idx_city" ON "locations" USING btree ("city");--> statement-breakpoint
CREATE INDEX "idx_province" ON "locations" USING btree ("province");--> statement-breakpoint
CREATE INDEX "idx_country" ON "locations" USING btree ("country");--> statement-breakpoint
CREATE INDEX "payee_name_index" ON "payee_accounts_holders" USING btree ("payee_name");--> statement-breakpoint
CREATE UNIQUE INDEX "account_number_index" ON "payee_accounts_holders" USING btree ("account_number");--> statement-breakpoint
CREATE INDEX "idx_transactions_account_created" ON "transactions" USING btree ("account_id","created_at");--> statement-breakpoint
CREATE INDEX "contact_index" ON "user_contacts" USING btree ("contact");--> statement-breakpoint
CREATE INDEX "idx_first_name" ON "users" USING btree ("first_name");--> statement-breakpoint
CREATE INDEX "idx_last_name" ON "users" USING btree ("last_name");