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
CREATE TABLE "accountOverviewReport" (
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
CREATE TABLE "accountsType" (
	"type_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" text,
	"minimum_balance" numeric(12, 2) DEFAULT '0',
	"interest_rate" numeric(5, 2) DEFAULT '0.00',
	"monthly_fee" numeric(6, 2) DEFAULT '0.00',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "accountsType_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "cards" (
	"card_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"account_id" uuid NOT NULL,
	"card_number" varchar(16) NOT NULL,
	"card_type" varchar(20) NOT NULL,
	"expiry_date" timestamp NOT NULL,
	"cvv" varchar(4) NOT NULL,
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"issued_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "cards_card_number_unique" UNIQUE("card_number")
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"street_number" varchar(6) NOT NULL,
	"street_name" varchar(500) NOT NULL,
	"postcode" varchar(6) NOT NULL,
	"city" varchar(255),
	"province" varchar(255),
	"country" varchar(255),
	"is_valid" boolean,
	"is_primary" boolean,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "payeeAccountsHolders" (
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
CREATE TABLE "transactionHistory" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"payee_account_id" integer,
	"amount" real,
	"payDate" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "userContacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"contact_type" varchar(10),
	"contact" varchar(255),
	"country_code" varchar(5),
	"is_valid" boolean,
	"is_primary" boolean,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "userContacts_contact_unique" UNIQUE("contact")
);
--> statement-breakpoint
CREATE TABLE "userImages" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"image_url" varchar(255),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "userRoleTypes" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "userRoleTypes_role_unique" UNIQUE("role")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(5),
	"first_name" varchar(255),
	"last_name" varchar(255),
	"roleTypeId" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_id_unique" UNIQUE("id")
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
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_account_type_id_accountsType_type_id_fk" FOREIGN KEY ("account_type_id") REFERENCES "public"."accountsType"("type_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accountOverviewReport" ADD CONSTRAINT "accountOverviewReport_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cards" ADD CONSTRAINT "cards_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cards" ADD CONSTRAINT "cards_account_id_accounts_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("account_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payeeAccountsHolders" ADD CONSTRAINT "payeeAccountsHolders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactionHistory" ADD CONSTRAINT "transactionHistory_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactionHistory" ADD CONSTRAINT "transactionHistory_payee_account_id_payeeAccountsHolders_id_fk" FOREIGN KEY ("payee_account_id") REFERENCES "public"."payeeAccountsHolders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userContacts" ADD CONSTRAINT "userContacts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userImages" ADD CONSTRAINT "userImages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_roleTypeId_userRoleTypes_id_fk" FOREIGN KEY ("roleTypeId") REFERENCES "public"."userRoleTypes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_id_accounts_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("account_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "month_index" ON "accountOverviewReport" USING btree ("month");--> statement-breakpoint
CREATE INDEX "year_index" ON "accountOverviewReport" USING btree ("year");--> statement-breakpoint
CREATE INDEX "issue_type_index" ON "accountOverviewReport" USING btree ("issue_type");--> statement-breakpoint
CREATE INDEX "street_number_index" ON "locations" USING btree ("street_number");--> statement-breakpoint
CREATE INDEX "street_name_index" ON "locations" USING btree ("street_name");--> statement-breakpoint
CREATE INDEX "postcode_index" ON "locations" USING btree ("postcode");--> statement-breakpoint
CREATE INDEX "city_index" ON "locations" USING btree ("city");--> statement-breakpoint
CREATE INDEX "province_index" ON "locations" USING btree ("province");--> statement-breakpoint
CREATE INDEX "country_index" ON "locations" USING btree ("country");--> statement-breakpoint
CREATE INDEX "payee_name_index" ON "payeeAccountsHolders" USING btree ("payee_name");--> statement-breakpoint
CREATE UNIQUE INDEX "account_number_index" ON "payeeAccountsHolders" USING btree ("account_number");--> statement-breakpoint
CREATE INDEX "contact_type_index" ON "userContacts" USING btree ("contact_type");--> statement-breakpoint
CREATE UNIQUE INDEX "contact_index" ON "userContacts" USING btree ("contact");--> statement-breakpoint
CREATE INDEX "first_name" ON "users" USING btree ("first_name");--> statement-breakpoint
CREATE INDEX "last_name" ON "users" USING btree ("last_name");--> statement-breakpoint
CREATE INDEX "idx_transactions_account_created" ON "transactions" USING btree ("account_id","created_at");