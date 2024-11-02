import { IconName } from "@/src/_types/iconTypes";

export interface TeamsType {
	name: string;
	logo: IconName; // Now using IconName type
	plan: string;
}

export interface NavProjectsType {
	name: string;
	url: string;
	icon: IconName; // Now using IconName type
}

export interface NavItemType {
	title: string;
	url: string;
	icon?: IconName; // Now using IconName type
	isActive?: boolean;
	items?: {
		title: string;
		url: string;
	}[];
}

export interface UserType {
	name?: string;
	email?: string;
	avatar?: string;
}
