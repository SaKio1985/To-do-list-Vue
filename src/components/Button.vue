<script setup>
defineProps({
  titulo: {
    type: String,
    required: false

  }
});
const emit= defineEmits(['click']);
</script>

<template>
  <button @click="emit('click')" name="boton">{{ titulo }}</button>

</template>

<style scoped>
button {
  background-color: crimson;
}
</style>
