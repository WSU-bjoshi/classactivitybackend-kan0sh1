import { 
    listTodos, 
    createTodos, 
    toggleTodo, 
    removeTodo, 
} from "../controllers/todo.controllers.js";

import { Router } from "express";
const router = Router();

router.get('/', listTodos);
router.post('/', createTodos);
router.patch('/:id', toggleTodo);
router.delete('/:id', removeTodo);
 // This now works!

export default router;