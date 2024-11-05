import { IconName } from "@/src/_types/iconTypes";

export interface UserType {
	name: string;
	email: string;
	avatar: string;
	username?: string;
	firstname?: string;
	lastname?: string;
	id?: string;
}

export interface TeamsType {
	name: string;
	logo: IconName;
	plan: string;
}

export interface NavSubItem {
	title: string;
	url: string;
}

export interface NavItemType {
	title: string;
	url: string;
	icon: IconName;
	isActive?: boolean;
	items?: NavSubItem[];
}

export interface NavProjectsType {
	name: string;
	url: string;
	icon: IconName;
}

export interface SidebarData {
	user: UserType;
	teams: TeamsType[];
	navMain: NavItemType[];
	projects: NavProjectsType[];
}
