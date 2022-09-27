import ohm from 'ohm-js';

export const grammar = ohm.grammar(String.raw`
Grammar {
	Object =
	| Object "." Array -- property
	| Array

	Accessor =
	| "{" Object "}" -- literal
	| "{{" Object "}}" -- identifier

	Array =
	| Object "[" literal "]" -- index
	| Object "[" Accessor "]" -- accessor
	| identifier

	identifier =
	| variableFirstCharacter variableCharacter* -- name

	literal =
	| number

	variableFirstCharacter =
	| letter
	| "_"

	variableCharacter =
	| alnum
	| "-"
	| "_"
	| "$"

	number =
	| digit+
}
`);
