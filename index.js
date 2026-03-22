#!/usr/bin/env node

const { randomUUID } = require('crypto');
const fs = require('fs')
const path = require('path');

const date = new Date()

const filePath = path.join(__dirname, 'data', 'config.json');
const data = fs.readFileSync(filePath,"utf8")

let tasks = []
tasks = JSON.parse(data || '[]')

let data_model ={
    id:Number,
    description:String,
    stauts:String,
    createdaAt:String,
    updatedAt:String,
}

function Add(task){
    data_model.description = task
    data_model.id = randomUUID()
    data_model.stauts = "todo"
    data_model.createdaAt = date.getDate()
    data_model.updatedAt = date.getDate()
    tasks.push(data_model)
   fs.writeFileSync(filePath,JSON.stringify(tasks,null,2))
   
}


//Add("Hi Gary")

function Update(id,task){
    
    
   try {
     const taskIndex = tasks.findIndex(task => task.id === id);
 
     if (taskIndex === -1) {
             console.error(`Error: Task with ID "${id}" not found.`);
             return;
         }
 
        
         // We use the "Spread Operator" (...) to keep old data and overwrite only what changed
         tasks[taskIndex] = {
             ...tasks[taskIndex],
             description:task, 
             updatedAt: new Date().toISOString() 
         };
 
         
         fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
         
         console.log(`Task ${id} updated successfully!`);
     }
    catch (error) {
        console.error("Could not update the file:", error.message);
    }
}

// console.log(Update("3493648e-84b4-4bb7-81a0-cefd09ae9885" ,"Book My lunch"))
function Delete(id){

    try {
        const taskIndex = tasks.findIndex(task => task.id === id);
 
     if (taskIndex === -1) {
             console.error(`Error: Task with ID "${id}" not found.`);
             return;
         }
        
    const updatedTasks = tasks.filter(task => task.id !== id);

    fs.writeFileSync(filePath, JSON.stringify(updatedTasks, null, 2));

    console.log(`Task ${id} deleted successfully!`);

    } catch (error) {
        console.error("Failed to delete task: ", error.message)
    }
}

//Delete("892fdb13-3102-4872-ad16-29b779d51bb1")

function list(stats){

   try {
    
    let taskToShow
    
    if(stats){
        taskToShow = tasks.filter(task=> task.stauts == stats)
    }else{
        taskToShow = tasks
    }


    if (taskToShow.length === 0) {
            console.log(stats 
                ? `No tasks found with status: ${stats}` 
                : "Your task list is empty.");
            return;
            }

    console.log(`--- Showing ${stats || 'all'} tasks ---`);
    console.table(taskToShow);

   } catch (error) {
    console.error("Error reading tasks:", error.message);
   }

}
//list()


// process.argv[0] is the Node path
// process.argv[1] is the File path
// process.argv[2] is the COMMAND (add, list, etc.)
// process.argv[3] and [4] are the DATA (id, description, status)

const [,, command, arg1, arg2] = process.argv;

switch (command) {
    case 'add':
        Add(arg1);
        break;
    case 'update':
        Update(arg1, arg2);
        break;
    case 'delete':
        Delete(arg1);
        break;
    case 'list':
        list(arg1); // arg1 would be the optional status filter
        break;
    default:
        console.log("Usage: task-cli [add|update|delete|list] [arguments]");
}