import { render, screen } from '@testing-library/react';
import P from './P';

it('Loads a p element', () => {
	render(<P>hello world</P>);
	const paragraph = screen.getByText(/hello world/i);
	expect(paragraph).toBeInTheDocument();
	expect(paragraph).toHaveTextContent(/hello world/i);
});

it('Loads the className prop onto the child p element', () => {
	render(<P className="red">hello world, but red</P>);
	const paragraph = screen.getByText(/hello world, but red/i);
	expect(paragraph).toBeInTheDocument();
	expect(paragraph).toHaveTextContent(/hello world, but red/i);
	expect(paragraph).toHaveClass('red');
});
