import ohmExtras from 'ohm-js/extras/index.js';
import type {MatchResult, Node} from 'ohm-js';
import type {AnyElement} from '@/types.js';

export const astMapping = {
	Accessor_literal: {
		type: 'LiteralAccessor',
		value: 1,
	},

	Accessor_identifier: {
		type: 'IdentifierAccessor',
		name: 1,
	},

	Object_property: {
		type: 'PropertyAccess',
		left: 0,
		right: 2,
	},

	Array_index: {
		type: 'ElementAccess',
		left: 0,
		right: 2,
	},

	Array_accessor: {
		type: 'ElementAccess',
		left: 0,
		right: 2,
	},

	identifier: (node: Node) => ({
		type: 'Identifier',
		name: node.sourceString,
	}),

	literal: (node: Node) => ({
		type: 'Literal',
		value: node.sourceString,
	}),
};

export const toAST = (match: MatchResult): AnyElement =>
	ohmExtras.toAST(match, astMapping) as AnyElement;
