ALTER TABLE "users" RENAME TO "user";--> statement-breakpoint
ALTER TABLE "accountOverviewReport" DROP CONSTRAINT "accountOverviewReport_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "accountsHolder" DROP CONSTRAINT "accountsHolder_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "accountsHolder" DROP CONSTRAINT "accountsHolder_accounts_type_id_accountsType_id_fk";
--> statement-breakpoint
ALTER TABLE "locations" DROP CONSTRAINT "locations_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "payeeAccountsHolders" DROP CONSTRAINT "payeeAccountsHolders_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "transactionHistory" DROP CONSTRAINT "transactionHistory_user_account_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "transactionHistory" DROP CONSTRAINT "transactionHistory_payee_account_id_payeeAccountsHolders_id_fk";
--> statement-breakpoint
ALTER TABLE "userContacts" DROP CONSTRAINT "userContacts_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "userImages" DROP CONSTRAINT "userImages_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "users_roleTypeId_userRoleTypes_id_fk";
--> statement-breakpoint
ALTER TABLE "accountOverviewReport" ADD CONSTRAINT "accountOverviewReport_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accountsHolder" ADD CONSTRAINT "accountsHolder_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accountsHolder" ADD CONSTRAINT "accountsHolder_accounts_type_id_accountsType_id_fk" FOREIGN KEY ("accounts_type_id") REFERENCES "public"."accountsType"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payeeAccountsHolders" ADD CONSTRAINT "payeeAccountsHolders_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactionHistory" ADD CONSTRAINT "transactionHistory_user_account_id_user_id_fk" FOREIGN KEY ("user_account_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactionHistory" ADD CONSTRAINT "transactionHistory_payee_account_id_payeeAccountsHolders_id_fk" FOREIGN KEY ("payee_account_id") REFERENCES "public"."payeeAccountsHolders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userContacts" ADD CONSTRAINT "userContacts_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userImages" ADD CONSTRAINT "userImages_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_roleTypeId_userRoleTypes_id_fk" FOREIGN KEY ("roleTypeId") REFERENCES "public"."userRoleTypes"("id") ON DELETE cascade ON UPDATE no action;