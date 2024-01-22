import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';

const SecondApp = ({ taskCount }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.titleText}>Mi lista de tareas</Text>
      <Image source={require('./assets/inge.png')} style={styles.image} />
      <Text style={styles.countText}>Tareas: {taskCount}</Text>
    </View>
  );
};

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { id: Date.now().toString(), text: task }]);
      setTask('');
      setMessage('Tarea agregada');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000); // El mensaje desaparecerá después de 3 segundos
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((item) => item.id !== taskId));
    setMessage('Tarea eliminada');
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000); // El mensaje desaparecerá después de 3 segundos
  };

  return (
    <View style={styles.container}>
      <SecondApp taskCount={tasks.length} />

      {showMessage && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la tarea"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.taskList}
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.text}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  countText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#e8e8e8',
    borderColor: '#d0d0d0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  taskList: {
    flex: 1,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  taskText: {
    color: '#fff',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    borderRadius: 5,
    padding: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  messageContainer: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },

  messageText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default App;
