import { DateTime } from "next-auth/providers/kakao";

export interface FormState<T> {
	errors?: StringMap;
	successMsg?: string;
	data?: T;
	blurs?: StringToBooleanMap;
}

export interface StringMap {
	[key: string]: string;
}

export interface StringToBooleanMap {
	[key: string]: boolean;
}

export interface FormInputs {
	email?: string;
}

interface User {
	id: string;
	name?: string;
	username?: string;
	firstname?: string;
	lastname?: string;
	password?: string;
	email: string;
	role?: string;
	emailVerified?: Date | null;
	image?: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface SessionSchema {
	user: User;
	expires: string;
}
