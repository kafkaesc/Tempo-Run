import { cn } from '@/lib/utils';

type H1Props = React.ComponentPropsWithoutRef<'h1'>;

export default function H1({ children, className, ...props }: H1Props) {
	return (
		<h1 className={cn('text-4xl font-bold', className)} {...props}>
			{children}
		</h1>
	);
}
