import {
	hasProperty,
	isPropertyKey,
	isLiteralAccessor,
	isIdentifierAccessor,
	isElementAccess,
	isIdentifier,
	isLiteral,
	isPropertyAccess,
} from '@/types.js';

import type {
	AnyElement,
	ElementAccess,
	Identifier,
	Literal,
	PropertyAccess,
	LiteralAccessor,
	IdentifierAccessor,
	Values,
	JSValue,
} from '@/types.js';

export function evaluate(ast: AnyElement, values: Values): JSValue {
	if (isLiteralAccessor(ast)) return evaluateLiteralAccessor(ast, values);
	if (isIdentifierAccessor(ast)) return evaluateIdentifierAccessor(ast, values);
	if (isElementAccess(ast)) return evaluateElementAccess(ast, values);
	if (isPropertyAccess(ast)) return evaluatePropertyAccess(ast, values);
	if (isIdentifier(ast)) return evaluateIdentifier(ast, values);
	if (isLiteral(ast)) return evaluateLiteral(ast);

	throw new Error('Unable to evaluate');
}

export function evaluateLiteralAccessor(
	ast: LiteralAccessor,
	values: Values,
): JSValue {
	return evaluate(ast.value, values);
}

export function evaluateIdentifierAccessor(
	ast: IdentifierAccessor,
	values: Values,
): JSValue {
	const result = evaluate(ast.name, values);

	if (isPropertyKey(result) && hasProperty(values, result)) {
		return values[result];
	}

	return result;
}

export function evaluatePropertyAccess(
	ast: PropertyAccess,
	values: Values,
): JSValue {
	const left = evaluate(ast.left, values);
	const right = evaluate(ast.right, values);

	if (typeof left !== 'object')
		throw new Error('Cannot access property of a non-object value');
	if (!isPropertyKey(right))
		throw new Error(
			'A property can only be accessed using a valid property key type',
		);

	return left?.[String(right)] as JSValue;
}

export function evaluateElementAccess(
	ast: ElementAccess,
	values: Values,
): JSValue {
	const left = evaluate(ast.left, values);
	const right = evaluate(ast.right, values);

	if (typeof left !== 'object')
		throw new Error('Cannot access element of a non-object value');
	if (!isPropertyKey(right))
		throw new Error(
			'An element can only be accessed using a valid property key type',
		);

	return left?.[String(right)] as JSValue;
}

export function evaluateIdentifier(ast: Identifier, values: Values): JSValue {
	if (hasProperty(values, ast.name)) {
		return values[ast.name];
	}

	return ast.name;
}

export function evaluateLiteral(ast: Literal): number {
	return Number.parseInt(ast.value, 10);
}
