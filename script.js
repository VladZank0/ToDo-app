(function(){

    const form = document.querySelector(".createTask-form");
    const input = document.querySelector(".createTask-form__input");
    const taskList = document.querySelector(".tasks-list");

   

    form.addEventListener("submit", addTask);
    taskList.addEventListener("click", deleteTask);
    taskList.addEventListener("click", doneTask);

    if(localStorage.getItem('taskHTML')){
        taskList.innerHTML = localStorage.getItem('taskHTML');
    }

    function addTask(e){
        e.preventDefault();

        const taskText = input.value;
        const task = `
        <li class="tasks-list__item">
            <p class="tasks-list__text">${taskText}</p>

            <div class="tasks-list__item-buttons">
                <button type="button" data-action="done" class="tasks-list__btn tasks-list__btn-completed"></button>
                <button type="button" data-action="delete" class="tasks-list__btn tasks-list__btn-uncompleted"></button>
            </div>          
         </li>`;

        taskList.innerHTML += task;


        // Очищаем Input и сохраняем фокус после создания задачи
        input.value = "";
        input.focus();
        saveHTML();
    } 

    function deleteTask(e){
        // ! Мы не можем удалить задачу, нажав на кнопку, которую 
        // ! взяли querySelecr-ом т.к. этой кнопки нет в реальном DOM дереве
        // ! соответсвенно, самый доступный вариант - это (благодаря всплытию событий)
        // ! прослушать событие на ul(которое есть в DOM) и уже после найти нажатую кнопку..

       if(e.target.dataset.action === "delete"){
            const parentNODE = e.target.closest("li");
            parentNODE.remove();
       }
       saveHTML();
   }

    function doneTask(e){
        if(e.target.dataset.action === "done"){
            const parentNODE = e.target.closest("li");
            const taskText = parentNODE.querySelector("p");
            taskText.classList.toggle("done");
            const btn = parentNODE.querySelector("button");
            btn.classList.toggle("active");
            parentNODE.classList.toggle("active");
            saveHTML();
       }
       
    }

    function saveHTML(){
        localStorage.setItem('taskHTML', taskList.innerHTML);
    }


}())