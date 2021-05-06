{
    const tasks = [
        {
            content: "Nagrać lekcje",
            done: false,
        },
        {
            content: "Zjeść pierogi",
            done: true,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li
                    ${task.done ? " style=\"text-decoration: line-through\"" : ""}
                    >
                    ${task.content}
                </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const addNewtask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        
        if(newTaskContent === "") {
            return;
        }

        addNewtask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}