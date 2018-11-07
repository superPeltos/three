console.log('\u2661 \u2661 \u2661 ');
console.log('Wesh les copains !');
console.log('\u2661 \u2661 \u2661 ');

var renderer, scene, camera,sphere;

planetes = [];
satellites = [];
pivots = [];

function createPlanete(name, size, texture,x,y,z,hasSatellite){
  new THREE.SphereGeometry(size, 60, 60);
  var sphereGeometry = new THREE.SphereGeometry(size, 60, 60);
  var texture = new THREE.TextureLoader().load( texture);
  var material = new THREE.MeshBasicMaterial( { map: texture } );
  sphere = new THREE.Mesh(sphereGeometry, material);
  sphere.position.set(x,y,z);
  planetes.push(sphere);
  pivotPoint = new THREE.Object3D();
  if(hasSatellite && hasSatellite.length > 0){
    hasSatellite.forEach(function(element){
      addSatellite(element.name, element.size, element.texture,element.x,element.y,element.z);
    });
  }
  return true
}

function setLight(){
  var light = new THREE.PointLight( 0xEAF2F8, 1, 100 );
  light.position.set( 50, 50, 50 );
  scene.add( light );
}

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x21252d));

  setLight();

  var moon = {
    name : 'moon',
    size : 1,
    texture : 'moon.jpg',
    x : 0,
    y : 0,
    z: 30
  };
  var alpha = {
    name : 'alpha',
    size : 1,
    texture : 'moon.jpg',
    x : 0,
    y : 0,
    z: 40
  };
  createPlanete('earth',10,'terre.jpg',0,0,0,[moon,alpha]);

  planetes.forEach(function(element) {
    scene.add(element);
  });

  camera.position.x = -30;
  camera.position.y = 20;
  camera.position.z = 30;
  camera.lookAt(scene.position);
  resize();
  window.onresize = resize;
  document.getElementById("container").appendChild(renderer.domElement);
}

function createSatellite(name, size, texture,x,y,z){
  new THREE.SphereGeometry(size, 60, 60);
  var sphereGeometry = new THREE.SphereGeometry(size, 60, 60);
  var texture = new THREE.TextureLoader().load( texture);
  var material = new THREE.MeshBasicMaterial( { map: texture } );
  sphere = new THREE.Mesh(sphereGeometry, material);
  sphere.position.set(x,y,z);
  sphere.name = name;
  return sphere;
}

function addSatellite(name,size,file,x,y,z){
  pivotPoint = new THREE.Object3D();
  pivotPoint.name = name + '-pivot';
  planetes[0].add(pivotPoint);
  satellites.push(createSatellite(name,size,file,x,y,z));

  pivots.push(pivotPoint);

  var indexSatellites = satellites.findIndex(function(element){
    return element.name === name
  });
  pivotPoint.add(satellites[indexSatellites]);
  return true;
}

function selectPivot(name){
  return pivots.findIndex(function(element){
    return element.name === name + '-pivot';
  });

}

function animate() {
  /*var scale = document.getElementById( "scale" ).value / 200;
  scene.scale.x = scene.scale.y = scene.scale.z = scale;*/
  planetes.forEach(function(element) {
    element.rotation.y += 0.01;
  });
  pivots[selectPivot('moon')].rotation.y += 0.005;
  pivots[selectPivot('alpha')].rotation.y += 0.01;
  requestAnimationFrame( animate );

  renderer.render( scene, camera );
}

function resize() {
  var aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
}

document.addEventListener('mousemove',onMouseMove,false);
function onMouseMove(event){
  var mouseX = event.clientX - window.innerWidth / 2;
  var mouseY = event.clientY - window.innerHeight / 2;
  camera.position.x += (mouseX - camera.position.x) * 0.9;
  camera.position.y += (mouseY - camera.position.y) * 0.9;
  camera.lookAt(scene.position);
  renderer.render(scene,camera);
}

init();
animate();



