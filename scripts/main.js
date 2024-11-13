// @ts-check
"use strict";

// TODO: Make a wrapper for the progress bar
// 	to handle value changes using methods
const PROGRESS = /** @type {HTMLProgressElement} */
	(document.getElementById("progress"));
PROGRESS.value = 0;
PROGRESS.max = 4;

import GUI from "./lil-gui@0.17.0.esm.js";
PROGRESS.value += 1;

import * as THREE from "./three@0.144.0.module.js";
PROGRESS.value += 1;

import { OrbitControls, /*MapControls*/ }
	from "./OrbitControls@0.145.0.js";
PROGRESS.value += 1;

import Cells from "./Cells.js";
PROGRESS.value += 1;





const LOG = /** @type {HTMLOutputElement?} */
	(document.getElementById("log"));

/** @param {*[]} x */
function debug(...x) {
	//for (const i in x) { CONSOLE.append(i ,x[i],"\t") ;}
	LOG?.append(x.toString(), "\n");
	console.debug(...x); if (x.length === 1) return x[0];
	return x;
} debug(86); debug(8, 6);

const CONTAINER = /** @type {HTMLCanvasElement} */
	(document.getElementById("main"));
const PARAMETERS_PANEL = new GUI
	({ container: CONTAINER, title: "Parameters" }).close();
const CANVAS =/** @type {HTMLCanvasElement} */
	(document.getElementById('canvas'));
// The renderer: something that
// draws 3D objects onto the canvas
export const RENDERER = new
	THREE.WebGLRenderer({ antialias: false, canvas: CANVAS });
//console.debug(RENDERER.domElement);
/**
@see
https://gist.github.com/paulirish/5d52fb081b3570c81e3a
*
document.addEventListener(
	"DOMContentLoaded",
	_DOMContentLoaded => RENDERER.setSize(
		CONTAINER.clientWidth, CONTAINER.clientHeight, false)
);*/
//console.debug(RENDERER.domElement);
RENDERER.setClearColor("slategray", 1);

// The three.js scene:
// the 3D world where you put objects
const SCENE = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();
const CAMERA_CONTROLS
	= new OrbitControls(camera, RENDERER.domElement);
CAMERA_CONTROLS.enableDamping = true;



/*/** Such a lie! @type {boolean[][][]} *//*
const CUBES = [[[]]];
CUBES[0][0][0] = true;*/


const CUBE_TEXTURE_LOADER = new THREE.CubeTextureLoader();
CUBE_TEXTURE_LOADER.setPath("textures/cube/Bridge2/");
const CUBE_TEXTURE_PROMISE
	= CUBE_TEXTURE_LOADER.loadAsync(['posx.jpg', 'negx.jpg',
		'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg']);




const CELLS = new Cells(CUBE_TEXTURE_PROMISE);
SCENE.add(CELLS);
//debug(CELLS.DEBUG);
//CELLS.add(CELL);
PARAMETERS_PANEL.add(CELLS, "relax");
//SCENE.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1),
//	new THREE.MeshPhysicalMaterial({ color: "Grey" })));

/*const WIREFRAME = new THREE.LineSegments
	(new THREE.EdgesGeometry(CUBE.geometry));
SCENE.add(WIREFRAME);
WIREFRAME.visible = false;
const WIREFRAME_PARAMETERS
	= PARAMETERS_PANEL.addFolder("Wireframe").close();
WIREFRAME_PARAMETERS.add(WIREFRAME, "visible");
WIREFRAME_PARAMETERS.add(WIREFRAME.material, "transparent");
WIREFRAME_PARAMETERS
	.add(WIREFRAME.material, "opacity").min(0).max(1);
WIREFRAME_PARAMETERS
	.add(WIREFRAME.material, "linewidth").min(0).max(10);
WIREFRAME_PARAMETERS
	.add(WIREFRAME.material.color, "r").min(0).max(1);
WIREFRAME_PARAMETERS
	.add(WIREFRAME.material.color, "g").min(0).max(1);
WIREFRAME_PARAMETERS
	.add(WIREFRAME.material.color, "b").min(0).max(1);
//console.debug(WIREFRAME);*/



const LIGHT = new THREE.AmbientLight();
//light.intensity = .1 // 1
LIGHT.position.x = 1;
LIGHT.position.y = 2;
LIGHT.position.z = 3;
SCENE.add(LIGHT);

document.addEventListener("DOMContentLoaded",
	_DOMContentLoaded => {
		/**
		 * @param {Event} DOMContentLoaded
		 * @see
	https://gist.github.com/paulirish/5d52fb081b3570c81e3a
		 */
		PARAMETERS_PANEL
			.add(CONTAINER, "clientWidth").listen().disable();
		PARAMETERS_PANEL
			.add(CONTAINER, "clientHeight").listen().disable();

		//PARAMETERS_PANEL.addColor(CUBE.material, "color");
		/*PARAMETERS_PANEL.add(CUBE.material,"roughness",0,1);
		PARAMETERS_PANEL.add(CUBE.material,"metalness", 0, 1 );
		PARAMETERS_PANEL.add(LIGHT, "intensity", 0, 1);*/
	}
);


// Make the camera further from
// the cube so we can see it better
camera.position.z = 5;
/* CONTROLS.update() must be called after any
 * manual changes to the camera's transform.
 */
CAMERA_CONTROLS.update();




const pointer = new THREE.Vector2();
const pointerPanel =
	PARAMETERS_PANEL.addFolder("POINTER")
	/*.openAnimated(true)*/;
pointerPanel.add(pointer, "x").disable().listen();
pointerPanel.add(pointer, "y").disable().listen();
//document.addEventListener
//	("DOMContentLoaded",_DOMContentLoaded=>{
RENDERER.domElement
	.addEventListener("pointermove", setPointerCoords);
/**Calculates pointer position in normalized device coordinates.
 * (`-1` to `+1`) for both components.
 * @param{PointerEvent}pointerEvent*/
function setPointerCoords(pointerEvent) {
	pointer.x = (pointerEvent.offsetX
		/ /** @type{HTMLElement} */
		(pointerEvent.target).clientWidth) * 2 - 1;
	pointer.y = (pointerEvent.offsetY
		/ /**@type{HTMLElement}*/
		(pointerEvent.target).clientHeight) * -2 + 1;
};
RENDERER.domElement
	.addEventListener("pointerenter", setPointerCoords);
//});

const RESIZE_OBSERVER = new ResizeObserver(onContainerResize);
document.addEventListener("DOMContentLoaded",
	_DOMContentLoaded => { RESIZE_OBSERVER.observe(CONTAINER); }
);

/** @type {ResizeObserverCallback} */
function onContainerResize(entries, observer) {
	console.debug(entries, observer);
	//CANVAS.width=100;//CANVAS.removeAttribute("width" );
	const WIDTH = CSS.supports("display", "flex")
		? CONTAINER.clientWidth
		: document.documentElement.clientWidth;
	const HEIGHT = CSS.supports("display", "flex")
		? Math.min(CONTAINER.clientHeight
			//,document.documentElement.clientHeight
		) : document.documentElement.clientHeight;

	/*
		if (CSS.supports("display", "flex")) {
			console.debug("flexing...");
			const WIDTH = CONTAINER.clientWidth;
			const HEIGHT = CONTAINER.clientHeight;
		} else {
			console.debug("look mom no flex!");
			const WIDTH
			= .75 * document.documentElement.clientWidth;
			const HEIGHT
			=	 .75 * document.documentElement.clientHeight;
		}*/


	/* Sanity clamp.
 Try disabling css without this for an everscroll.*
	const WIDTH = Math.min(
 CONTAINER.clientWidth,document.documentElement.clientWidth	);
	const HEIGHT = Math.min(
CONTAINER.clientHeight,document.documentElement.clientHeight);
	//*/
	//console.debug("a");
	//RENDERER.setSize(8, 8, true);

	//console.debug("b");
	//console.debug("b");

	//console.debug("c");*/
	//debug("CANVAS", CANVAS.outerHTML, CANVAS.style);
	//CANVAS.removeAttribute("width");
	//CANVAS.removeAttribute("height");
}

/** @param {MouseEvent} mouseEvent */ function
	onClick(mouseEvent) { console.debug(mouseEvent, "TODO"); }
RENDERER.domElement.addEventListener("click", onClick);




const ray = new THREE.Raycaster();

const controls
	= { extrude: function() { return CELLS.extrude(ray); } };

//debug(window.extrude);
PARAMETERS_PANEL.add(controls, "extrude");
//debug(CELLS.extrude, alert);



//PROGRESS.max += 1;
CUBE_TEXTURE_PROMISE.then(
	//** @type {THREE.CubeTexture} */
	cubeTexture => {
		console.time(cubeTexture);
		//SCENE.add(new THREE.Mesh(
		//	new THREE.BoxGeometry(1, 1, 1),
		//	new THREE.MeshPhongMaterial({ color: "Grey" })));
		//THREE.CubeRefractionMapping
		//THREE.CubeReflectionMapping
		cubeTexture.mapping = THREE.CubeReflectionMapping;
		PARAMETERS_PANEL.add(cubeTexture, "mapping", [
			THREE.CubeReflectionMapping,
			THREE.CubeRefractionMapping
		]).onChange(() => cubeTexture.needsUpdate = true);
		SCENE.background = cubeTexture;
		/*PARAMETERS_PANEL.add(SCENE.background,
			"mapping").name("background");*/;
		SCENE.environment = cubeTexture;
		PARAMETERS_PANEL.add
			(SCENE.environment, "mapping",).name("environment");
		console.debug(SCENE.environment);
		/*SCENE.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1),
				new THREE.MeshPhongMaterial({color: "Grey",
					//roughness: 0,
					//envMap: /*new THREE.PMREMGenerator
					//	(RENDERER).fromCubemap*//*(cubeTexture)
				})));*/;

		PROGRESS.value += 1;
		PROGRESS.hidden = true; console.timeEnd(cubeTexture);
	},
	reason => {
		PROGRESS.value += 1;
		PROGRESS.hidden = true;
		console.error(reason);
	}
);




console.debug(SCENE);
render();




function render() {
	// Rotate the cube every frame
	/*CUBE.mesh.rotation.x += 0.005;/**/
	/*CUBE.mesh.rotation.y -= 0.005;/**/
	//CELLS.select(pointer, camera);

	/* Required if CONTROLS.enableDamping or
	 * CONTROLS.autoRotate are set to true.
	 */
	CAMERA_CONTROLS.update();

	//ray.setFromCamera(pointer, camera);


	// TODO: Test if it works with CSS disabled.

	//CANVAS.removeAttribute("width");
	//CANVAS.removeAttribute("height");
	//debug(CANVAS.clientWidth, CANVAS.clientHeight);
	//renderer.setSize
	//	(CANVAS.clientWidth, CANVAS.clientHeight, false);
	camera.aspect = CANVAS.clientWidth / CANVAS.clientHeight;
	camera.updateProjectionMatrix();


	RENDERER.render(SCENE, camera);
	//debug(this);
	requestAnimationFrame(render);
}


