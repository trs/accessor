export const hasProperty = <T, K extends keyof T | string>(
	object: T,
	key: K,
): object is T & Record<K, K extends keyof T ? T[K] : unknown> =>
	Object.prototype.hasOwnProperty.call(object, key) as boolean;

export const isPropertyKey = (key: any): key is PropertyKey =>
	typeof key === 'string' || typeof key === 'number' || typeof key === 'symbol';

export type AnyElement =
	| LiteralAccessor
	| IdentifierAccessor
	| PropertyAccess
	| ElementAccess
	| Identifier
	| Literal;

export type Element<T extends string> = {
	type: T;
};

export const isElement = (value: unknown): value is Element<any> =>
	value != null && typeof value === 'object' && hasProperty(value, 'type');

export type LiteralAccessor = {
	value: AnyElement;
} & Element<'LiteralAccessor'>;

export const isLiteralAccessor = (value: unknown): value is LiteralAccessor =>
	isElement(value) && value.type === 'LiteralAccessor';

export type IdentifierAccessor = {
	name: AnyElement;
} & Element<'IdentifierAccessor'>;

export const isIdentifierAccessor = (
	value: unknown,
): value is IdentifierAccessor =>
	isElement(value) && value.type === 'IdentifierAccessor';

export type PropertyAccess = {
	left: AnyElement;
	right: AnyElement;
} & Element<'PropertyAccess'>;

export const isPropertyAccess = (value: unknown): value is PropertyAccess =>
	isElement(value) && value.type === 'PropertyAccess';

export type ElementAccess = {
	left: AnyElement;
	right: AnyElement;
} & Element<'ElementAccess'>;

export const isElementAccess = (value: unknown): value is ElementAccess =>
	isElement(value) && value.type === 'ElementAccess';

export type Identifier = {
	name: string;
} & Element<'Identifier'>;

export const isIdentifier = (value: unknown): value is Identifier =>
	isElement(value) && value.type === 'Identifier';

export type Literal = {
	value: string;
} & Element<'Literal'>;

export const isLiteral = (value: unknown): value is Literal =>
	isElement(value) && value.type === 'Literal';

export type JSValue =
	| null
	| undefined
	| string
	| number
	| boolean
	| {[x: PropertyKey]: JSValue}
	| JSValue[];

export type Values = Record<PropertyKey, JSValue>;
