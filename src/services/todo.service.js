import * as ToDoModel from "../models/todo.models.js"
import pool from "../db/connection.js"
async function getTodosService(){
    return await ToDoModel.getAllTodos();
}

function createTodoService(task){
    if(!task || typeof task !=="string" || task.trim()===""){
        // return res.status(400).json({error:"task is required. You should provide non-empty string"});
        throw new error("Invalid task")
    }
    return ToDoModel.createTodo(task);
}

function toggleTodoByIdService(id){
    // const todo = todos.find(t => t.id === id);
    // if(!todo){
    //     return null;
    // }
    return ToDoModel.toggleTodoById(id);
}

function deleteTodoByIdService(id){
    return ToDoModel.deleteTodoById(id);
}

async function updateTodoByIdService(id, task) {
    // Using the mysql2 promise or callback wrapper
    const [result] = await connection.query(
        "UPDATE todos SET task = ? WHERE id = ?",
        [task, id]
    );
    return result.affectedRows > 0;
}

export {
    getTodosService,
    createTodoService,
    toggleTodoByIdService,
    deleteTodoByIdService,
    updateTodoByIdService
};