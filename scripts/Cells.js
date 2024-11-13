// @ts-check
"use strict";

import * as THREE from "./three@0.144.0.module.js";
//PROGRESS.value += 1;

/* @callback deb
@param {8} a
@returns {6} */

export default class Cells extends THREE.Group {
	/**@deprecated*/
	static #Colors = new Map();
	/**@deprecated*/#mesh;
	//get mesh() { return this.#mesh; }
	/**@deprecated*/#cells;
	//DEBUG;
	/**@type{Set<Set<[Cell, SharedVertex]>>}*/
	#vertices;

	//** @param {8} debug */
	/**@param {Promise<THREE.CubeTexture,
	"yo", "MAMA", "Thus">}CUBE_TEXTURE_PROMISE*/
	constructor(CUBE_TEXTURE_PROMISE, //SCENE, log
	) {
		super();
		//this.DEBUG = debug;

		//** @property {THREE.Material[]} material */
		this.#mesh = new THREE.Mesh(
			//new THREE.BoxGeometry(1, 1, 1)
			new THREE.BufferGeometry()
		);
		//FIXME: BufferGeometry has a fixed size,
		// so we can't add more vertices
		this.#mesh.geometry.setAttribute("position",
			new THREE.BufferAttribute(new Float32Array([
				.5, -.5, -.5, .75, .5, -.5, .5, .5, .5,
				.75, -.5, .5, -.5, .5, -.5, -.5, .75, .5,
				.5, .5, .5, .5, .75, -.5, -.5, -.5, .5,
				.5, -.5, .75, .5, .5, .5, -.5, .5, .75,
				-.5, -.5, -.5, -.75, -.5, .5, -.5, .5, .5,
				-.75, .5, -.5, -.5, -.5, -.5, .5, -.75, -.5,
				.5, -.5, .5, -.5, -.75, .5, -.5, -.5, -.5,
				-.5, .5, -.75, .5, .5, -.5, .5, -.5, -.75]),
				3));
		this.#mesh.geometry.getAttribute
			("position").setUsage(THREE.DynamicDrawUsage);
		for (let i = 0; i < 6; ++i)
			this.#mesh.geometry.addGroup(6 * i, 6, i);
		this.#mesh.geometry.setIndex([0, 1, 2, 2, 3, 0,
			4, 5, 6, 6, 7, 4, 8, 9, 10, 10, 11, 8,
			12, 13, 14, 14, 15, 12, 16, 17, 18, 18, 19, 16,
			20, 21, 22, 22, 23, 20,
			/*/9, 3, 2, 2, 5, 9, 8, 9, 5, 5, 4, 8,
			8, 0, 3, 3, 9, 8, 8, 4, 1, 1, 0, 8//*/
		]);
		this.#mesh.geometry.computeVertexNormals();

		this.#mesh.material
			= [material(0xff0000), material(0x00FF00),
			material(0x0000FF), material(0x00FFFF),
			material(0xFF00FF), material(0xFFFF00)];
		//debug(31, this.mesh.material);
		this.#cells = new Set();
		this.add(new Cell(/*[0, 1, 2, 3], [4, 5, 6, 7],
			[8, 9, 10, 11], [12, 13, 14, 15],
			[16, 17, 18, 19], [20, 21, 22, 23]*/));

		this.#vertices = new Set
			([[this.children[0], this.children[0].vertices[0]],
			[this.children[0], this.children[0].vertices[1]],
			[this.children[0], this.children[0].vertices[2]],
			[this.children[0], this.children[0].vertices[3]],
			[this.children[0], this.children[0].vertices[4]],
			[this.children[0], this.children[0].vertices[5]]]);

		//this.add(new THREE.Mesh
		//	(new THREE.SphereGeometry(1, 32, 32)));
		//PARAMETERS_PANEL.add(CELL, "getFace");
		//console.log(37, this.#cells,
		//	this.#cells.forEach(cell => console.log(37, cell)));
		//console.debug("this.mesh", this.mesh,
		//	this.mesh.geometry.getAttribute("position"));
		/**@type{PromiseLike<"Sunny","WET", "warm">}*/
		const promiseLike = { then:/**@param{8}a*/a => { 7832; } };
		CUBE_TEXTURE_PROMISE.then(
			/**@param{8}a@param{6}b@param{2}c*/
			/**@param{5}d @param{7}e @param{4}*/
			(cubeTexture, b, c, d, e, f) => {
				//console.debug(typeof CUBE.material);
				//if (Array.isArray(this.#mesh.material))
				//**@type{THREE.Material[]
				//	|THREE.MeshStandardMaterial[]}*/
				this.#mesh.material.forEach(
					//**@type{THREE.Material
					//	|THREE.MeshStandardMaterial}*/
					material => {//console.debug(material);
						//if (material instanceof
						//	THREE.MeshPhongMaterial)
						//if
						//	(!material.isMeshNormalMaterial)
						//if (material.envMap !== undefined)
						material.envMap = cubeTexture;
					});
				for (const CELL of this.children)
					for (const MATERIAL of CELL.material)
						MATERIAL.envMap = cubeTexture;
		/*PARAMETERS_PANEL.add(CUBE.material.envMap, "mapping")
		.name("cube envMap");*/});
	}



	extrude(ray) {
		//for (const intersection
		//	of ray.intersectObject(this.mesh))
		const INTER = ray.intersectObject(this.mesh)[0];
		const INDEX = this.#mesh.geometry.getIndex();
		console.debug(INTER);
		console.debug(INDEX);
		let i;
		for (i = 0; i < INDEX.count; i += 3)
			if (INDEX.array[i] === INTER.face.a
				&& INDEX.array[i + 1] === INTER.face.b
				&& INDEX.array[i + 2] === INTER.face.c)
				break;
		if (i === INDEX.count)
			return;
		console.debug(i / 3, INTER.faceIndex);

		const points = [new SharedVertex(), new SharedVertex,
		new SharedVertex(), new SharedVertex()];
	}


	select(POINTER, CAMERA) {
		//this.DEBUG(CUBE.material);
		if (Array.isArray(this.mesh.material))
			for (let i = 0;
				i < this.mesh.material.length; i++) {
				const MATERIAL = this.mesh.material[i];
				if (MATERIAL instanceof THREE.MeshPhongMaterial
					&& Cells.#Colors.get(i) !== undefined) {
					MATERIAL.color.set(Cells.#Colors.get(i));
				}
			}

		const RAYCASTER = new THREE.Raycaster();
		RAYCASTER.setFromCamera(POINTER, CAMERA);
		for (const INTERSECTION of
			RAYCASTER.intersectObject(this.#mesh)) {
			//console.debug(INTERSECTION);
			const MATERIAL = INTERSECTION.object
				.material[INTERSECTION.face.materialIndex];
			//console
			//	.debug(MATERIAL.color, MATERIAL.originalColor);
			if (Cells.#Colors.get
				(INTERSECTION.face.materialIndex) === undefined)
				Cells.#Colors.set(
					INTERSECTION.face.materialIndex,
					new THREE.Color(MATERIAL.color));
			//if (!MATERIAL.isNormalMaterial)
			if (MATERIAL.color !== undefined) MATERIAL.color
				.set(hslToRgbHex(Date.now() / 3000 % 1));
			break;
		}
	}

	relax() {
		//for (const point of this.#points)
		//for (const CELL of this.#cells)
		//	console.debug
		//		(this.#cells.find(cell => cell.has(point)));
		//for (const POINT of this.#points)
		const POSITIONS
			= this.#mesh.geometry.getAttribute("position");
		POSITIONS.setX(0, 1);
		POSITIONS.needUpdate = true;
		console.debug(POSITIONS);
		//for (const VERTEX of this.#vertices) for (const CELL
		//	of this.children.filter(cell => cell.has(VERTEX)))
		const SHIFTS = [];
		for (const CELL of this.children) {
			if (!(CELL instanceof Cell)) continue;
			const x = CELL.relax();
			console.debug(x);
			//for (const i of x) SHIFTS.push(i);
		}
	}
}



class Cell extends THREE.Mesh {
	#FACES;
	//= /*@type{Set<Face>}*/(new Set(/**@type{Set<86>}*/[]));
	//vertices;

	/**@typedef{![!number,!number,!number]}Position*//**@typedef{Position[]}Positions*/

	/**@param{...Face}faces*/
	constructor(/**@deprecated*/...faces) {
		super(new THREE.BufferGeometry().setAttribute("position",
			new THREE.BufferAttribute(new Float32Array((/**@type{
			!Position[]}*/([.5, -.5, -.5, [.75, .5, -.5], .5, .5,
					.5, .75, -.5, .5, -.5, .5, -.5, -.5, .75, .5,
					.5, .5, .5, .5, .75, -.5, -.5, -.5, .5, .5, -.5
					, .75, .5, .5, .5, -.5, .5, .75, -.5, -.5, -.5,
					-.75, -.5, .5, -.5, .5, .5, -.75, .5, -.5, -.5, -.5,
					-.5, .5, -.75, -.5, .5, -.5, .5, -.5, -.75, .5, -.5
					, -.5, -.5, -.5, .5, -.75, .5, .5, -.5, .5, -.5
					, -.75])).flat())
				, 3))/*new THREE.BoxGeometry(1, 1, 1)*/, [
			new THREE.MeshPhongMaterial({ color: "Red" }),
			new THREE.MeshPhongMaterial({ color: "Green" }),
			new THREE.MeshPhongMaterial({ color: "Blue" })
			, new THREE.MeshPhongMaterial({ color: "Cyan" }
			), new THREE.MeshPhongMaterial({
				color: "Magenta"
			}), new THREE.MeshPhongMaterial({
				color: "Yellow"
			})]);/*console.debug(this.geometry.setAttribute
				("position",new THREE.BufferAttribute(new
				Float32Array([.5, -.5, -.5,.75,.5, -.5, .5, .5,
				.5,.75, -.5, .5, -.5, .5, -.5, -.5,.75,.5,.5,.5
				,.5,.5, .75, -.5, -.5, -.5, .5,.5, -.5,.75,.5,
				.5,.5,-.5, .5, .75,-.5, -.5,-.5,-.75, -.5, .5,
				-.5,.5,.5,-.75, .5, -.5,-.5,-.5, -.5, .5, -.75,
				-.5,.5,-.5,.5,-.5,-.75, .5, -.5, -.5, -.5,-.5,
				.5,-.75,.5,.5,-.5,.5,-.5, -.75]),3)));*/this.
			geometry.getAttribute("position").setUsage(THREE.
				DynamicDrawUsage); for (let i = 0; i < 6; ++i)
			this.geometry.addGroup(6 * i, 6, i); this.geometry.
				setIndex([0, 1, 2, 2, 3, 0, 4, 5, 6, 6, 7, 4, 8, 9, 10, 10, 11, 8, 12, 13, 14, 14, 15, 12, 16, 17, 18, 18, 19, 16, 20, 21, 22, 22, 23, 20
		/*,9,3,2,2,5,9,8,9,5,5,4,8,8,0,3,3,9,8,8,4,1,1,0,8//*/]);
		this.geometry.computeVertexNormals(); this.#FACES = new
			Set(faces); this.vertices = [new SharedVertex(0,
				17, 23), new SharedVertex(1, 7, 22), new
				SharedVertex(2, 6, 10), new SharedVertex
				(3, 9, 18), new SharedVertex(4, 15, 21),
			new SharedVertex(5, 11, 14),
			new SharedVertex(8, 13, 19),
			new SharedVertex(12, 16, 20)];
	}

	getFaceIndex(intersections) {
		//RAYCASTER.setFromCamera(POINTER, CAMERA);
		for (const INTERSECTION
			of //RAYCASTER.intersectObject(CUBE)
			intersections) {
			//console.debug(INTERSECTION.face);
			for (let face_index = 0;
				face_index < this.#FACES.length; face_index++) {
				if (this.#FACES[face_index]
					.includes(INTERSECTION.face.a)
					&& this.#FACES[face_index]
						.includes(INTERSECTION.face.b)
					&& this.#FACES[face_index]
						.includes(INTERSECTION.face.c)) {
					console.debug
						(face_index, this.#FACES[face_index]);
					return face_index;
				}
			}
		};
	}

	getFaceFromIndexes(a, b, c) { }

	relax() {
		for (const VERTEX of this.vertices) for (const _ of VERTEX)
			console.debug(282, _, VERTEX);
	}
}

class SharedVertex extends Set {
	/**@param{[number,number,number]}vertices*/
	constructor(...vertices) { super(vertices); }
}

class Face { }

function hslToRgbHex(hue) {//debug(hue);
	const color = hslToRgb(hue, 1, .5);//debug(color);
	return color[0] * 0x100 ** 2 + color[1] * 0x100 + color[2];
}


// https://stackoverflow.com/a/9493060/14792858
/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function hslToRgb(h, s, l) {
	var r, g, b;

	if (s == 0) {
		r = g = b = l; // achromatic
	} else {
		var hue2rgb = function hue2rgb(p, q, t) {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};

		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	return [Math.round(r * 255), Math.round(g * 255),
	Math.round(b * 255)];
}



function material(color) {
	return new THREE.//MeshStandardMaterial
		MeshPhongMaterial
		//MeshNormalMaterial
		({
			//depthTest: true, depthWrite: true,
			//side: THREE./*TwoPass*//*DoubleSide*/FrontSide,
			color: color, //transparent: true, opacity: 1/6, 
			//roughness: 0,metalness: 1,
		});
}