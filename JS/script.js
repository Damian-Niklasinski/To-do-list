{
    const tasks = [

    ];

    const addNewtask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }


    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove")

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done")

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `  
                <li class="list__item">
                    <button class="list__button list__button--done js-done"><span class="${task.done ? "list__button--spanVisible" : "list__button--span"}">✓</span></button>  
                      <span class="list__span ${task.done ? "list__span--done" : "list__span--remove"}">${task.content}</span>
                    <button class="list__button list__button--remove js-remove">🗑</button> 
                </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;

        const removeButtons = document.querySelectorAll(".js-remove")

        bindEvents();
    };


    const focusInput = (newTask) => {
        newTask.value = "";
        newTask.focus();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask")
        const newTask = newTaskContent.value.trim();

        if (!newTask) {
            focusInput(newTaskContent);
            return;
        }
        focusInput(newTaskContent);
        addNewtask(newTask);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}