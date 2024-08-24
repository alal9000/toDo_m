import {
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Button,
  View
} from 'react-native';
import React, { useState } from 'react';

const ToDo = () => {
  const [todos, setTodos] = useState([
    { id: 1, title: 'First' },
    { id: 2, title: 'Second' },
    { id: 3, title: 'Third' }
  ]);
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text) {
      const newTodo = {
        id: todos.length + 1,
        title: text
      };
      setTodos([...todos, newTodo]);
      setText('');
    }
  };

  const handleDelete = (item) => {
    const newArray = todos.filter((m) => m.id !== item.id);
    setTodos(newArray);
  };

  return (
    <View>
      <TextInput style={styles.input} value={text} onChangeText={setText} />
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Reset" color="red" onPress={() => setTodos([])} />
      </View>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.buttonContainer}>
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
  }
});

export default ToDo;
