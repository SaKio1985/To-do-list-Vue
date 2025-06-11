
<script setup>
import Formulario from './Formulario.vue';
import { computed } from 'vue';

const props = defineProps({
  tareaParaEditar: {
    type: Object,
    default: null
  }

});

const emit = defineEmits(['closeModal', 'tareaGuardada']); // 'tareaGuardada' es un evento genérico

const esModoEdicion = computed(() => !!props.tareaParaEditar);

const tituloDelFormulario = computed(() => {
  return esModoEdicion.value ? 'Modificar Tarea' : 'Agregar Nueva Tarea';
});

const textoDelBoton = computed(() => {
  return esModoEdicion.value ? 'Guardar Cambios' : 'Agregar Tarea';
});

const manejarSubmitDesdeFormulario = (datosTarea) => {
  emit('tareaGuardada', datosTarea); // Re-emitir al padre (Tarjeta)
  // Opcional: emit('closeModal');
};

const cerrarEsteModal = () => {
  emit('closeModal');
}
</script>

<template>
  <div class="modal-backdrop" @click.self="cerrarEsteModal">
    <div class="modal-contenido-interno">
      <Formulario
        :titulo="tituloDelFormulario"
        :texto-boton-submit="textoDelBoton"
        :datos-iniciales="props.tareaParaEditar"
        @submit-formulario="manejarSubmitDesdeFormulario"
      />
      <!-- <button @click="cerrarEsteModal">Cancelar</button> -->
    </div>
  </div>
</template>

<style scoped>
/* Estilos del modal backdrop y contenido */
.modal-backdrop { /* ... */ }
.modal-contenido-interno { /* ... */ }
</style>