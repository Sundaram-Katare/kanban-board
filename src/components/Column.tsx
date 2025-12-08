'use client';

import { Task, TaskStatus } from '../types/task';
import TaskCard from './TaskCard';
import AddTaskForm from './AddTaskForm';
import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableTaskItem from './SortableTaskItem';

interface ColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onAddTask: (data: { title: string; description: string; status: TaskStatus }) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
}

export default function Column({
  status,
  title,
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}: ColumnProps) {
  const [showForm, setShowForm] = useState(false);
  
  const { setNodeRef } = useDroppable({
    id: status,
    data: { columnStatus: status },
  });

  return (
    <div
      ref={setNodeRef}
      className="flex h-full min-h-[200px] flex-col rounded-xl bg-slate-900/70 p-3"
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
          <span className="rounded-full bg-slate-800 px-2 text-xs text-slate-300">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => setShowForm(v => !v)}
          className="rounded bg-slate-800 px-2 py-1 text-xs text-slate-200 hover:bg-slate-700"
        >
          {showForm ? 'Close' : 'Add'}
        </button>
      </div>

      {showForm && (
        <div className="mb-2">
          <AddTaskForm
            defaultStatus={status}
            onSubmit={data => {
              onAddTask(data);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {tasks.length === 0 && !showForm && (
        <p className="mt-4 text-center text-xs text-slate-500">
          No tasks here yet.
        </p>
      )}

      <SortableContext
        items={tasks.map(t => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="mt-1 flex flex-1 flex-col gap-2">
          {tasks.map(task => (
            <SortableTaskItem key={task.id} id={task.id}>
              <TaskCard
                task={task}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
              />
            </SortableTaskItem>
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
