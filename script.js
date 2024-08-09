document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task
    function addTask(taskText, save = true) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        
        removeButton.onclick = function() {
            taskList.removeChild(li);
            saveTasks();
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(function(li) {
            tasks.push(li.textContent.replace('Remove', '').trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(function(taskText) {
            addTask(taskText, false); // 'false' indicates not to save again to localStorage
        });
    }

    // Event listener to add a task when the button is clicked
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert('Please enter a task');
            return;
        }
        addTask(taskText);
        taskInput.value = '';
    });

    // Event listener to add a task when 'Enter' is pressed
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText === "") {
                alert('Please enter a task');
                return;
            }
            addTask(taskText);
            taskInput.value = '';
        }
    });

    // Load tasks when the page loads
    loadTasks();
});