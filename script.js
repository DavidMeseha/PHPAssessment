var xhttp = new XMLHttpRequest();
let tasks

function setLocalStorage(tasks) {
    localStorage.setItem('todos', JSON.stringify(tasks));
}

function updateTasks(tasks) {
    tasks = search(tasks)
    var list = Object.keys(tasks).map(task => {
        return `<li class="flex gap-2 justify-between" id='${task}'>
                        <div class="p-2 font-bold">#${task}</div>
                        <div class="p-2 font-bold">${tasks[task].title}</div>
                        <div class="p-2 font-bold">${tasks[task].date}</div>
                         <div>
                            <button class="p-2 bg-black text-white rounded-md hover:bg-red transition" onclick="removeTask(${task})">Remove</button>
                            <button class="p-2 bg-black text-white rounded-md hover:bg-green transition">Edit</button>
                        </div>
                    </li>`
    }).join('')

    document.getElementById("container").innerHTML = `<li class="flex sticky top-0 bg-white gap-2 justify-between font-bold min-w-[425px] md:min-w-fit">
    <div>ID</div>
    <div>Title</div>
    <div>Added</div>
    <div class="w-28">Action</div>
</li>` + list
}

function loadTasks() {
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            tasks = JSON.parse(this.responseText)
            updateTasks(tasks)
            setLocalStorage(tasks)
        }
    };
    xhttp.open("GET", "get_tasks.php", true);
    xhttp.send();
}

function removeTask(index) {
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            tasks = JSON.parse(this.responseText)
            updateTasks(tasks)
            setLocalStorage(tasks)
        }
    }

    xhttp.open("GET", "remove_task.php?index=" + index, true);
    xhttp.send();
}

function addTask() {
    var titleInput = document.getElementById('task-title')
    var title = titleInput.value
    xhttp.onreadystatechange = function () {
        console.log(this.status, this.readyState)
        if (this.readyState == 4 && this.status == 200) {
            tasks = JSON.parse(this.responseText)
            updateTasks(tasks)
            setLocalStorage(tasks)
            titleInput.value = ''
        }
    }

    xhttp.open("GET", "add_task.php?title=" + title, true);
    xhttp.send();
}

function search(tasks = tasks) {
    var searchBar = document.getElementById('search')
    let value = searchBar.value

    if (value.length === 0) {
        return tasks
    }

    var filteredKeys = Object.keys(tasks).filter(task => {
        return tasks[task].title.toLowerCase().includes(value)
    })

    var filtered = {}
    filteredKeys.forEach(key => {
        filtered[key] = tasks[key]
    })

    return filtered
}

loadTasks()