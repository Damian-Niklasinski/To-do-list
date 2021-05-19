{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewtask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ]
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

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `  
            <li class="list__item">
                <button class="list__button list__button--done js-done"><span class="${task.done ? "list__button--spanVisible" : "list__button--span"}">✔</span></button>  
                  <span class="list__span ${task.done ? "list__span--done" : "list__span--remove"}">${task.content}</span>
                <button class="list__button list__button--remove js-remove">🗑</button> 
            </li>
        `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let sectionButtons = "";

        for (const task of tasks) {
            sectionButtons += `
            <button class="section__buttons">Ukryj ukończone</button>
            <button class="section__buttons">Ukończ wszystkie</button>
            `
        }

        document.querySelector(".js-sectionButtons").innerHTML = sectionButtons;
    };

    const bindButtonsEvents = () => {

    };

    const render = () => {
        renderTasks();
        renderButtons();

        const removeButtons = document.querySelectorAll(".js-remove")

        bindEvents();
        bindButtonsEvents();
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