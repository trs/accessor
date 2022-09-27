import {evaluate} from './mod.js';
import {parse} from '@/parse/mod.js';

describe('evaluate', () => {
	it('works with many nested accessors', () => {
		const ast = parse('a[1][{b.c.d[{e[0]}]}]');

		const variables = {
			a: [
				[1, 2, 3],
				[4, 5, 6],
			],
			b: {
				c: {
					d: {
						value: 2,
					},
				},
			},
			e: ['value'],
		};

		const result = evaluate(ast, variables);
		expect(result).toBe(6);
	});

	it('resolves variables if they exist', () => {
		const ast = parse('a.b');

		const variables = {
			a: {b: null},
		};

		const result = evaluate(ast, variables);
		expect(result).toBe(null);
	});
});
