import { sqliteTable, AnySQLiteColumn, integer, text, real, foreignKey } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const accountType = sqliteTable("accountType", {
	accountTypeId: integer("account_type_id").primaryKey().notNull(),
	accountType: text("account_type"),
});

export const transactionHistory = sqliteTable("transactionHistory", {
	transactionId: integer("transaction_id").primaryKey().notNull(),
	fromAccountId: text("from_account_id"),
	userId: integer("user_id"),
	toAccountId: text("to_account_id"),
	amount: real(),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
});

export const accountHistory = sqliteTable("accountHistory", {
	id: integer().primaryKey().notNull(),
	month: integer(),
	year: integer(),
	totalBalance: real("total_balance"),
	totalDebt: real("total_debt"),
	totalCredit: real("total_credit"),
	updatedAt: text("updated_at").default("sql`(CURRENT_TIMESTAMP)`"),
});

export const accounts = sqliteTable("accounts", {
	id: integer().primaryKey().notNull(),
	userId: integer("user_id").notNull().references(() => users.id),
	accountTypeId: integer("account_type_id").notNull().references(() => accountType.accountTypeId),
	accountNumber: text("account_number"),
	cvv: text(),
	expiry: text(),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
});

export const cities = sqliteTable("cities", {
	id: integer().primaryKey().notNull(),
	city: text(),
	provinceId: integer("province_id").notNull().references(() => provinces.id),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
});

export const contactNumbers = sqliteTable("contactNumbers", {
	id: integer().primaryKey().notNull(),
	userId: integer("user_id").notNull().references(() => users.id),
	countryCode: text(),
	type: text(),
	number: text(),
	isValid: integer("is_valid"),
	isPrimary: integer("is_primary"),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
});

export const countries = sqliteTable("countries", {
	id: integer().primaryKey().notNull(),
	code: text(),
	country: text(),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
});

export const emails = sqliteTable("emails", {
	id: integer().primaryKey().notNull(),
	userId: integer("user_id").notNull().references(() => users.id),
	email: text(),
	isValid: integer("is_valid"),
	isPrimary: integer("is_primary"),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
});

export const locations = sqliteTable("locations", {
	id: integer().primaryKey().notNull(),
	userId: integer("user_id").notNull().references(() => users.id),
	streetNumber: text("street_number"),
	streetName: text("street_name"),
	cityId: integer("city_id"),
	isValid: integer("is_valid"),
	isPrimary: integer("is_primary"),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
});

export const provinces = sqliteTable("provinces", {
	id: integer().primaryKey().notNull(),
	province: text(),
	countryId: integer("country_id").notNull().references(() => countries.id),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
});

export const roleTypes = sqliteTable("roleTypes", {
	id: integer().primaryKey().notNull(),
	type: text(),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
});

export const userLogin = sqliteTable("userLogin", {
	id: integer().primaryKey().notNull(),
	userId: integer("user_id").notNull().references(() => users.id),
	uuid: text(),
	password: text(),
	salt: text(),
	md5: text(),
	sha1: text(),
	sha256: text(),
	validUntilInMins: integer("valid_until_in_mins"),
	isValid: integer("is_valid"),
	isPrimary: integer("is_primary"),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
});

export const users = sqliteTable("users", {
	id: integer().primaryKey().notNull(),
	title: text(),
	firstName: text("first_name"),
	lastName: text("last_name"),
	dob: text(),
	roleId: integer("role_id").notNull().references(() => roleTypes.id),
	contactId: integer("contact_id"),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
});

export const newTransactionHistory = sqliteTable("__new_transactionHistory", {
	id: integer().primaryKey().notNull(),
	fromAccountId: text("from_account_id"),
	userId: integer("user_id"),
	toAccountId: text("to_account_id"),
	amount: real(),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
});

