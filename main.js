// Importa las dependencias de three.js y OrbitControls
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Inicializa la escena, la cámara, el renderizador y los controles
let scene, camera, renderer, controls, currentPoint;
const puntos = [];

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3; // Ajusta la posición para que la cámara esté más lejos del cubo

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas3D').appendChild(renderer.domElement);

    // Agregar controles de órbita
    controls = new OrbitControls(camera, renderer.domElement);

    // Crear un cubo con las esquinas representando A, T, C, G
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff })); 2
    scene.add(line);

    currentPoint = new THREE.Vector3(0, 0, 0); // Punto inicial en el centro

    // Asegúrate de que la escena se renderice
    renderer.render(scene, camera);

    // Ajusta el tamaño si la ventana cambia
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function graficaSecuencia() {
    const secuencia = document.getElementById('secuencia').value.toUpperCase();
    const errorElement = document.getElementById('error');

    if (!/^[ATCG]*$/.test(secuencia) || secuencia === '') {
        errorElement.textContent = 'Secuencia no válida. Solo se permiten las letras A, T, C y G.';
        return;
    } else {
        errorElement.textContent = '';
    }

    const colores = {
        A: 0x00ff00, // verde
        T: 0xff0000, // rojo
        C: 0x0000ff, // azul
        G: 0xffa500  // naranja
    };

    // Vertices del cubo
    const vertices = {
        A: new THREE.Vector3(0.5, 0.5, -0.5),  // esquina superior delantera derecha
        T: new THREE.Vector3(0.5, -0.5, -0.5), // esquina inferior delantera derecha
        C: new THREE.Vector3(-0.5, -0.5, 0.5), // esquina inferior trasera izquierda
        G: new THREE.Vector3(0.5, 0.5, 0.5)    // esquina superior trasera derecha
    };

    let i = 0;

    function animar() {
        if (i >= secuencia.length) return;

        const base = secuencia[i];
        const destino = vertices[base];

        // Calcular el nuevo punto como el punto medio entre el actual y el vértice
        currentPoint.lerp(destino, 0.5);

        // Dibujar el nuevo punto
        const geometry = new THREE.SphereGeometry(0.05, 16, 16); // Ajuste del tamaño de la esfera
        const material = new THREE.MeshBasicMaterial({ color: colores[base] });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.copy(currentPoint);

        scene.add(sphere);
        puntos.push(sphere);

        i++;
        renderer.render(scene, camera);
        requestAnimationFrame(animar);
    }

    animar();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Actualiza los controles en cada frame
    renderer.render(scene, camera);
}

init();
animate(); // Comienza la animación
