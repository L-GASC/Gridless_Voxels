// @ts-check
"use strict";

/**@enum {Variant}
@typedef{86}Enum*/
//**@typedef{
//{[Symbol.toPrimitive]:(hint:ToPrimitiveHint)=>number}}VVariant*/
/**@typedef{"string"|"number"|"default"}ToPrimitiveHint*/
export const REVISION = '144';
export const MOUSE =
	{ LEFT: 0, MIDDLE: 1, RIGHT: 2, ROTATE: 0, DOLLY: 1, PAN: 2 };
export const TOUCH
	= { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 };
export const CullFace
	= { None: 0, Back: 1, Front: 2, FrontBack: 3 };
export const ShadowMap
	= { Basic: 0, PCF: 1, PCFSoft: 2, VSM: 3 };
class Variant {
/**@param{number}value*/constructor(value) {
		this[Symbol.toPrimitive] =
			/**@param{ToPrimitiveHint}_hint*/_hint => value;
	}
}
class ESide extends Variant {
	/**@param{number}value*/constructor(value) { super(value); }
}
/**@enum {ESide}*/
export const Side = {
	get Front() { return new ESide(0); },
	get Back() { return new ESide(1); },
	get Double() { return new ESide(2); }
};
//function x(b) {
//	let k = { new: (b) => b }; k = Array;
//	class a extends k { }; return a.foo = 8, a;
//} console.error = alert;
//console.debug(x({ name: "c" }), Variant.i = 8);
//export const Blending={No:0,Normal:1,Additive:2,
//					   Subtractive:3,Multiply:4,Custom:5};
/**@type{8}*/
export const Blending = newEnum("Blending", {
	No: 0, Normal: 1,
	Additive: 2, Subtractive: 3, Multiply: 4, Custom: 5
});
/**@param{string}NAME @param{{[variant:string]:number}}VARIANTS*/ function newEnum(NAME, VARIANTS) {
	/**@typedef {NAME} @property {3} s*/
	 /** @type{NAME} */
	const ENUM = {};
	for (const V in VARIANTS) Object.defineProperty
		(ENUM, V, {value:VARIANTS[V], writable:false, })
	console.debug(48,ENUM); return ENUM;
} export const Equation = {
	Add: 100, Subtract: 101, ReverseSubtract: 102,
	Min: 103, Max: 104
};
export const Factor = {
	Zero: 200, One: 201, SrcColor: 202, OneMinusSrcColor: 203,
	SrcAlpha: 204, OneMinusSrcAlpha: 205, DstAlpha: 206,
	OneMinusDstAlpha: 207, DstColor: 208,
	OneMinusDstColor: 209, SrcAlphaSaturate: 210
};
export const Depth = {
	Never: 0, Always: 1, Less: 2, LessEqual: 3,
	Equal: 4, GreaterEqual: 5, Greater: 6, NotEqual: 7
};
export const Operation = { Multiply: 0, Mix: 1, Add: 2 };
export const ToneMapping = {
	No: 0, Linear: 1, Reinhard: 2, Cineon: 3, ACESFilmic: 4, Custom: 5
}; console.debug(Variant); console.debug(new Variant(-1));