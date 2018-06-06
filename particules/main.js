console.log('coucou');
var container = document.getElementById('container');
var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,1,10000);

var distance = 1000;

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

scene.background = new THREE.Color( 0xffffff );
scene.add(camera);

for (var i = 0; i<100; i++){

  var geometry = new THREE.SphereGeometry(  Math.random() * 10 + 10, 32,32);
  var material = new THREE.MeshBasicMaterial( {color: Math.random() * 0x808080} );
  var particule = new THREE.Mesh( geometry, material );
  particule.position.x = Math.random() * distance * 2 - distance;
  particule.position.y = Math.random() * distance * 2 - distance;
  particule.position.z = Math.random() * distance * 2 - distance;

  scene.add(particule);
}

camera.position.z = distance;


document.addEventListener('mousemove',onMouseMove,false);
function onMouseMove(event){
  var mouseX = event.clientX - window.innerWidth / 2;
  var mouseY = event.clientY - window.innerHeight / 2;
  camera.position.x += (mouseX - camera.position.x) * 0.5;
  camera.position.y += (mouseY - camera.position.y) * 0.5;
  camera.lookAt(scene.position);
  renderer.render(scene,camera);
};


