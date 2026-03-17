import { render, screen } from '@testing-library/react';
import H2 from './H2';

it('Loads an H2 element', () => {
	render(<H2>hello world</H2>);
	const heading = screen.getByRole('heading', { level: 2 });
	expect(heading).toBeInTheDocument();
	expect(heading).toHaveTextContent(/hello world/i);
});

it('Loads the className prop onto the child h2 element', () => {
	render(<H2 className="red">hello world, but red</H2>);
	const heading = screen.getByRole('heading', { level: 2 });
	expect(heading).toBeInTheDocument();
	expect(heading).toHaveTextContent(/hello world, but red/i);
	expect(heading).toHaveClass('red');
});
