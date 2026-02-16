import { 
    listTodos, 
    createTodos, 
    toggleTodo, 
    removeTodo, 
    updateTodo  // <--- Add this!
} from "../controllers/todo.controllers.js";

import { Router } from "express";
const router = Router();

router.get('/', listTodos);
router.post('/', createTodos);
router.patch('/:id', toggleTodo);
router.delete('/:id', removeTodo);
router.put('/:id', updateTodo); // This now works!

export default router;