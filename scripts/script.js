// Lógica de la app de tareas
// Funcionalidades: agregar, marcar completada, eliminar seleccionadas, limpiar todo, persistencia en localStorage

const addBtn = document.getElementById('addBtn');
const completeBtn = document.getElementById('completeBtn');
const deleteBtn = document.getElementById('deleteBtn');
const clearBtn = document.getElementById('clearBtn');
const taskInput = document.getElementById('taskInput');
const tasksList = document.getElementById('tasksList');

// Key para localStorage
const STORAGE_KEY = 'mis_tareas_v1';

// Cargar tareas desde localStorage
function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error parsing tasks from storage', e);
    return [];
  }
}

// Guardar tareas
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Renderizar la lista a partir del array de tareas
function renderTasks(tasks) {
  tasksList.innerHTML = '';
  tasks.forEach((t, idx) => {
    const li = document.createElement('li');
    li.dataset.index = idx;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!t.completed;
    checkbox.addEventListener('change', () => {
      t.completed = checkbox.checked;
      saveTasks(tasks);
      li.classList.toggle('done', t.completed);
    });

    li.appendChild(checkbox);

    const span = document.createElement('span');
    span.textContent = t.text;
    span.style.marginLeft = '8px';
    if (t.completed) li.classList.add('done');
    li.appendChild(span);

    tasksList.appendChild(li);
  });
}

// Estado inicial
let tasks = loadTasks();
// Si el storage está vacío, inferimos las tareas actuales del HTML (fallback)
if (tasks.length === 0) {
  // leer las li actuales en el HTML
  const existing = Array.from(tasksList.querySelectorAll('li'));
  if (existing.length > 0) {
    tasks = existing.map(li => {
      const checkbox = li.querySelector('input[type=checkbox]');
      const text = li.textContent.trim();
      return { text: text.replace(/\s+/g, ' '), completed: !!(checkbox && checkbox.checked) };
    });
    saveTasks(tasks);
  }
}

renderTasks(tasks);

// Agregar tarea
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;
  const newTask = { text, completed: false };
  tasks.push(newTask);
  saveTasks(tasks);
  renderTasks(tasks);
  taskInput.value = '';
  taskInput.focus();
}

addBtn.addEventListener('click', addTask);

// Añadir con Enter
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

// Marcar seleccionadas como completadas (toggle)
completeBtn.addEventListener('click', () => {
  const items = tasksList.querySelectorAll('li');
  let changed = false;
  items.forEach((li, idx) => {
    const cb = li.querySelector('input[type=checkbox]');
    if (cb && cb.checked && !tasks[idx].completed) {
      tasks[idx].completed = true;
      changed = true;
    }
  });
  if (changed) {
    saveTasks(tasks);
    renderTasks(tasks);
  }
});

// Eliminar seleccionadas
deleteBtn.addEventListener('click', () => {
  // eliminar las tareas que tengan checkbox marcado
  const items = tasksList.querySelectorAll('li');
  const toKeep = [];
  items.forEach((li, idx) => {
    const cb = li.querySelector('input[type=checkbox]');
    if (!(cb && cb.checked)) {
      toKeep.push(tasks[idx]);
    }
  });
  tasks = toKeep;
  saveTasks(tasks);
  renderTasks(tasks);
});

// Limpiar todo
clearBtn.addEventListener('click', () => {
  if (!confirm('¿Borrar todas las tareas?')) return;
  tasks = [];
  saveTasks(tasks);
  renderTasks(tasks);
});

// Delegación: si un li se hace doble click editar su texto
tasksList.addEventListener('dblclick', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  const idx = Number(li.dataset.index);
  const current = tasks[idx];
  const newText = prompt('Editar tarea', current.text);
  if (newText !== null) {
    tasks[idx].text = newText.trim() || current.text;
    saveTasks(tasks);
    renderTasks(tasks);
  }
});

// Accesibilidad: permitir limpiar focus tras touch (para móviles)
document.addEventListener('pointerup', function (e) {
  if (e.pointerType === 'touch') {
    if (document.activeElement && document.activeElement.blur) {
      document.activeElement.blur();
    }
  }
}, true);
