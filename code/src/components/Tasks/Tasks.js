import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reusable-components/Button';
import { MdPlaylistAdd, MdOutlinePlaylistAddCheck } from 'react-icons/md';
import { usePopup } from 'react-custom-popup';
import { tasks } from 'reducers/tasks';
import {
  MDBNavbarItem, MDBNavbarLink
} from 'mdb-react-ui-kit';
import { Task } from './Task';
import { NewTaskContainer, TaskListContainer, TaskPageContainer } from './TasksStyling';

export const Tasks = () => {
  const allTasks = useSelector((store) => store.tasks.tasks);
  const projectToFilterOn = useSelector((store) => store.tasks.selectedProject)
  const filterOn = useSelector((store) => store.tasks.filterOn);
  const dispatch = useDispatch();
  const ongoingTasks = allTasks.filter((item) => {
    if (projectToFilterOn === 'all projects') {
      return item.completed === false
    } else {
      return item.completed === false && item.value === projectToFilterOn
    }
  });
  const completedTasks = allTasks.filter((item) => {
    if (projectToFilterOn === 'all projects') {
      return item.completed === true
    } else {
      return item.completed === true && item.value === projectToFilterOn
    }
  });

  const completeAllTasks = () => {
    dispatch(tasks.actions.checkItem({ id: 'complete all' }))
  }

  const { showAlert, showInputDialog } = usePopup();
  const addNewTask = () => {
    showInputDialog({
      title: 'Create new task',
      showCloseButton: true,
      headerTextStyle: { fontWeight: 'bold', fontSize: 'x-large' },
      headerStyle: { marginTop: 5, marginBottom: 5 },
      errorMessageStyle: { color: 'rgb(71 69 69)' },
      options: [
        {
          name: 'Cancel',
          type: 'cancel',
          style: { background: '#FFAACF', color: 'rgb(71 69 69)' }
        },
        {
          name: 'Confirm',
          type: 'confirm',
          style: { background: '#B9F3E4', color: 'rgb(71 69 69)' }
        }
      ],
      inputs: [
        {
          inputType: 'textarea',
          name: 'text',
          label: 'Text',
          default: '',
          validation: {
            minLength: {
              value: 5
            }
          }
        },
        {
          inputType: 'date',
          name: 'due',
          label: 'Due date',
          validation: {
            required: { value: true, message: 'Value is required' }
          }
        }
      ],
      onConfirm: (response) => {
        showAlert({ title: 'Your task:', text: response.text, style: { color: 'rgb(71 69 69)' } });
        dispatch(tasks.actions.addItem({ response }))
      }
    })
  }

  return (

    <TaskPageContainer>
      <TaskListContainer>
        {projectToFilterOn === 'all projects' && filterOn === 'all'
       && allTasks.map((task, index) => (
         <Task key={task.id} index={index} task={task} completed={task.completed} />
       ))}
        {filterOn === 'all' && projectToFilterOn !== 'all projects'
       && allTasks.filter((item) => item.value.includes(projectToFilterOn)).map((task, index) => (
         <Task
           key={task.id}
           index={index}
           task={task}
           completed={task.completed}
           length={allTasks.length} />
       ))}
        {filterOn === 'ongoing' && ongoingTasks.map((task, index) => (
          <Task
            key={task.id}
            index={index}
            task={task}
            completed={task.completed}
            length={ongoingTasks.length} />
        ))}
        {filterOn === 'completed' && completedTasks.map((task, index) => (
          <Task key={task.id} index={index} task={task} length={completedTasks.length} />
        ))}
      </TaskListContainer>
      <NewTaskContainer>
        <Button onClick={addNewTask}><MdPlaylistAdd fontSize="3rem" color="#EA8FEA" />Add new task</Button>
        <MDBNavbarItem>
          <MDBNavbarLink href="#" onClick={completeAllTasks}><MdOutlinePlaylistAddCheck fontSize="3rem" color="#EA8FEA" />Complete all</MDBNavbarLink>
        </MDBNavbarItem>
      </NewTaskContainer>
    </TaskPageContainer>

  );
};
