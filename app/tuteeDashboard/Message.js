import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; 

const MessagePage = () => {
  const [messages, setMessages] = useState([]);
  const router = useRouter(); 

  useEffect(() => {
    const fetchMessages = () => {
      setMessages([
        { id: '1', from: 'John Doe', text: 'Hello Goodmorning', time: '7:30 AM' },
        { id: '2', from: 'Jane Smith', text: 'Are you available for a session?', time: '9:45 AM' },
        { id: '3', from: 'Alex Johnson', text: 'Can we reschedule our session?', time: '11:30 AM' },
      ]);
    };

    fetchMessages();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.messageItem} 
      onPress={() => router.push(`/messageDetail/${item.id}`)} 
    >
      <View style={styles.messageInfo}>
        <Text style={styles.sender}>{item.from}</Text>
        <Text style={styles.messagePreview}>{item.text}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}> 
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
      />

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    marginTop: -5
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginLeft: 10,
  },
  messageList: {
    paddingHorizontal: 15,
  },
  messageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f1f1f1',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  messageInfo: {
    flex: 1,
  },
  sender: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
  },
  messagePreview: {
    fontSize: 14,
    color: '#808080',
    marginTop: 5,
  },
  time: {
    fontSize: 12,
    color: '#808080',
    alignSelf: 'flex-end',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 19,
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
  },
});

export default MessagePage;
