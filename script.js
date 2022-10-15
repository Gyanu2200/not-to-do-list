/*
get form data on form submit,
store that data in a global array
create a display function to display all the data from array to out entry list
*/

let taskList = [];
let badList = [];
const hrPerWeek = 24 * 7;

const handleOnSubmit = (e) => {
    const formData = new FormData(e);
    const task = formData.get('task');
    const hr = +formData.get('hr');
    console.log(task, hr);

    const obj = {
        task,
        hr
    };

    const totalAllocatedHrs = totalTaskHours() + totalBadTaskHours();
    if(totalAllocatedHrs + hr > hrPerWeek){
        return alert("Sorry Boss, you don't have enough time left to add this task.")
    }

    taskList.push(obj);
    console.log(taskList);
    displayTasks();
    totalTaskHours();
}

const displayTasks = () => {
    let str = "";
 
taskList.map((item, i)=>{
    console.log(item, i);

    str += `<tr>
    <td>1</td>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td class="text-end">
        <button onclick="deleteTask(${i})"class="btn btn-danger">
        <i class="fa-solid fa-trash"></i>
        </button>
        <button onclick="markAsNotToDo(${i})" class="btn btn-success">
        <i class="fa-solid fa-right-long"></i>
        </button>
    </td>
</tr>`
})

    document.getElementById('task-list').innerHTML = str;
}

const displayBadTask = () =>{
    let str = "";
    badList.map((item, i) => {
        str += `<tr>
        <td>${i}</td>
        <td>${item.task}</td>
        <td>${item.hr}</td>
        <td class="text-end">
            <button onclick = "backToTaskList(${i})" class="btn btn-warning">
            <i class="fa-solid fa-left-long"></i>
            </button>
            <button onclick = "deleteBadTask(${i})" class="btn btn-danger">
            <i class="fa-solid fa-trash"></i>
            </button>
        </td>`
    });

    document.getElementById("bad-task").innerHTML = str;
    totalBadTaskHours();
};

const totalTaskHours = () => {
    // const total = taskList.reduce((s,i) => s + i.hr,0)
    const total = taskList.reduce((subTtl, item)=>{
        return subTtl + item.hr;
    },0)

    // console.log(total);
    document.getElementById("totalHrs").innerText = total + totalBadTaskHours();
    return total;
}


// delete task from tasklist

const deleteTask = (i) => {
    if(!window.confirm("Are you sure you want to delete this task?")){
        return;
    }
    taskList = taskList.filter((item, index)=> index !== i)
    displayTasks();
    totalTaskHours();
}

// sending data to bad list

const markAsNotToDo = (i) => {
    const itm = taskList.splice(i, 1)
    badList.push(itm[0]);

    displayTasks();
    displayBadTask();
}


const totalBadTaskHours = () => {
    // const total = taskList.reduce((s,i) => s + i.hr,0)
    const total = badList.reduce((subTtl, item)=>{
        return subTtl + item.hr;
    },0)

    // console.log(total);
    document.getElementById("totalBadHr").innerText = total;
    return total;
}

const deleteBadTask = (i) => {
    if(!window.confirm("Are you sure you want to delete this task?")){
        return;
    }
    badList = badList.filter((item, index)=> index !== i)
    displayBadTask();
    totalTaskHours();
}


const backToTaskList = (i) => {
    const itm = badList.splice(i, 1)
    taskList.push(itm[0]);

    displayTasks();
    displayBadTask();
}

