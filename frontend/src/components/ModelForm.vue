<template>
  <form @submit.prevent="submit" class="form">
    <input v-model="form.name" placeholder="Name (e.g. Red Cube)" required />
    <input v-model="form.color" placeholder="Color (e.g. #ff0000)" required />
    <input v-model="form.position" placeholder="Position: x,y,z (e.g. 2,0,-3)" required />
    <button type="submit">Add Model</button>
  </form>
</template>

<script>
import { createModel } from '../services/api';

export default {
  emits: ['modelAdded'],
  data() {
    return {
      form: {
        name: '',
        color: '#3388ff',
        position: '0,0,0'
      }
    };
  },
  methods: {
    async submit() {
      const pos = this.form.position.split(',').map(Number);
      const payload = { ...this.form, position: pos };

      try {
        const { data } = await createModel(payload);
        this.$emit('modelAdded', data);
        this.form = { name: '', color: '#3388ff', position: '0,0,0' };
      } catch (err) {
        alert('Error adding model');
      }
    }
  }
};
</script>

<style scoped>
.form { margin: 30px auto; max-width: 600px; }
input, button { margin: 10px; padding: 12px; font-size: 16px; width: 80%; }
button { background: #42b983; color: white; border: none; cursor: pointer; }
</style>