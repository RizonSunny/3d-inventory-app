<template>
  <div class="app">
    <h1>3D Model Inventory</h1>
    <ModelForm @modelAdded="addModelLocally" />
    <ThreeScene :models="models" />
  </div>
</template>

<script>
import ModelForm from './components/ModelForm.vue';
import ThreeScene from './components/ThreeScene.vue';
import { getModels } from './services/api';

export default {
  components: { ModelForm, ThreeScene },
  data() {
    return { models: [] };
  },
  async created() {
    const { data } = await getModels();
    this.models = data;
  },
  methods: {
    addModelLocally(newModel) {
      this.models.push(newModel);
    }
  }
};
</script>

<style>
.app {
  text-align: center;
  font-family: Arial, sans-serif;
  color: white;
  background: #000;
  min-height: 100vh;
  padding: 20px;
}
h1 { margin-bottom: 10px; }
</style>