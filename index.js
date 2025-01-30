const fs = require('fs');

const FILE_PATH = './tasks.json';

// Verifica si el archivo de tareas existe y tiene contenido válido
const getTasks = () => {
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, JSON.stringify([]));
        return [];
    }
    
    const rawData = fs.readFileSync(FILE_PATH, 'utf8');
    try {
        return JSON.parse(rawData);
    } catch (error) {
        console.log("❌ Error al leer el archivo de tareas. Inicializando archivo...");
        fs.writeFileSync(FILE_PATH, JSON.stringify([]));
        return [];
    }
};


const addTask = (description) => {
    const tasks = getTasks();
    const newTask = {
        id: tasks.length + 1,
        description,
        status: "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
    console.log(`✅ Tarea agregada: ${description}`);
};

const args = process.argv.slice(2);
const command = args[0];

if (command === 'add') {
    if (!args[1]) {
        console.log("❌ Debes ingresar una descripción.");
    } else {
        addTask(args[1]);
    }
}