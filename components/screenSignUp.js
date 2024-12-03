import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Modal, Alert, Keyboard } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Ionicons';

import { useApi } from './context/ApiContext'; // Import hook từ ApiContext
import { useNavigation } from '@react-navigation/native'; // Import để điều hướng
import { useAuth } from './context/AuthContext'; // Import context

const API_URL = 'https://6722030b2108960b9cc28724.mockapi.io/loginApp'; // URL API của bạn

export default function ScreenSignUp() {
  const { users, addUser, error, loading } = useApi(); // API context
  const { setCurrentUser } = useAuth(); // Auth context
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();



  const [placeholder, setPlaceholder] = useState('+84 Mobile Number');
  const [modalVisible, setModalVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerification, setIsVerification] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const DEFAULT_OTP = '1111'; // Mã OTP mặc định
   
  // Xử lý tiếp tục (Kiểm tra số điện thoại)
  const handleContinue = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch data.');

      const users = await response.json();
      const userExists = users.find(user => user.phoneNumber === phoneNumber);

      if (userExists) {
        setErrorMessage('This phone number already has an account.');
      } else {
        setErrorMessage('');
        setIsVerification(true);
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error checking phone number:', error);
      setErrorMessage('Unable to verify. Please try again later.');
    }
  };

  // Xử lý đăng ký
  const handleRegister = async () => {
    if (verificationCode === DEFAULT_OTP) {
      const newUser = { phoneNumber, password, listFavorateHotel: [] };
      await addUser(newUser);
      if (!error) { 
        setCurrentUser(newUser); // Lưu người dùng mới vào context
        setModalVisible(false);
        Alert.alert('Success', 'Account created successfully!');
        setPhoneNumber('');
        setPassword('');
        setVerificationCode('');
        setIsVerification(false);
        navigation.navigate('ScreenHome'); // Điều hướng đến Home
      } else {
        Alert.alert('Registration Failed', 'Please try again.');
      }
    } else {
      Alert.alert('Invalid verification code.');
    } 
  };

  // Xử lý đăng nhập
  const handleLogin = async () => {
    const existingUser = users.find(user => user.phoneNumber === phoneNumber);

    if (existingUser) {
      // Kiểm tra mật khẩu
      if (existingUser.password === password) {
        setCurrentUser(existingUser); // Lưu người dùng vào context
        Alert.alert('Welcome back!', 'You are now logged in.');
        navigation.navigate('ScreenHome'); // Điều hướng đến Home
        setModalVisible(false);
      } else {
        Alert.alert('Error', 'Incorrect password. Please try again.');
      }
    } else {
        setErrorMessage('Invalid phone number or password. Please register first.');
        setModalVisible(false);
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Create an account</Text>
        <View style={styles.boxEnterNumber}>
          <Text style={styles.textEnterNumber}>Enter your mobile number:</Text>
          <View style={styles.boxInputSDT}>
            <TextInput
              style={styles.inputSDT}
              placeholder={placeholder}
              placeholderTextColor="#A9A9A9"
              keyboardType="phone-pad"
              returnKeyType="done" 
              onSubmitEditing={() => Keyboard.dismiss()}
              onChangeText={setPhoneNumber}
              value={phoneNumber}
            />
          </View>
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}
          <TouchableOpacity style={styles.btnContinue} onPress={handleContinue}>
            <Text style={styles.textBtnContinue}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.textContent1}>or</Text>
        <View style={styles.loginWith}>
          <TouchableOpacity style={[styles.loginW, styles.colorLoginApple]}>
            <AntDesign name="apple-o" size={20} color="black" />
            <Text style={[styles.textLoginApple, styles.textLoginW]}>Continue with Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.loginW, styles.colorLoginFB]}>
            <Icons name='logo-facebook' color='#4698D6' size={20} />
            <Text style={[styles.textLoginFB, styles.textLoginW]}>Continue with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.loginW, styles.colorLoginGG]}>
            <Icons name='logo-google' color='#DB4F57' size={20} />
            <Text style={[styles.textLoginGG, styles.textLoginW]}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.textContent2}>By signing up, you agree to our{'\n'}<Text style={styles.underlinedText}>Terms of Service</Text> and <Text style={styles.underlinedText}>Privacy Policy</Text></Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.textFooter}>Already had an account?</Text>
        <TouchableOpacity  onPress={() => setModalVisible(true)}>
          <Text style={[styles.textLogin, styles.underlinedText]}>Log in</Text>
        </TouchableOpacity>
      </View>

    {/* Modal for Sign Up */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            {isVerification ? (
              <>
                <Text style={styles.modalTitle}>Complete Registration</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Password"
                  placeholderTextColor="#A9A9A9"
                  secureTextEntry
                  onChangeText={setPassword}
                  value={password}
                  returnKeyType="done"  
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Verification Code"
                  placeholderTextColor="#A9A9A9"
                  onChangeText={setVerificationCode}
                  value={verificationCode}
                  returnKeyType="done"  
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
                <TouchableOpacity style={styles.modalButton} onPress={handleRegister}>
                  <Text style={styles.textBtnContinue}>Register</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Log In</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Phone Number"
                  placeholderTextColor="#A9A9A9"
                  keyboardType="phone-pad"
                  onChangeText={setPhoneNumber}
                  value={phoneNumber}
                  returnKeyType="done"  
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Password"
                  placeholderTextColor="#A9A9A9"
                  secureTextEntry
                  onChangeText={setPassword}
                  value={password}
                  returnKeyType="done"  
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
                <TouchableOpacity style={styles.modalButton} onPress={handleLogin}>
                  <Text style={styles.textBtnContinue}>Log In</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModal}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  header: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 20
  },
  textHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    height: '30%',
    marginTop: 15,
  },
  boxEnterNumber: {
    backgroundColor: '#Fff',
    height: '70%',
    justifyContent: 'space-between'
  },
  textEnterNumber: {
    fontSize: 20,
  },
  boxInputSDT: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },
  inputSDT: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ecf0f1',
    borderRadius: 5,
    paddingLeft: 10
  },
  btnContinue: {
    borderRadius: 5,
    height: 60,
    backgroundColor: '#00BDD5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  textBtnContinue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20
  },
  textContent1: {
    fontSize: 15,
    color: 'gray',
    marginTop: 7
  },
  loginW: {
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  loginWith: {
    width: '100%',
    marginTop: 15
  },
  textLoginW: {
    marginLeft: 10,
    fontSize: 18,
  },
  textContent2: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 5
  },
  underlinedText: {
    textDecorationLine: 'underline',
  },
  colorLoginFB: {
    borderColor: '#4698D6',
  },
  textLoginFB: {
    color: '#4698D6'
  },
  colorLoginGG: {
    borderColor: '#DB4F57',
  },
  textLoginGG: {
    color: '#DB4F57'
  },
  footer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textFooter: {
    fontSize: 18,
    paddingRight: 10,
    marginBottom: 25
  },
  textLogin: {
    fontSize: 18,
    color: '#00BDD5',
    marginBottom: 25
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20
  },
  modalInput: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10
  },
  modalButton: {
    backgroundColor: '#00BDD5',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    width: '100%'
  },
  closeModal: {
    marginTop: 15,
    color: 'red'
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});