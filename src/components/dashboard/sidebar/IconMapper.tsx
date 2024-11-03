"use client";

import { IconName } from "@/src/_types/iconTypes";
import { FolderKanban, Users, MessagesSquare, LineChart } from "lucide-react";

const iconComponents = {
	FolderKanban: FolderKanban,
	Users: Users,
	MessagesSquare: MessagesSquare,
	LineChart: LineChart,
} as const;

interface IconMapperProps {
	name: IconName;
	className?: string;
}

export function IconMapper({ name, className }: IconMapperProps) {
	const Icon = iconComponents[name];
	return Icon ? <Icon className={className} /> : null;
}
