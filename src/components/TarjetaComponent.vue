<script setup>
import Button from "./Button.vue";
import ModalComponent from "./ModalComponent.vue";
import { ref } from "vue";

const props = defineProps({
  tarea: {
    type: Object,
    required: true,
  },
});

// PASO 1: Ajustar los 'emits'
const emit = defineEmits(["borrarTarea", "tareaActualizada"]);

// PASO 2: Estado para controlar la visibilidad del modal
const isModalVisible = ref(false);

// PASO 3: Estado para almacenar la tarea que se está editando
const tareaSiendoEditada = ref(null);

// PASO 4: Función para manejar el borrado
const handleBorrar = () => {
  emit("borrarTarea", props.tarea.id);
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
  emit("tareaActualizada", tareaModificada);
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

    <Button @click="handleBorrar" titulo="Borrar" class="boton-borrar" />

    <!-- PASO 8: Cambiar el handler del botón "Modificar". -->
    <Button
      @click="handleAbrirModalParaModificar"
      titulo="Modificar"
      class="boton-modificar"
    />

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
  width: 300px; /* Ancho fijo para las tarjetas */
  min-height: 200px; /* Altura mínima */
  background-color: aliceblue;
  color: black;
  border-width: 3px;
  border-style: solid;
  border-radius: 12px;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.tarjeta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.tarjeta-contenido {
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.tarjeta-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.titulo {
  font-size: 1.2em;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
  flex: 1;
  margin-right: 8px;
}

.prioridad-badge {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 500;
  white-space: nowrap;
}

.tarjeta-info {
  flex: 1;
  margin-bottom: 16px;
}

.descripcion {
  font-size: 0.9em;
  line-height: 1.4;
  margin: 0 0 12px 0;
  color: #555;
}

.metadata {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}

.categoria,
.fecha {
  font-size: 0.8em;
  margin: 0;
  color: #666;
  font-weight: 500;
}

.tarjeta-acciones {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.tarjeta-acciones button {
  font-size: 0.8em;
  padding: 6px 12px;
}

/* Colores por prioridad */
.alta {
  background-color: #fee;
  border-color: #e74c3c;
}

.media {
  background-color: #fff8e7;
  border-color: #f39c12;
}

.baja {
  background-color: #f0fff4;
  border-color: #2ecc71;
}

.boton-borrar {
  background-color: #6c757d !important;
  color: white;
}

.boton-borrar:hover {
  background-color: #5a6268 !important;
}

.boton-modificar {
  background-color: #17a2b8 !important;
  color: white;
}

.boton-modificar:hover {
  background-color: #138496 !important;
}

/* Responsive para móviles */
@media (max-width: 768px) {
  .tarjeta {
    width: 100%;
    max-width: 350px;
  }

  .metadata {
    flex-direction: column;
    gap: 4px;
  }

  .tarjeta-acciones {
    justify-content: center;
  }
}
</style>
