import {access} from './main.js';

describe('access', () => {
	it('accesses directly', () => {
		const value = {
			a: {
				b: 2,
			},
		};
		const path = 'a.b';

		const result = access(path, value);
		expect(result).toBe(2);
	});

	it('access based on result of a sub-access', () => {
		const value = {
			a1: {
				b: 2,
			},
			a2: {
				c: 'b',
			},
		};
		const path = 'a1[{a2.c}]';

		const result = access(path, value);
		expect(result).toBe(2);
	});

	it('supports multiple resolution paths', () => {
		const value = {
			a: {
				a1: [3, 4],
			},
			b: {
				b2: 'c',
			},
			c: 1,
		};

		const path = 'a.a1[{{b.b2}}]';

		const result = access(path, value);
		expect(result).toBe(4);
	});
});
