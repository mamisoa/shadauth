export const iconMap = {
	AudioWaveform: "AudioWaveform",
	BookOpen: "BookOpen",
	Bot: "Bot",
	Command: "Command",
	Frame: "Frame",
	GalleryVerticalEnd: "GalleryVerticalEnd",
	Map: "Map",
	PieChart: "PieChart",
	SquareTerminal: "SquareTerminal",
} as const;

export type IconName = keyof typeof iconMap;
