import { cn } from '@/lib/utils';

type PProps = React.ComponentPropsWithoutRef<'p'>;

export default function P({ children, className, ...props }: PProps) {
	return (
		<p className={cn('text-base', className)} {...props}>
			{children}
		</p>
	);
}
