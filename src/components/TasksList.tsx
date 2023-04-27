import React from 'react';
import { FlatList, } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { ItemWrapper } from './ItemWrapper';


import { TaskItem } from './TaskItem';
import { EditTaskProps } from '../pages/Home';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksItemProps {
  tasks: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({TaskId, TaskNewTitle}: EditTaskProps) => void; 
}

export function TasksList({ tasks, editTask, toggleTaskDone, removeTask}: TasksItemProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem 
            task={item} 
            editTask={editTask} 
            toggleTaskDone={toggleTaskDone} 
            removeTask={removeTask}/>
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}

