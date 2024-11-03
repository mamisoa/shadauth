export const iconMap = {
	FolderKanban: "FolderKanban", // For Projects
	Users: "Users", // For Personas
	MessagesSquare: "MessagesSquare", // For Interviews
	LineChart: "LineChart", // For Reporting
} as const;

export type IconName = keyof typeof iconMap;
