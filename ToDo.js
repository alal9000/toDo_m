import {
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Button,
  View,
  Keyboard
} from 'react-native';
import React, { useState } from 'react';

const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text) {
      const newTodo = {
        id: todos.length + 1,
        title: text
      };
      setTodos([...todos, newTodo]);
      setText('');
      Keyboard.dismiss();
    }
  };

  const handleDelete = (item) => {
    const newArray = todos.filter((m) => m.id !== item.id);
    setTodos(newArray);
  };

  return (
    <View>
      <Text style={styles.header}>TODO</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        selectionColor="#000"
      />
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Reset" color="red" onPress={() => setTodos([])} />
      </View>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Button
              title="delete"
              color="orange"
              onPress={() => handleDelete(item)}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()} // Ensure keyExtractor returns a unique string
        extraData={todos} // This forces FlatList to re-render when `todos` changes
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  buttonContainer: {
    marginBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  todoItem: {
    borderColor: '#B0B0B0',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default ToDo;
