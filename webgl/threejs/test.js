/*
Threejs ejemplos: Cubo RGB con textura
  Cubo con color por vertice y mapa de uvs usando la clase Geometry.
  La textura es una unica imagen en forma de cubo desplegado en cruz horizontal.
  Cada cara se textura segun mapa uv en la textura.
  En sentido antihorario las caras son:
    Delante:   7,0,3,4
    Derecha:   0,1,2,3
    Detras:    1,6,5,2
    Izquierda: 6,7,4,5
    Arriba:    4,3,2,5
    Abajo:     7,6,1,0 

rvivo@upv.es 2015
*/


var renderer, scene, camera, cubo, floorMat, bulbLight, bulbMat, hemiLight,cartel;
var cameraControls;
var angulo = -0.01;
var sliderVRotacion;
var sliderPosXCamara;
var sliderPosYCamara;
var sliderPosZCamara;
var aspectRatio;
var width = window.innerWidth / 2;
var height = window.innerHeight / 2;
var colorPickerLuz;
init();
loadCubo(1.0);
render();

function init() {
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);
    renderer.setClearColor(new THREE.Color(0xffffff));
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMapEnabled = true;
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('container').appendChild(renderer.domElement);

    sliderVRotacion = document.getElementById("sliderVRotacion");
    scene = new THREE.Scene();

    aspectRatio = width / height;
    camera = new THREE.PerspectiveCamera(50, aspectRatio, 0.1, 100);
    sliderPosXCamara = document.getElementById("sliderPosXCamara");
    sliderPosYCamara = document.getElementById("sliderPosYCamara");
    sliderPosZCamara = document.getElementById("sliderPosZCamara");
    colorPickerLuz = document.getElementById("colorPickerLuz");
    camera.position.set(3, 2, 3);

    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
    cameraControls.target.set(0, 0, 0);

    window.addEventListener('resize', updateAspectRatio);
    var bulbGeometry = new THREE.SphereBufferGeometry(0.2, 16, 8);
    bulbLight = new THREE.PointLight(0xffffff, 1, 100, 2);
    bulbMat = new THREE.MeshStandardMaterial({
        emissive: 0xffffff,
        emissiveIntensity: 100,
        color: 0xffffff
    });

    bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
    bulbLight.position.set(4, 4, 4);
    bulbLight.castShadow = true;
    bulbLight.power = 30;
    scene.add(bulbLight);
    hemiLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 1);
    scene.add(hemiLight);

    floorMat = new THREE.MeshStandardMaterial({
        roughness: 0.8,
        color: 0xffffff,
        metalness: 0.95,
        bumpScale: 0.06
    });
    var textureLoader = new THREE.TextureLoader();
    textureLoader.load("images/hardwood2_diffuse.jpg", function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 8;
        map.repeat.set(10, 24);
        floorMat.map = map;
        floorMat.needsUpdate = true;
    });
    textureLoader.load("images/hardwood2_bump.jpg", function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 8;
        map.repeat.set(10, 24);
        floorMat.bumpMap = map;
        floorMat.needsUpdate = true;
    });
    textureLoader.load("images/hardwood2_roughness.jpg", function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 8;
        map.repeat.set(10, 24);
        floorMat.roughnessMap = map;
        floorMat.needsUpdate = true;
    });

    var floorGeometry = new THREE.PlaneBufferGeometry(40, 40);
    var floorMesh = new THREE.Mesh(floorGeometry, floorMat);
    floorMesh.receiveShadow = true;
    floorMesh.rotation.x = -Math.PI / 2.0;
    cartel = new THREE.Object3D();
    loadScene();
    scene.add(floorMesh);
}

function loadCubo(lado) {
    // Instancia el objeto Geometry
    var malla = new THREE.Geometry();
    // Construye la lista de coordenadas y colores por vertice (8)
    var semilado = lado / 2.0;
    var coordenadas = [
        semilado, -semilado, semilado,  // 0
        semilado, -semilado, -semilado,  // 1
        semilado, semilado, -semilado,  // 2
        semilado, semilado, semilado,  // 3
        -semilado, semilado, semilado,  // 4
        -semilado, semilado, -semilado,  // 5
        -semilado, -semilado, -semilado,  // 6
        -semilado, -semilado, semilado   // 7
    ];
    var colores = [
        0xFF0000,   // 0
        0xFF00FF,   // 1
        0xFFFFFF,   // 2
        0xFFFF00,   // 3
        0x00FF00,   // 4
        0x00FFFF,   // 5
        0x0000FF,   // 6
        0x000000    // 7
    ];
    // Indica como enlazar los vertices para formar triangulos (12)
    var indices = [
        7, 0, 3, 7, 3, 4, // Front
        0, 1, 2, 0, 2, 3, // Right
        1, 6, 5, 1, 5, 2, // Back
        6, 7, 4, 6, 4, 5, // Left
        4, 3, 2, 4, 2, 5, // Top
        0, 7, 6, 0, 6, 1  // Bottom
    ];
    var normales = [
        0, 0, 1, 0, 0, 1,   // Front
        1, 0, 0, 1, 0, 0,   // Right
        0, 0, -1, 0, 0, -1, // Back
        -1, 0, 0, -1, 0, 0, // Left
        0, 1, 0, 0, 1, 0,   // Top
        0, -1, 0, 0, -1, 0  // Bottom
    ];
    var uvs = [new THREE.Vector2(1 / 4, 1 / 3), new THREE.Vector2(2 / 4, 1 / 3), new THREE.Vector2(2 / 4, 2 / 3), // 7,0,3
        new THREE.Vector2(1 / 4, 1 / 3), new THREE.Vector2(2 / 4, 2 / 3), new THREE.Vector2(1 / 4, 2 / 3), // 7,3,4
        new THREE.Vector2(2 / 4, 1 / 3), new THREE.Vector2(3 / 4, 1 / 3), new THREE.Vector2(3 / 4, 2 / 3), // 0,1,2
        new THREE.Vector2(2 / 4, 1 / 3), new THREE.Vector2(3 / 4, 2 / 3), new THREE.Vector2(2 / 4, 2 / 3), // 0,2,3
        new THREE.Vector2(3 / 4, 1 / 3), new THREE.Vector2(4 / 4, 1 / 3), new THREE.Vector2(4 / 4, 2 / 3), // 1,6,5
        new THREE.Vector2(3 / 4, 1 / 3), new THREE.Vector2(4 / 4, 2 / 3), new THREE.Vector2(3 / 4, 2 / 3), // 1,5,2
        new THREE.Vector2(0 / 4, 1 / 3), new THREE.Vector2(1 / 4, 1 / 3), new THREE.Vector2(1 / 4, 2 / 3), // 6,7,4
        new THREE.Vector2(0 / 4, 1 / 3), new THREE.Vector2(1 / 4, 2 / 3), new THREE.Vector2(0 / 4, 2 / 3), // 6,4,5
        new THREE.Vector2(1 / 4, 2 / 3), new THREE.Vector2(2 / 4, 2 / 3), new THREE.Vector2(2 / 4, 3 / 3), // 4,3,2
        new THREE.Vector2(1 / 4, 2 / 3), new THREE.Vector2(2 / 4, 3 / 3), new THREE.Vector2(1 / 4, 3 / 3), // 4,2,5
        new THREE.Vector2(2 / 4, 1 / 3), new THREE.Vector2(1 / 4, 1 / 3), new THREE.Vector2(1 / 4, 0 / 3), // 0,7,6
        new THREE.Vector2(2 / 4, 1 / 3), new THREE.Vector2(1 / 4, 0 / 3), new THREE.Vector2(2 / 4, 0 / 3), // 0,6,1
    ];


    // Construye vertices y los inserta en la malla
    for (var i = 0; i < coordenadas.length; i += 3) {
        var vertice = new THREE.Vector3(coordenadas[i], coordenadas[i + 1], coordenadas[i + 2]);
        malla.vertices.push(vertice);
    }

    // Construye caras y las inserta en la malla
    for (var i = 0; i < indices.length; i += 3) {
        // Formar la cara
        var triangulo = new THREE.Face3(indices[i], indices[i + 1], indices[i + 2]);
        // Indicar la normal por vertice
        triangulo.normal = new THREE.Vector3(normales[i], normales[i + 1], normales[i + 2]);
        // Indicar el color por vertice

        // Añadir a la lista de caras
        malla.faces.push(triangulo);
        // Añadir las coordenadas de textura por vertice de la cara añadida
        malla.faceVertexUvs[0].push([uvs[i], uvs[i + 1], uvs[i + 2]]);
    }

    // Configura un material
    var textura = new THREE.ImageUtils.loadTexture('images/brandon.png');
    var material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: textura,
        side: THREE.DoubleSide,
        roughness: 0.5,
        metalness: 0.8
    });
    // Construye el objeto grafico
    cubo = new THREE.Mesh(malla, material);
    cubo.castShadow = true;
    // Añade el objeto grafico a la escena
    scene.add(cubo);
}

function updateAspectRatio() {
    renderer.setSize(width, height);
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
}

function loadScene(){
	var mvto1 = new TWEEN.Tween( bulbLight.position ).to( {y:[4.0, 4.0]},4000 );
	mvto1.interpolation( TWEEN.Interpolation.Bezier );
	cartel.add(bulbLight);
	scene.add( cartel );
	mvto1.start();
	
}

function update() {
    // Cambios para actualizar la camara segun mvto del raton
    cameraControls.update();
    // Movimiento propio del cubo
    cubo.rotateOnAxis(new THREE.Vector3(0, (sliderVRotacion.value / 25), 0), angulo);
    cubo.position.set(sliderPosXCamara.value/10, sliderPosYCamara.value/10, sliderPosZCamara.value/10);
    var color = hexToRgb(colorPickerLuz.value);
    bulbLight.color = new THREE.Color(color.r, color.g, color.b);
    cartel.rotation.y -= Math.PI/15 * 0.3 ;
    TWEEN.update();

}

function render() {
    requestAnimationFrame(render);
    update();
    renderer.render(scene, camera);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
