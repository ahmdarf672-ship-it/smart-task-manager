totalTasks= document.getElementById('total-tasks');
taskInput= document.getElementById('tasks-input');
completedTasks= document.getElementById('completed-tasks');
addBtn= document.getElementById('add-btn');
tasksList= document.getElementById('tasks-list');
filterBtn= document.querySelectorAll('.filter-btn');

let tasks = JSON.parse(localStorage.getItem('tasksData')) || [];
let currentFilter = 'all';

function addTask()
{
    const Text = taskInput.value.trim();
    if(Text !=='')
    {
        newTask={
            id: Date.now(),
            Text: Text,
            completed: false
        };
        tasks.push(newTask);
        saveAndRender();
        taskInput.value= '';
    }
}

function toggleTask(id)
{
    tasks= tasks.map(task=> task.id === id ? 
    {...task, completed: ! task.completed}: task);
    saveAndRender();
}

function deleteTask(id)
{
    tasks= tasks.filter(task=> task.id !== id);
    saveAndRender();
}

function render()
{
    tasksList.innerHTML= '';
    filtered= tasks.filter(task=> {
        if(currentFilter === 'pending') return !task.completed;
        if(currentFilter === 'completed') return task.completed;
        return true;
    });

    filtered.forEach(task => {li= document.createElement('li');
        li.className = task.completed ? 'completed' :'';
        li.innerHTML=
        `
        <span onclick ='toggleTask(${task.id})'>${task.Text}</span>
        <button class='delete-btn' onclick = 'deleteTask(${task.id})'>حذف</button>;
        `
        tasksList.appendChild(li);
    });
    totalTasks.innerHTML= tasks.length;
    completedTasks.innerText= tasks.filter(t=> t.completed).length;
}

function saveAndRender()
{
    localStorage.setItem('tasksData', JSON.stringify(tasks));
    render();
}

filterBtn.forEach(btn=>
{
    btn.addEventListener('click', ()=>
    {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        currentFilter= btn.getAttribute('data-filter');
        render();
    });
});

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e)=>
{
    if(e.key === 'Enter')
        addTask();
})
