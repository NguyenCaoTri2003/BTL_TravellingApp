import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import IconsF from 'react-native-vector-icons/FontAwesome';

const ScreenHotelChat = ({navigation}) => {
  const [chatHistory, setChatHistory] = useState([]); // Lưu trữ lịch sử chat

  // Danh sách câu hỏi liên quan đến đặt phòng
  const hotelQuestions = [
    { id: '1', question: 'What is the check-in time?', answer: 'The standard check-in time is 2:00 PM.' },
    { id: '2', question: 'Do you have free Wi-Fi?', answer: 'Yes, all our rooms and public areas have free Wi-Fi.' },
    { id: '3', question: 'Can I cancel my booking?', answer: 'Yes, you can cancel your booking up to 24 hours before check-in without any charges.' },
    { id: '4', question: 'Do you offer airport transfers?', answer: 'Yes, we offer airport transfers at an additional cost. Please contact us for more details.' },
    { id: '5', question: 'Are pets allowed?', answer: 'Unfortunately, pets are not allowed in our hotel.' },
    { id: '6', question: 'What amenities are included?', answer: 'Our rooms include a minibar, TV, air conditioning, and complimentary toiletries.' },
    { id: '7', question: 'Can I request an extra bed?', answer: 'Yes, extra beds are available at an additional charge. Please let us know in advance.' },
  ];

  // Xử lý khi người dùng chọn câu hỏi
  const handleQuestionPress = (item) => {
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { type: 'user', text: item.question },
      { type: 'bot', text: item.answer },
    ]);
  };

  // Render tin nhắn
  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.type === 'user' ? styles.userBubble : styles.botBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  // Render câu hỏi
  const renderQuestion = ({ item }) => (
    <TouchableOpacity
      style={styles.questionButton}
      onPress={() => handleQuestionPress(item)}
    >
      <Text style={styles.questionText}>{item.question}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        <FlatList
          data={chatHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderMessage}
          contentContainerStyle={styles.chatContent}
        />
      </View>
      <View style={styles.questionsContainer}>
        <Text style={styles.questionsHeader}>Select a question:</Text>
        <FlatList
          data={hotelQuestions}
          keyExtractor={(item) => item.id}
          renderItem={renderQuestion}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.questionsList}
        />
        
      </View>

      <View style={styles.footer}>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.itemMenuMain}
              onPress={() => navigation.navigate('ScreenHome')}
            >
              <IconsF name="search" color="#414B52" size={25} />
              <Text style={styles.textNormal}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemMenuMain} onPress={() => navigation.navigate('ScreenFavorite')}>
              <IconsF name="heart" color="#414B52" size={25} />
              <Text style={styles.textNormal}>Favorite</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemMenuMain} onPress={() => navigation.navigate('ScreenBooked')}>
              <IconsF name="suitcase" color="#414B52" size={25} />
              <Text style={styles.textNormal}>Bookings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemMenuMain}>
              <IconsF name="wechat" color="#04BAD6" size={25} />
              <Text style={styles.textSelect}>Inbox</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.itemMenuMain}
              onPress={() => navigation.navigate('ScreenProfile')}
            >
              <IconsF name="user-circle-o" color="#414B52" size={25} />
              <Text style={styles.textNormal}>Profile</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  chatContainer: {
    flex: 6,
    padding: 10,
  },
  chatContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
  },
  userBubble: {
    backgroundColor: '#d1e7dd',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#f1f1f1',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  questionsContainer: {
    flex: 1,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  questionsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  questionsList: {
    paddingHorizontal: 10,
    height: 50
  },
  questionButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  questionText: {
    color: '#ffffff',
    fontSize: 16,
  },
  footer:{
    height: 90,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  itemMenuMain:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  textSelect:{
    fontSize: 16,
    color: '#04BAD6'
  },
  textNormal:{
    fontSize: 16
  }
});

export default ScreenHotelChat;
