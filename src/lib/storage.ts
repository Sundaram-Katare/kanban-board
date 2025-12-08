import { Task } from "../types/task";

const STORAGE_KEY = 'kanban_tasks_v1';

export function loadTasks(): Task[] {
    if(typeof window === 'undefined') return [];

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if(!raw) return [];

    try {
        const parsed = JSON.parse(raw) as Task[];
        return parsed;
    } catch {
        return [];
    }
}

export function saveTasks(tasks: Task[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
