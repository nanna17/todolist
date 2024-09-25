// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('task-form');
//     const taskInput = document.getElementById('task-input');
//     const taskTime = document.getElementById('task-time');
//     const timeUnit = document.getElementById('time-unit');
//     const taskType = document.getElementById('task-type');
//     const taskList = document.getElementById('task-list');
//     const deleteAllBtn = document.getElementById('delete-all-btn');

//     form.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const taskValue = taskInput.value;
//         const timeValue = parseInt(taskTime.value);
//         const unitValue = timeUnit.value;
//         const typeValue = taskType.value;

//         if (taskValue && timeValue) {
//             const li = document.createElement('li');
//             li.classList.add('task-item');
//             li.innerHTML = `
//                 <span class="task">${taskValue} (${timeValue} ${unitValue}) - ${typeValue}</span>
//                 <div class="task-buttons">
//                     <button class="edit-btn">Edit</button>
//                     <button class="delete-btn">Delete</button>
//                     <button class="complete-btn">Complete</button>
//                 </div>
//             `;
//             taskList.appendChild(li);

//             // Convert time to milliseconds
//             let timeInMs;
//             switch (unitValue) {
//                 case 'minutes':
//                     timeInMs = timeValue * 60000; // minutes to milliseconds
//                     break;
//                 case 'hours':
//                     timeInMs = timeValue * 3600000; // hours to milliseconds
//                     break;
//                 case 'days':
//                     timeInMs = timeValue * 86400000; // days to milliseconds
//                     break;
//                 case 'weeks':
//                     timeInMs = timeValue * 604800000; // weeks to milliseconds
//                     break;
//                 case 'months':
//                     timeInMs = timeValue * 2628000000; // months to milliseconds (approx)
//                     break;
//                 default:
//                     timeInMs = 0;
//             }

//             // Automatic removal after time
//             setTimeout(() => {
//                 if (li && !li.classList.contains('completed')) {
//                     li.classList.add('completed');
//                     setTimeout(() => li.remove(), 1000); // Remove after 1 second
//                 }
//             }, timeInMs);

//             const completeBtn = li.querySelector('.complete-btn');
//             completeBtn.addEventListener('click', () => {
//                 li.classList.add('completed');
//                 setTimeout(() => li.remove(), 1000); // Remove after 1 second
//             });

//             const deleteBtn = li.querySelector('.delete-btn');
//             deleteBtn.addEventListener('click', () => {
//                 li.remove();
//             });

//             const editBtn = li.querySelector('.edit-btn');
//             editBtn.addEventListener('click', () => {
//                 const newTaskValue = prompt('Edit task:', taskValue);
//                 const newTimeValue = prompt('Edit time:', timeValue);
//                 const newUnitValue = prompt('Edit time unit:', unitValue);

//                 if (newTaskValue && newTimeValue && newUnitValue) {
//                     li.querySelector('.task').innerHTML = `${newTaskValue} (${newTimeValue} ${newUnitValue}) - ${typeValue}`;
//                 }
//             });

//             taskInput.value = '';
//             taskTime.value = '';
//         }
//     });

//     deleteAllBtn.addEventListener('click', () => {
//         taskList.innerHTML = '';
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskTime = document.getElementById('task-time');
    const timeUnit = document.getElementById('time-unit');
    const taskType = document.getElementById('task-type');
    const taskList = document.getElementById('task-list');
    const deleteAllBtn = document.getElementById('delete-all-btn');

    // Function to convert time to milliseconds
    function convertToMilliseconds(timeValue, unitValue) {
        switch (unitValue) {
            case 'minutes': return timeValue * 60000;
            case 'hours': return timeValue * 3600000;
            case 'days': return timeValue * 86400000;
            case 'weeks': return timeValue * 604800000;
            case 'months': return timeValue * 2628000000;
            default: return 0;
        }
    }

    // Function to create a new task element
    function createTaskElement(taskValue, timeValue, unitValue, typeValue) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span class="task">${taskValue} (${timeValue} ${unitValue}) - ${typeValue}</span>
            <div class="task-buttons">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                <button class="complete-btn">Complete</button>
            </div>
        `;
        return li;
    }

    // Event handler for form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskValue = taskInput.value;
        const timeValue = parseInt(taskTime.value);
        const unitValue = timeUnit.value;
        const typeValue = taskType.value;

        if (taskValue && timeValue) {
            const taskElement = createTaskElement(taskValue, timeValue, unitValue, typeValue);
            taskList.appendChild(taskElement);

            const timeInMs = convertToMilliseconds(timeValue, unitValue);

            // Auto-remove task after specified time
            setTimeout(() => {
                if (!taskElement.classList.contains('completed')) {
                    taskElement.classList.add('completed');
                    setTimeout(() => taskElement.remove(), 1000);
                }
            }, timeInMs);

            // Event handler for complete button
            taskElement.querySelector('.complete-btn').addEventListener('click', () => {
                taskElement.classList.add('completed');
                setTimeout(() => taskElement.remove(), 1000);
            });

            // Event handler for delete button
            taskElement.querySelector('.delete-btn').addEventListener('click', () => {
                taskElement.remove();
            });

            // Event handler for edit button
            taskElement.querySelector('.edit-btn').addEventListener('click', () => {
                const newTaskValue = prompt('Edit task:', taskValue);
                const newTimeValue = prompt('Edit time:', timeValue);
                const newUnitValue = prompt('Edit time unit:', unitValue);

                if (newTaskValue && newTimeValue && newUnitValue) {
                    taskElement.querySelector('.task').innerHTML = `${newTaskValue} (${newTimeValue} ${newUnitValue}) - ${typeValue}`;
                }
            });

            // Clear input fields
            taskInput.value = '';
            taskTime.value = '';
        }
    });

    // Event handler for delete all button
    deleteAllBtn.addEventListener('click', () => {
        taskList.innerHTML = '';
    });
});

