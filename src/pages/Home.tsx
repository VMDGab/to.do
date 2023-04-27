import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface EditTaskProps {
  TaskId: number,
  TaskNewTitle: string
}
export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle)
    if (taskWithSameTitle) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }



    setTasks(oldTasks => [...oldTasks, newTask])

  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const foundItem = updatedTasks.find(item => item.id === id);

    if (!foundItem)
      return;

    foundItem.done = !foundItem.done;
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {

    const removedTask = tasks.filter(task => task.id != id)

    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        style: 'destructive',
        onPress: () => setTasks(removedTask),
      }
    ])


  }

  function handleEditTask({ TaskId, TaskNewTitle }: EditTaskProps) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const TaskToBeUpdated = updatedTasks.find(item => item.id === TaskId);

    if (!TaskToBeUpdated)
      return;

    TaskToBeUpdated.title = TaskNewTitle;
    setTasks(updatedTasks)
  }
  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})