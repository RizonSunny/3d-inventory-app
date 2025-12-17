<template>
  <div ref="container" class="scene"></div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { markRaw } from 'vue';

export default {
  props: ['models'],
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null
    };
  },
  mounted() {
    this.initScene();
    this.models.forEach(this.addModelToScene);
    this.animate();
  },
  watch: {
    models: {
      handler(newModels) {
        if (!this.scene) return;
        this.clearScene();
        newModels.forEach(this.addModelToScene);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    initScene() {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x111111);
      this.scene = markRaw(scene);

      const camera = new THREE.PerspectiveCamera(60, 800 / 600, 0.1, 1000);
      camera.position.set(6, 5, 8);
      this.camera = markRaw(camera);

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(800, 600);
      this.$refs.container.appendChild(renderer.domElement);
      this.renderer = markRaw(renderer);

      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.enableDamping = true;
      this.controls = markRaw(controls);

      const light = new THREE.DirectionalLight(0xffffff, 1.2);
      light.position.set(10, 10, 5);
      this.scene.add(light);
      this.scene.add(new THREE.AmbientLight(0x666666));
    },
    addModelToScene(model) {
      const [x, y, z] = model.position;
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshPhongMaterial({ color: model.color });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      mesh.userData.name = model.name;
      this.scene.add(mesh);
    },
    clearScene() {
      while (this.scene.children.length > 2) { // keep lights
        this.scene.remove(this.scene.children[2]);
      }
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>

<style scoped>
.scene {
  margin: 20px auto;
  border: 3px solid #444;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
}
</style>