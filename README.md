# 📝 Vue To-Do List Application

A modern, responsive task management application built with Vue 3 and Vite. This application provides an intuitive interface for managing your daily tasks with features like priority levels, categories, and due dates.

![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Features

### Core Functionality
- ✅ **Add Tasks**: Create new tasks with detailed information
- ✏️ **Edit Tasks**: Modify existing tasks through an intuitive modal interface
- 🗑️ **Delete Tasks**: Remove completed or unwanted tasks
- 🔄 **Real-time Updates**: Instant UI updates without page refresh

### Task Management
- 🎯 **Priority Levels**: Organize tasks by High, Medium, or Low priority
- 📂 **Categories**: Sort tasks into Work, Personal, or Professional Development
- 📅 **Due Dates**: Set and track task deadlines
- 🎨 **Visual Priority**: Color-coded cards based on priority levels

### User Experience
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔤 **Smart Sorting**: Sort tasks alphabetically by title or category
- 🎭 **Modal Interface**: Clean, distraction-free editing experience
- 🎨 **Modern UI**: Clean and intuitive user interface

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd vue-todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── TarjetaComponent.vue    # Individual task card component
│   ├── Formulario.vue          # Reusable form component
│   ├── ModalComponent.vue      # Modal wrapper for editing
│   └── Button.vue              # Reusable button component
├── App.vue                     # Main application component
├── main.js                     # Application entry point
└── style.css                   # Global styles
```

## 🧩 Component Architecture

### App.vue
The main application component that manages the global state and coordinates between child components.

**Key Features:**
- Task list management
- Sorting functionality
- Event handling for CRUD operations

### TarjetaComponent.vue
Individual task card component that displays task information and provides action buttons.

**Props:**
- `tarea`: Task object containing all task data

**Events:**
- `borrarTarea`: Emitted when delete button is clicked
- `tareaActualizada`: Emitted when task is modified

### Formulario.vue
Reusable form component that handles both creating new tasks and editing existing ones.

**Props:**
- `titulo`: Form title text
- `textoBotonSubmit`: Submit button text
- `datosIniciales`: Initial data for editing mode

**Events:**
- `submitFormulario`: Emitted when form is submitted

### ModalComponent.vue
Modal wrapper that provides a clean interface for task editing.

**Props:**
- `tareaParaEditar`: Task object to edit (null for new tasks)

**Events:**
- `closeModal`: Emitted when modal should be closed
- `tareaGuardada`: Emitted when task is saved

## 📊 Data Structure

Each task object contains the following properties:

```javascript
{
  id: String,              // Unique identifier
  titulo: String,          // Task title
  descripcion: String,     // Task description
  prioridad: String,       // 'Alta', 'Media', or 'Baja'
  fechaLimite: String,     // Due date (YYYY-MM-DD format)
  completada: Boolean,     // Completion status
  categoria: String        // 'Trabajo', 'Personal', or 'Desarrollo Profesional'
}
```

## 🎨 Styling & Theming

The application uses a modern color scheme with priority-based visual indicators:

- **High Priority**: Red background (`#e74c3c`)
- **Medium Priority**: Orange background (`#f39c12`)
- **Low Priority**: Green background (`#2ecc71`)

### Dark Mode Support
The application includes built-in dark mode support that respects system preferences.

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |

## 🌟 Key Features Explained

### Smart Form Handling
The form component automatically switches between "Add" and "Edit" modes based on the provided data, ensuring a consistent user experience.

### Reactive State Management
Uses Vue 3's Composition API with reactive references for efficient state management and automatic UI updates.

### Component Communication
Implements a clean event-driven architecture where child components communicate with parents through custom events.

### Responsive Design
The application adapts to different screen sizes, ensuring usability across all devices.

## 🚀 Future Enhancements

- [ ] Task completion toggle functionality
- [ ] Local storage persistence
- [ ] Task search and filtering
- [ ] Drag and drop reordering
- [ ] Task due date notifications
- [ ] Export tasks to different formats
- [ ] Multiple task lists/projects
- [ ] Task collaboration features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Vue 3](https://vuejs.org/) and [Vite](https://vitejs.dev/)
- Inspired by modern task management applications
- Thanks to the Vue.js community for excellent documentation and resources

---

**Made with ❤️ using Vue 3 and Vite**