let camera, scene, renderer;
let model;

run();

async function run() {
  console.log("Running...");
  await init();
  console.log("Starting animation...");
  animate();
}
//init();
//animate();

async function init() {
  console.log("Initializing scene...");
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 1, 4);
  camera.lookAt(0,0.5,0);
  scene = new THREE.Scene();
  
  scene.background = new THREE.Color("rgb(70%, 80%, 80%)");
  
  const light = new THREE.AmbientLight( "rgb(70%, 80%, 80%)" ); // soft white light
  scene.add( light );
  
  const directionalLight = new THREE.DirectionalLight( 0xffffff);
  scene.add( directionalLight );
  
  const loader = new THREE.GLTFLoader();
  model = await modelLoader(loader, 'https://raw.githubusercontent.com/BitPupper/BitPupper.github.io/main/assets/snowman.gltf');
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
	document.body.appendChild( renderer.domElement );
  
  window.addEventListener('resize', onWindowResize );
  
  console.log("Finished initializing");
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );
  
	scene.rotation.y += 0.01;

	renderer.render( scene, camera );
}

//Function from looeee with some modifications, since I was having trouble with the model loading later than it needed to:
//https://discourse.threejs.org/t/most-simple-way-to-wait-loading-in-gltf-loader/13896/5
function modelLoader(loader, url) {
  console.log("modelLoader called");
  return new Promise((resolve, reject) => {
    loader.load(url, 
                (gltf) => {
      resolve(gltf);
      console.log("Found model");
      scene.add(gltf.scene);
      return gltf.scene;
    },
                function (xhr) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    }, 
               function (error) {
      console.log('Error: Could not load model');
    }
      );
  });
}