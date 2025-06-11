<script setup>
import { ref, watch } from 'vue'; // Asegúrate que defineProps esté importado

// 1. Definir las props que este formulario aceptará
const props = defineProps({
  titulo: { // Título del formulario (ej. "Modificar Tarea")
    type: String,
    required: false,
    default: 'Formulario de Tarea'
  },
  textoBotonSubmit: { // Texto para el botón de envío (ej. "Guardar Cambios")
    type: String,
    default: 'Enviar Tarea' // Un default genérico
  },
  datosIniciales: { // La tarea a editar, si se provee (para precargar)
    type: Object,
    default: null
  }
});

// 2. Función para obtener el estado inicial/limpio de una tarea
const getEstadoTareaLimpio = () => ({
  titulo: "",
  descripcion: "",
  prioridad: "",
  fechaLimite: "",
  categoria: "",
  completada: false,
  id: null,
});

// 3. Ref para los datos actuales del formulario
const tareaActual = ref(getEstadoTareaLimpio());

// 4. WATCH para la PRECARGA de datos:
//    Se ejecuta cuando el componente se monta y cada vez que props.datosIniciales cambia.
watch(() => props.datosIniciales, (nuevosDatos) => {
  if (nuevosDatos) {
    // Si hay datosIniciales, estamos editando. Copiamos los datos.
    console.log("Formulario: Recibiendo datos iniciales para editar:", nuevosDatos);
    tareaActual.value = { ...nuevosDatos }; // Clonamos para evitar mutar la prop directamente
  } else {
    // Si no hay datosIniciales, estamos agregando una nueva tarea o el modal se limpió.
    console.log("Formulario: No hay datos iniciales, reseteando formulario.");
    tareaActual.value = getEstadoTareaLimpio();
  }
}, { immediate: true }); // 'immediate: true' para que se ejecute al montar.

// 5. Definir los emits. Cambiamos 'agregarTarea' por uno más genérico.
const emit = defineEmits(['submitFormulario']); // O 'formularioEnviado', etc.

// 6. Lógica de envío del formulario
const manejarSubmit = () => {
  if (!tareaActual.value.titulo.trim()) {
    alert("El título es obligatorio.");
    return;
  }
  if (!tareaActual.value.prioridad) {
    alert("Por favor, selecciona una prioridad.");
    return;
  }
  if (!tareaActual.value.categoria) {
    alert("Por favor, selecciona una categoría.");
    return;
  }

  // Preparamos el objeto tarea para emitir.
  // Si estamos agregando (no hay props.datosIniciales), generamos un nuevo ID.
  // Si estamos editando, props.datosIniciales (y por tanto tareaActual.value.id) ya tiene el ID.
  const tareaParaEmitir = { ...tareaActual.value };
  if (!props.datosIniciales && !tareaActual.value.id) { // Doble chequeo por si acaso
    tareaParaEmitir.id = Date.now() + Math.random().toString(36).substring(2, 9);
  }

  console.log("Formulario: Emitiendo submitFormulario con:", tareaParaEmitir);
  emit('submitFormulario', tareaParaEmitir);

  // No es necesario resetear aquí si el modal se cierra.
  // Si el modal permanece abierto para agregar otra tarea, entonces sí
  // y solo si no estábamos en modo edición.
  // if (!props.datosIniciales) {
  //   tareaActual.value = getEstadoTareaLimpio();
  // }
};

</script>

<template>
  <div class="formulario-container">
    <!-- Usamos la prop 'titulo' -->
    <h3>{{ props.titulo }}</h3>
    <form @submit.prevent="manejarSubmit">

      <div class="form-group">
        <label for="titulo">Título:</label>
        <!-- v-model ahora apunta a tareaActual.titulo -->
        <input v-model.trim="tareaActual.titulo" type="text" id="titulo" name="titulo">
      </div>

      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <textarea v-model="tareaActual.descripcion" id="descripcion" name="descripcion" rows="3"></textarea>
      </div>

      <div class="form-group">
        <label for="prioridad">Selecciona la prioridad:</label>
        <select v-model="tareaActual.prioridad" name="prioridad" id="prioridad">
          <option disabled value="">-- Selecciona una prioridad --</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
      </div>

      <div class="form-group">
        <label for="fechaLimite">Fecha límite:</label>
        <input v-model="tareaActual.fechaLimite" type="date" id="fechaLimite" name="fechaLimite">
      </div>

      <div class="form-group">
        <label for="categoria">Selecciona la categoría:</label>
        <select v-model="tareaActual.categoria" name="categoria" id="categoria">
          <option disabled value="">-- Selecciona una categoría --</option>
          <option value="Trabajo">Trabajo</option>
          <option value="Personal">Personal</option>
          <option value="Desarrollo Profesional">Desarrollo Profesional</option>
        </select>
      </div>

      <!-- Usamos la prop 'textoBotonSubmit' para el texto del botón -->
      <button type="submit" class="submit-btn">{{ props.textoBotonSubmit }}</button>
    </form>
  </div>
</template>

<style scoped>
/* Tus estilos para el formulario. Puedes copiar los que te sugerí antes si te gustan. */
.formulario-container {
  padding: 15px;
  /* border: 1px solid #eee; */ /* Lo quito si el modal ya tiene borde */
  border-radius: 5px;
  /* background-color: #fdfdfd; */ /* Lo quito si el modal ya tiene fondo */
}
.form-group {
  margin-bottom: 10px;
}
.form-group label {
  display: block;
  margin-bottom: 3px;
  font-size: 0.9em;
  color: #333;
}
.form-group input,
.form-group textarea,
.form-group select {
  width: calc(100% - 16px);
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Añadido para mejor manejo del width */
}
.submit-btn {
  background-color: #5cb85c;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
.submit-btn:hover {
  background-color: #4cae4c;
}
</style>