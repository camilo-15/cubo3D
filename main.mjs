function init() {
    const scene = new THREE.Scene();
    console.log("Escena inicializada:", scene); // <-- Depuración aquí

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    console.log("Cámara configurada:", camera); // <-- Depuración aquí

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    console.log("Cubo añadido a la escena:", cube); // <-- Depuración aquí

    camera.position.z = 5;

    const controls = new OrbitControls(camera, renderer.domElement);
    console.log("Controles de órbita:", controls); // <-- Depuración aquí

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
        console.log("Animación ejecutada"); // <-- Depuración aquí
    }
    animate();
}
