{
    let tasks = [];
    let hideDoneTask = false;

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
        const task = tasks[taskIndex];

        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...task,
                done: !task.done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleHideDoneTask = () => {
        hideDoneTask = !hideDoneTask;
        render();
    };

    const markAllTaskDone = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true,
        }));

        render();
    };

    const bindRemoveTasksEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove")

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDone = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const bindHideDoneTasksEvent = () => {
        const buttonHideDoneTasks = document.querySelector(".js-buttonHideDoneTasks");

        if (!buttonHideDoneTasks)
            return;

        buttonHideDoneTasks.addEventListener("click", () => {
            toggleHideDoneTask();
        });
    };

    const bindFinishTasksEvent = () => {
        const buttonFinishAllTasks = document.querySelector(".js-buttonFinishAllTasks");

        if (!buttonFinishAllTasks)
            return;

        buttonFinishAllTasks.addEventListener("click", () => {
            markAllTaskDone();
        });
    };

    const renderTasks = () => {
        const tasksTransformToHTML = tasks
            .map(task =>
                `<li class="list__item${task.done && hideDoneTask ? " list__item--hide" : ""}">
                <button class="list__button list__button--done js-done">
                   <span class="${task.done ? "list__button--spanVisible" : "list__button--span"}">✔</span>
                </button>  
                   <span class="list__span${task.done ? " list__span--done" : "list__span--remove"}">${task.content}</span>
                <button class="list__button list__button--remove js-remove">🗑</button> 
            </li>`)
            .join("")

        document.querySelector(".js-tasks").innerHTML = tasksTransformToHTML;
    };

    const renderButtons = () => {
        let sectionButtons = "";

        if (tasks.length > 0) {
            sectionButtons =
                `
            <button class="section__buttons js-buttonHideDoneTasks">
                ${hideDoneTask ? "Pokaż ukończone" : "Ukryj ukończone"}
            </button>
            <button class="section__buttons js-buttonFinishAllTasks"
            ${tasks.every(task => task.done) ? "disabled" : ""}>
                Ukończ wszystkie
            </button>
            `
        };

        document.querySelector(".js-sectionButtons").innerHTML = sectionButtons;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindToggleDone();
        bindRemoveTasksEvents();
        bindHideDoneTasksEvent();
        bindFinishTasksEvent();
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