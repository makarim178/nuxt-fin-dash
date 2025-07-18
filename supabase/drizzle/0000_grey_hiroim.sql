CREATE TABLE "accountOverviewReport" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"month" integer,
	"year" integer,
	"issue_type" varchar(20),
	"total_balance" real,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "accountsHolder" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"accounts_type_id" integer NOT NULL,
	"account_number" varchar(600),
	"cvv" varchar(5),
	"expiry_date" varchar(5),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "accountsType" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_type" varchar(30),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"street_number" varchar(6) NOT NULL,
	"street_name" varchar(500) NOT NULL,
	"postcode" varchar(6) NOT NULL,
	"city" varchar(255),
	"province" varchar(255),
	"country" varchar(255),
	"is_valid" boolean,
	"is_primary" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payeeAccountsHolders" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"method_type" varchar NOT NULL,
	"payee_name" varchar(255),
	"interact_method" varchar(10),
	"account_number" varchar(255),
	"is_valid" boolean,
	"is_primary" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactionHistory" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_account_id" integer,
	"payee_account_id" integer,
	"amount" real,
	"payDate" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userContacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"contact_type" varchar(10),
	"contact" varchar(255),
	"country_code" varchar(5),
	"is_valid" boolean,
	"is_primary" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "userContacts_contact_unique" UNIQUE("contact")
);
--> statement-breakpoint
CREATE TABLE "userImages" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"image_url" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userRoleTypes" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "userRoleTypes_type_unique" UNIQUE("type")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(5),
	"first_name" varchar(255),
	"last_name" varchar(255),
	"dob" varchar(10),
	"roleTypeId" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "accountOverviewReport" ADD CONSTRAINT "accountOverviewReport_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "accountsHolder" ADD CONSTRAINT "accountsHolder_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "accountsHolder" ADD CONSTRAINT "accountsHolder_accounts_type_id_accountsType_id_fk" FOREIGN KEY ("accounts_type_id") REFERENCES "public"."accountsType"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "payeeAccountsHolders" ADD CONSTRAINT "payeeAccountsHolders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transactionHistory" ADD CONSTRAINT "transactionHistory_user_account_id_users_id_fk" FOREIGN KEY ("user_account_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transactionHistory" ADD CONSTRAINT "transactionHistory_payee_account_id_payeeAccountsHolders_id_fk" FOREIGN KEY ("payee_account_id") REFERENCES "public"."payeeAccountsHolders"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "userContacts" ADD CONSTRAINT "userContacts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "userImages" ADD CONSTRAINT "userImages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_roleTypeId_userRoleTypes_id_fk" FOREIGN KEY ("roleTypeId") REFERENCES "public"."userRoleTypes"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "month_index" ON "accountOverviewReport" USING btree ("month");--> statement-breakpoint
CREATE INDEX "year_index" ON "accountOverviewReport" USING btree ("year");--> statement-breakpoint
CREATE INDEX "issue_type_index" ON "accountOverviewReport" USING btree ("issue_type");--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_number_index" ON "accountsHolder" USING btree ("account_number");--> statement-breakpoint
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
CREATE INDEX "last_name" ON "users" USING btree ("last_name");