import Link from 'next/link';
import DarkModeToggle from '@/components/DarkModeToggle';
import NavList from '@/components/navigation/NavList';

export default function Navbar() {
	return (
		<nav className="flex items-center justify-between py-2">
			<Link className="text-4xl font-bold" href="/">
				Rhythm Run
			</Link>
			<div className="flex items-center gap-4">
				<NavList />
				<DarkModeToggle />
			</div>
		</nav>
	);
}
