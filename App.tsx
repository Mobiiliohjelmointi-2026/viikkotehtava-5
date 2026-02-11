import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import TodoItem from './components/TodoItem';
import { useTodos } from './hooks/useTodos';

export default function App() {
  const { tasks, addTask, toggleTask } = useTodos();
  const [text, setText] = useState<string>('');

  function handleAddTask() {
    if (text.trim() === '') return;
    addTask(text.trim());
    setText('');
  }

  return (
    <View style={{ padding: 20, marginTop: 40 }}>
      <Text style={{ fontSize: 22, marginBottom: 10 }}>
        Todo list
      </Text>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="New task"
        style={{ marginBottom: 10 }}
      />
      <Button title="Add" onPress={handleAddTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem item={item} onPress={toggleTask} />
        )}
      />
    </View>
  );
}