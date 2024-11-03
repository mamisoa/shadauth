import { SessionType } from "@/src/_types/signInTypes";

import { AppSidebar } from "@/src/components/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import { Separator } from "@/src/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/src/components/ui/sidebar";

import { IconName } from "@/src/_types/iconTypes";

export function DashboardPageCN(session: SessionType) {
	const { user } = session;
	const sidebarData = {
		user: {
			name: user.name || "User",
			email: user.email || "Email",
			avatar: user.image || "",
		},
		teams: [
			{
				name: "Acme Inc",
				logo: "GalleryVerticalEnd" as IconName,
				plan: "Enterprise",
			},
			{
				name: "Acme Corp.",
				logo: "AudioWaveform" as IconName,
				plan: "Startup",
			},
			{
				name: "Evil Corp.",
				logo: "Command" as IconName,
				plan: "Free",
			},
		],
		navMain: [
			{
				title: "Projects",
				url: "#",
				icon: "FolderKanban",
				items: [
					{
						title: "Overview",
						url: "#",
					},
				],
			},
			{
				title: "Personas",
				url: "#",
				icon: "Users",
				items: [
					{
						title: "Descriptions",
						url: "#",
					},
					{
						title: "Generation",
						url: "#",
					},
				],
			},
			{
				title: "Interviews",
				url: "#",
				icon: "MessagesSquare",
				items: [
					{
						title: "Test cards",
						url: "#",
					},
					{
						title: "Generation",
						url: "#",
					},
				],
			},
			{
				title: "Reporting",
				url: "#",
				icon: "LineChart",
				items: [
					{
						title: "Quantify",
						url: "#",
					},
					{
						title: "Qualify",
						url: "#",
					},
				],
			},
		],
		projects: [],
	};

	return (
		<SidebarProvider>
			<AppSidebar data={sidebarData} />
			<SidebarInset>
				<header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
					<div className='flex items-center gap-2 px-4'>
						<SidebarTrigger className='-ml-1' />
						<Separator orientation='vertical' className='mr-2 h-4' />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className='hidden md:block'>
									<BreadcrumbLink href='#'>
										Building Your Application
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className='hidden md:block' />
								<BreadcrumbItem>
									<BreadcrumbPage>Data Fetching</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
					<div className='grid auto-rows-min gap-4 md:grid-cols-3'>
						<div className='aspect-video rounded-xl bg-muted/50'>
							<pre className='bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm text-black'>
								{JSON.stringify(session, null, 2)}
							</pre>
						</div>
						<div className='aspect-video rounded-xl bg-muted/50' />
						<div className='aspect-video rounded-xl bg-muted/50' />
					</div>
					<div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min' />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
