import {parse} from './mod.js';

describe('parse', () => {
	it('works', () => {
		const result = parse('a.b');
		expect(result).toEqual({
			type: 'PropertyAccess',
			left: {type: 'Identifier', name: 'a'},
			right: {type: 'Identifier', name: 'b'},
		});
	});
});
