var renderer, scene, camera,sphere;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xEEEEEE));
  renderer.setSize(window.innerWidth/2, window.innerHeight/2);
  var sphereGeometry = new THREE.SphereGeometry(10, 60, 60);

  var texture = new THREE.TextureLoader().load( 'terre.jpg' );
  var material = new THREE.MeshBasicMaterial( { map: texture } );
  sphere = new THREE.Mesh(sphereGeometry, material);
  scene.add(sphere);
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);
  resize();
  window.onresize = resize;
  document.getElementById("container").appendChild(renderer.domElement);
}

function animate() {
  var scale = document.getElementById( "scale" ).value / 100;
  scene.scale.x = scene.scale.y = scene.scale.z = scale;
  sphere.rotation.x += 0.01;
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}

function resize() {
  var aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
}

init();
animate();



