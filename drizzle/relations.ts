import { relations } from "drizzle-orm/relations";
import { accountType, accounts, users, provinces, cities, contactNumbers, emails, locations, countries, userLogin, roleTypes } from "./schema";

export const accountsRelations = relations(accounts, ({one}) => ({
	accountType: one(accountType, {
		fields: [accounts.accountTypeId],
		references: [accountType.accountTypeId]
	}),
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id]
	}),
}));

export const accountTypeRelations = relations(accountType, ({many}) => ({
	accounts: many(accounts),
}));

export const usersRelations = relations(users, ({one, many}) => ({
	accounts: many(accounts),
	contactNumbers: many(contactNumbers),
	emails: many(emails),
	locations: many(locations),
	userLogins: many(userLogin),
	roleType: one(roleTypes, {
		fields: [users.roleId],
		references: [roleTypes.id]
	}),
}));

export const citiesRelations = relations(cities, ({one}) => ({
	province: one(provinces, {
		fields: [cities.provinceId],
		references: [provinces.id]
	}),
}));

export const provincesRelations = relations(provinces, ({one, many}) => ({
	cities: many(cities),
	country: one(countries, {
		fields: [provinces.countryId],
		references: [countries.id]
	}),
}));

export const contactNumbersRelations = relations(contactNumbers, ({one}) => ({
	user: one(users, {
		fields: [contactNumbers.userId],
		references: [users.id]
	}),
}));

export const emailsRelations = relations(emails, ({one}) => ({
	user: one(users, {
		fields: [emails.userId],
		references: [users.id]
	}),
}));

export const locationsRelations = relations(locations, ({one}) => ({
	user: one(users, {
		fields: [locations.userId],
		references: [users.id]
	}),
}));

export const countriesRelations = relations(countries, ({many}) => ({
	provinces: many(provinces),
}));

export const userLoginRelations = relations(userLogin, ({one}) => ({
	user: one(users, {
		fields: [userLogin.userId],
		references: [users.id]
	}),
}));

export const roleTypesRelations = relations(roleTypes, ({many}) => ({
	users: many(users),
}));