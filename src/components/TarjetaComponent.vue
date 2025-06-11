      
<script setup>
import Button from './Button.vue';
import ModalComponent from './ModalComponent.vue';
import { ref } from 'vue';

const props = defineProps({
  tarea: {
    type: Object,
    required: true,
  },
});

// PASO 1: Ajustar los 'emits'
const emit = defineEmits(['borrarTarea', 'tareaActualizada']);

// PASO 2: Estado para controlar la visibilidad del modal
const isModalVisible = ref(false);

// PASO 3: Estado para almacenar la tarea que se está editando
const tareaSiendoEditada = ref(null);

// PASO 4: Función para manejar el borrado
const handleBorrar = () => {
  emit('borrarTarea', props.tarea.id);
};

// PASO 5: Modificar la función 'handleModificar' (ahora 'handleAbrirModalParaModificar')
const handleAbrirModalParaModificar = () => {
  tareaSiendoEditada.value = { ...props.tarea };
  isModalVisible.value = true;
};

// PASO 6: Función para cerrar el modal
const cerrarModal = () => {
  isModalVisible.value = false;
  tareaSiendoEditada.value = null;
};

// PASO 7: Función para procesar los datos guardados desde el modal
const procesarTareaGuardadaDesdeModal = (tareaModificada) => {
  emit('tareaActualizada', tareaModificada);
  cerrarModal();
};
</script>

    

      
<template>
<div class="tarjeta" :class="tarea.prioridad.toLowerCase()">
  <h1>{{ tarea.titulo }}</h1>
  <p>{{ tarea.descripcion }}</p>
  <p>{{ tarea.prioridad }}</p>
  <p>{{ tarea.categoria }}</p>
  <p>{{ tarea.fechaLimite }}</p>

  <Button @click="handleBorrar" titulo="Borrar" class="boton-borrar"/>

  <!-- PASO 8: Cambiar el handler del botón "Modificar". -->
  <Button @click="handleAbrirModalParaModificar" titulo="Modificar" class="boton-modificar"/>

  <!-- PASO 9: Modificar cómo se invoca ModalComponent. -->
  <ModalComponent
    v-if="isModalVisible"
    :tarea-para-editar="tareaSiendoEditada"
    @closeModal="cerrarModal"
    @tareaGuardada="procesarTareaGuardadaDesdeModal"
  />
</div>
</template>

  

<style scoped>
.tarjeta {
  background-color: aliceblue;
  color: black;
  border-color: gray;
  border-width: 5px;
  border-style: solid;
  padding: 10px;
  text-align: center;
  border-radius: 8px;
  justify-content: center;
  font-weight: lighter;
}


.alta {
  background-color: #e74c3c; /* Rojo para alta prioridad */
  border-color: #c0392b;
}

.media {
  background-color: #f39c12; /* Naranja para media prioridad */
  border-color: #d35400;
}

.baja {
  background-color: #2ecc71; /* Verde para baja prioridad */
  border-color: #27ae60;
}

.boton-borrar {
  background-color: #6c757d; /* Gris oscuro para borrar */
}

.boton-modificar {
  background-color: #17a2b8; /* Azul turquesa para modificar */
}
</style>
