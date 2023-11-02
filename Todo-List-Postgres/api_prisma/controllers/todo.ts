import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createTodo(todoDesc) {
  const newTodo = await prisma.todo.create({
    data: {
      desc: todoDesc,
    },
  });
  return newTodo;
}

async function getTodos() {
  const todos = await prisma.todo.findMany({});
  return todos;
}

async function getTodo(todoId) {
  const todo = await prisma.todo.findUnique({
    where: {
      id: todoId,
    },
  });
  return todo;
}

async function updateTodo(todoId, todoDesc, todoCompleted) {
  await prisma.todo.update({
    where: {
      id: todoId,
    },
    data: {
      desc: todoDesc,
      completed: todoCompleted,
    },
  });
}

async function deleteTodo(todoId) {
  await prisma.todo.delete({
    where: {
      id: todoId,
    },
  });
}

async function deleteAllTodos() {
  await prisma.todo.deleteMany({});
}

module.exports = {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos,
};
