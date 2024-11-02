import { SignOutButton } from "@/src/components/auth/signOutButton";
import Link from "next/link";
import Image from "next/image";
import { SessionSchema } from "@/src/_types/signInTypes";

export function DashboardPage(session: SessionSchema) {
	const { user } = session;

	return (
		<div className='flex min-h-screen bg-gray-50'>
			{/* Sidebar */}
			<aside className='w-64 bg-gray-900 text-gray-100 flex flex-col fixed h-full'>
				{/* User Profile Section */}
				<div className='p-6 border-b border-gray-800'>
					<div className='flex items-center space-x-4'>
						<div className='relative w-12 h-12'>
							{user.image ? (
								<Image
									src={user.image as string}
									alt='Profile'
									width={80}
									height={80}
									className='rounded-full object-cover'
								/>
							) : (
								<svg
									className='w-10 h-10 text-gray-400 rounded-full'
									fill='currentColor'
									viewBox='0 0 24 24'>
									<path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
								</svg>
							)}
						</div>
						<div className='flex flex-col'>
							<span className='font-medium text-sm'>{user.name || "User"}</span>
							<span className='text-xs text-gray-400 truncate max-w-[150px]'>
								{user.email}
							</span>
						</div>
					</div>
				</div>

				{/* Navigation */}
				<nav className='flex-1 p-4'>
					<ul className='space-y-1'>
						<li>
							<Link
								href='/dashboard'
								className='flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors'>
								<svg
									className='w-5 h-5 mr-3'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
									/>
								</svg>
								Home
							</Link>
						</li>
						<li>
							<Link
								href='/auth/profile'
								className='flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors'>
								<svg
									className='w-5 h-5 mr-3'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
									/>
								</svg>
								Profile
							</Link>
						</li>
					</ul>
				</nav>

				{/* Sign Out Button */}
				<div className='p-4 border-t border-gray-800'>
					<SignOutButton className='w-full bg-red-600 text-white py-2.5 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2'>
						<svg
							className='w-5 h-5'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
							/>
						</svg>
						<span>Sign Out</span>
					</SignOutButton>
				</div>
			</aside>

			{/* Main Content */}
			<main className='flex-1 ml-64 p-8'>
				<div className='max-w-4xl mx-auto'>
					<h1 className='text-3xl font-semibold text-gray-900 mb-8'>
						Dashboard
					</h1>
					<div className='bg-white shadow-sm rounded-lg p-6'>
						<h2 className='text-xl font-semibold text-gray-900 mb-4'>
							Session Info
						</h2>
						<pre className='bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm text-black'>
							{JSON.stringify(session, null, 2)}
						</pre>
					</div>
				</div>
			</main>
		</div>
	);
}
