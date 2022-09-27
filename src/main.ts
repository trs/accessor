import type {AnyElement, JSValue, Values} from './types.js';
import {parse} from '@/parse/mod.js';
import {evaluate} from '@/evaluate/mod.js';

export function access<T extends JSValue = any>(
	expression: string | AnyElement,
	value: Values,
): JSValue {
	if (typeof expression === 'string') expression = parse(expression);

	return evaluate(expression, value) as T;
}
