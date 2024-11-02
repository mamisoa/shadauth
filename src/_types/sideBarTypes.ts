import { type LucideIcon } from "lucide-react";

export interface TeamsType {
	name: string;
	logo: React.ElementType;
	plan: string;
}

export interface NavProjectsType {
	name: string;
	url: string;
	icon: LucideIcon;
}

export interface NavItemType {
	title: string;
	url: string;
	icon?: LucideIcon;
	isActive?: boolean;
	items?: {
		title: string;
		url: string;
	}[];
}

export interface UserType {
	name: string;
	email: string;
	avatar: string;
}
