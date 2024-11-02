"use client";

import { IconName } from "@/src/_types/iconTypes";
import {
	AudioWaveform,
	BookOpen,
	Bot,
	Command,
	Frame,
	GalleryVerticalEnd,
	Map,
	PieChart,
	SquareTerminal,
} from "lucide-react";

const iconComponents = {
	AudioWaveform: AudioWaveform,
	BookOpen: BookOpen,
	Bot: Bot,
	Command: Command,
	Frame: Frame,
	GalleryVerticalEnd: GalleryVerticalEnd,
	Map: Map,
	PieChart: PieChart,
	SquareTerminal: SquareTerminal,
} as const;

interface IconMapperProps {
	name: IconName;
	className?: string;
}

export function IconMapper({ name, className }: IconMapperProps) {
	const Icon = iconComponents[name];
	return Icon ? <Icon className={className} /> : null;
}
