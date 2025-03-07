/* eslint-disable comma-dangle */
import { createSlice } from '@reduxjs/toolkit';

const taskData = [
  { id: 1, text: 'playing with the cat', created: '10/10/2022', due: '10/11/2022', completed: false, value: 'other' },
  { id: 2, text: 'finish homework', created: '10/10/2022', due: '10/11/2022', completed: false, value: 'learning' },
  { id: 3, text: 'go to the gym', created: '10/10/2022', due: '10/11/2022', completed: true, value: 'sports' },
];

const projectsData = [
  { value: 'all projects' },
  { value: 'shopping' },
  { value: 'cooking' },
  { value: 'sports' },
  { value: 'learning' },
  { value: 'other' },
];

export const tasks = createSlice({
  name: 'tasks',
  initialState: {
    tasks: taskData,
    projects: projectsData,
    filterOn: 'all',
    selectedProject: 'all projects'
  },
  reducers: {
    addItem: (state, action) => {
      const { text, due } = action.payload.response
      const lastItemOfTaskData = state.tasks.length === 0
        ? 1 : state.tasks[state.tasks.length - 1].id + 1
      state.tasks.push({
        id: lastItemOfTaskData,
        text,
        created: Date.now(),
        due,
        completed: false,
        value: 'other'
      })
      console.log(state.tasks)
      console.log(lastItemOfTaskData)
    },
    removeItem: (state, action) => {
      const { id } = action.payload
      state.tasks = state.tasks.filter((item) => item.id !== id)
    },
    checkItem: (state, action) => {
      const { id } = action.payload
      const selectedTask = id !== null && state.tasks.find((item) => item.id === id)
      const filteredProject = state.selectedProject
      if (id === 'complete all') {
        if (filteredProject === 'all projects' && state.filterOn !== 'done') {
          state.tasks.forEach((task) => {
            task.completed = true
          })
        } else {
          state.tasks.filter((item) => item.value === filteredProject)
            .forEach((task) => {
              task.completed = true
            })
        }
        return
      }

      if (selectedTask.completed) {
        selectedTask.completed = false
      } else {
        selectedTask.completed = true
      }
    },
    filterOn: (state, action) => {
      const { filter } = action.payload
      state.filterOn = filter
    },
    changeProject: (state, action) => {
      const { id, value } = action.payload;
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, value };
        } else {
          return task;
        }
      });
      return {
        ...state,
        tasks: updatedTasks,
      };
    },
    filterProject: (state, action) => {
      const { value } = action.payload
      state.selectedProject = value
    }
  },
});
