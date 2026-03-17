'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type NavItemProps = {
	children: React.ReactNode;
	href: string;
};

export default function NavItem({ children, href }: NavItemProps) {
	const pathname = usePathname();
	const isActive = pathname === href;

	const liStyles = cn(
		'px-3 py-1 rounded-md transition-colors cursor-pointer',
		isActive
			? 'bg-foreground text-background'
			: 'hover:bg-background-hover'
	);

	const linkStyles = 'no-underline text-inherit';

	if (href.startsWith('/')) {
		return (
			<li className={liStyles}>
				<Link className={linkStyles} href={href}>
					{children}
				</Link>
			</li>
		);
	}

	return (
		<li className={liStyles}>
			<a className={linkStyles} href={href} rel="noopener noreferrer" target="_blank">
				{children}
			</a>
		</li>
	);
}
