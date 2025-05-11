const todoList = require('../todo');

describe('Todo List Test Suite', () => {
  let todos;

  beforeEach(() => {
    todos = todoList();
  });

  test('Should add a new todo', () => {
    expect(todos.all.length).toBe(0);
    todos.add({ title: 'Test todo', dueDate: '2023-01-01', completed: false });
    expect(todos.all.length).toBe(1);
  });

  test('Should mark a todo as completed', () => {
    todos.add({
      title: 'Complete me',
      dueDate: '2023-01-01',
      completed: false,
    });
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test('Should return overdue items', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dueDate = yesterday.toISOString().split('T')[0];
    todos.add({ title: 'Overdue task', dueDate, completed: false });
    expect(todos.overdue().length).toBe(1);
  });

  test('Should return due today items', () => {
    const today = new Date().toISOString().split('T')[0];
    todos.add({ title: 'Due today', dueDate: today, completed: false });
    expect(todos.dueToday().length).toBe(1);
  });

  test('Should return due later items', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dueDate = tomorrow.toISOString().split('T')[0];
    todos.add({ title: 'Future task', dueDate, completed: false });
    expect(todos.dueLater().length).toBe(1);
  });
});
