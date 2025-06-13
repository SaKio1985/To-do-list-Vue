<script setup>
import { ref } from "vue";
import TarjetaComponent from "./components/TarjetaComponent.vue";
import Button from "./components/Button.vue";
import Formulario from "./components/Formulario.vue"; // Este es el Formulario.vue refactorizado

const tareasPendientes = ref([
  // ... tus tareas iniciales ...
  {
    id: 1,
    titulo: "Preparar presentación",
    descripcion: "Crear diapositivas para la reunión del lunes",
    prioridad: "Alta",
    fechaLimite: "2025-04-15",
    completada: false,
    categoria: "Trabajo",
  },
  {
    id: 2,
    titulo: "Comprar provisiones",
    descripcion: "Ir al supermercado por productos básicos",
    prioridad: "Media",
    fechaLimite: "2025-04-12",
    completada: false,
    categoria: "Personal",
  },
  {
    id: 3,
    titulo: "Actualizar portfolio",
    descripcion: "Agregar nuevos proyectos y mejorar diseño",
    prioridad: "Baja",
    fechaLimite: "2025-05-01",
    completada: false,
    categoria: "Desarrollo Profesional",
  },
]);

const ordenarTareas = () => {
  tareasPendientes.value.sort((a, b) => a.titulo.localeCompare(b.titulo));
};
const ordenarCategorias = () => {
  tareasPendientes.value.sort((a, b) => a.categoria.localeCompare(b.categoria));
};

// La función 'agregartarea' recibe la tarea del evento 'submitFormulario'
const agregartarea = (nuevatarea) => {
  tareasPendientes.value.push(nuevatarea);
};

const borrarTarea = (id) => {
  tareasPendientes.value = tareasPendientes.value.filter((t) => t.id !== id);
};

// La función 'modificarTarea' recibe la tarea del evento 'tareaActualizada'
const modificarTarea = (tareaActualizada) => {
  const index = tareasPendientes.value.findIndex(
    (t) => t.id === tareaActualizada.id
  );
  if (index !== -1) {
    tareasPendientes.value[index] = tareaActualizada;
    console.log(
      "App.vue: Tarea actualizada en la lista:",
      tareasPendientes.value[index]
    );
  } else {
    console.warn(
      "App.vue: No se encontró la tarea para actualizar con ID:",
      tareaActualizada.id
    );
  }
};
</script>

<template>
  <h1>TO DO LIST</h1>
  <Button @click="ordenarTareas" titulo="Ordenar Alfabéticamente por titulo" />
  <Button
    @click="ordenarCategorias"
    titulo="Ordenar Alfabéticamente por Categorias"
  />

  <!-- Formulario para agregar nuevas tareas -->
  <Formulario
    @submitFormulario="agregartarea"
    titulo="Nueva tarea"
    texto-boton-submit="Agregar Tarea"
    :datos-iniciales="null"
  />

  <div class="tareas">
    <TarjetaComponent
      v-for="tarea in tareasPendientes"
      :tarea="tarea"
      :key="tarea.id"
      @borrarTarea="borrarTarea"
      @tareaActualizada="modificarTarea"
    />
  </div>
</template>

<style scoped>
.tareas {
  display: flex;
  flex-direction: row; /* Cambiado a row para disposición horizontal */
  flex-wrap: wrap; /* Permite que las tarjetas se envuelvan a la siguiente línea */
  gap: 20px; /* Espacio entre tarjetas */
  justify-content: center; /* Centra las tarjetas horizontalmente */
  align-items: flex-start; /* Alinea las tarjetas por arriba en caso de diferentes alturas */
}

/* Media query para dispositivos móviles */
@media (max-width: 768px) {
  .tareas {
    flex-direction: column; /* En móviles vuelve a vertical */
    align-items: center;
  }
}
</style>
