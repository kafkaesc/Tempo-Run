import { render, screen } from '@testing-library/react';
import A from './A';

it('Loads an a-element', () => {
	render(<A href="#">hello world</A>);
	const link = screen.getByRole('link');
	expect(link).toBeInTheDocument();
	expect(link).toHaveTextContent(/hello world/i);
});

it('Loads the className prop onto the child a-element', () => {
	render(
		<A href="#" className="red">
			hello world, but red
		</A>,
	);
	const link = screen.getByRole('link');
	expect(link).toBeInTheDocument();
	expect(link).toHaveTextContent(/hello world, but red/i);
	expect(link).toHaveClass('red');
});
