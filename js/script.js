let taskDb = [];

function validateInput(task, date) {
    if (task.trim() === '' || date.trim() === '') {
        alert('Please enter both task and due date.');
        return false;
    }
    return true;
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');

    if (validateInput(taskInput.value, dateInput.value)) {
        const newTask = {
            task: taskInput.value,
            date: dateInput.value,
            status: 'Pending'
        };
        taskDb.push(newTask);
        taskInput.value = '';
        dateInput.value = '';
        renderTasks();
    }
}

function renderTasks(data = taskDb) {
    const taskTable = document.getElementById("taskTable");
    taskTable.innerHTML = "";

    if (data.length === 0) {
        taskTable.innerHTML = `<tr><td colspan="4">No task found</td></tr>`;
        return;
    }

    data.forEach((taskObj, index) => {
        taskTable.innerHTML += `
            <tr>
                <td>${taskObj.task}</td>
                <td>${taskObj.date}</td>
                <td>${taskObj.status}</td>
                <td>
                    <button onclick="markDone(${index})">Done</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function markDone(index) {
    taskDb[index].status = 'Completed';
    renderTasks();
}

function deleteTask(index) {
    taskDb.splice(index, 1);
    renderTasks();
}

function btnDelete() {
    taskDb = [];
    renderTasks();
}

function btnFilter() {
    const filterDate = document.getElementById('filterDate').value.trim();
    if (filterDate === "") {
        renderTasks();
    } else {
        const filtered = taskDb.filter(task => task.date === filterDate);
        renderTasks(filtered);
    }
}