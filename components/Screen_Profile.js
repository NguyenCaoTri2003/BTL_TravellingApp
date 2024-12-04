import { Text, SafeAreaView, StyleSheet, ScrollView, View, TouchableOpacity, Image, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import IconsF from 'react-native-vector-icons/FontAwesome';
import { useApi } from './context/ApiContext';
import { useAuth } from './context/AuthContext';
import { useState, useEffect } from 'react';

export default function ScreenProfile({ navigation }) {
  const { currentUser, setCurrentUser } = useAuth();
  const { users, updateUser } = useApi(); 
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // Set dữ liệu người dùng khi component được render
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setPhone(currentUser.phoneNumber);
      setPassword(currentUser.password);
    }
  }, [currentUser]);

  const handleSave = () => {
    const updatedUser = { 
      ...currentUser, 
      name, 
      phoneNumber: phone, 
      password 
    };
    setCurrentUser(updatedUser); // Gọi hàm updateUser từ ApiContext để cập nhật người dùng
    updateUser(updatedUser);
    navigation.goBack(); // Quay lại màn hình trước
  };

  return (
    <View style={styles.container}>
      {/* Thanh Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.view_icon} onPress={() => navigation.goBack()}>
          <AntDesign name="left" color="gray" size={25} />
        </TouchableOpacity>
        <Text style={styles.title_header}>Profile</Text>
        <AntDesign name="left" color="white" size={20} />
      </View>

      {/* ScrollView để hiển thị thông tin người dùng */}
      <View style={styles.scroll_view}>
        {/* Avatar */}
        <View style={styles.view_view}>
          <View style={styles.view_avatar}>
            <Image style={styles.avatar_img} source={require('../image/avt-macdinh.png')} />
            {
            //   <TouchableOpacity style={styles.btn_change_img}>
            //   <Feather name="camera" color="#828282" size={23} />
            // </TouchableOpacity>
            }
          </View>
        </View>

        {/* Thông tin người dùng */}
        <View style={styles.v_info}>
          <View style={styles.txt_noidung}>
            <Text style={styles.txt_title}>Name: </Text>
            <TextInput 
              style={styles.txt_nd} 
              value={name} 
              onChangeText={setName} 
            />
          </View>
        </View>

        <View style={styles.v_info}>
          <View style={styles.txt_noidung}>
            <Text style={styles.txt_title}>Phone: </Text>
            <TextInput 
              style={styles.txt_nd} 
              value={phone} 
              onChangeText={setPhone} 
            />
          </View>
          
        </View>

        <View style={styles.v_info}>
          <View style={styles.txt_noidung}>
            <Text style={styles.txt_title}>Password: </Text>
            <TextInput
              style={styles.txt_nd}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible} // Ẩn/hiển mật khẩu
            />
          </View>
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Feather
              name={isPasswordVisible ? 'eye-off' : 'eye'} // Biểu tượng thay đổi
              size={28}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Các nút để lưu và hủy */}
        <View style={styles.v_btn}>
          <TouchableOpacity style={styles.btn_cancel}>
            <Text style={styles.txt_btn}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn_save} onPress={handleSave}>
            <Text style={styles.txt_btn}>Save</Text>
          </TouchableOpacity>
        </View>
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
        <TouchableOpacity style={styles.itemMenuMain} onPress={() => navigation.navigate('ScreenChat')}>
          <IconsF name="wechat" color="#414B52" size={25} />
          <Text style={styles.textNormal}>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemMenuMain}>
          <IconsF name="user-circle-o" color="#04BAD6" size={25} />
          <Text style={styles.textSelect}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
  txt_btn:{
    fontSize: 20,
  },
  btn_save:{
    backgroundColor: '#67F83B',
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    borderRadius: 20,
  },
  btn_cancel:{
    backgroundColor: '#efefef',
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    borderRadius: 20,
  },
  v_btn:{
    height: 70,
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30
  },
  txt_title:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  txt_nd:{
    width: '100%',
    fontSize: 20,
    paddingLeft: 10,
  },
  txt_noidung:{
    flexDirection: 'row',
    width: '50%',
  },
  v_info:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  btn_change_img:{
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 50,
    position: "absolute",
    bottom: -5,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
    backgroundColor: '#EEEEEE',
    borderColor: '#828282',
  },
  avatar_img:{
    resizeMode: 'cover', 
    zIndex: 2,
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  view_view:{
    alignItems: 'center',
    width: '100%',
    marginTop: 70,
    marginBottom: 45,
  },
  scroll_view:{
    flex: 1,
    marginTop: 60,
    paddingHorizontal: '5%',
    //backgroundColor: 'white',
    width: '100%',
  },

  title_header:{
    fontWeight: 'bold',
    fontSize: 15,
    color:'#5c5c61',
  },
  
  header:{
    position: "absolute",
    top:10,
    height: 40,
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    paddingHorizontal: '5%',
    marginTop:35,
    zIndex: 999,
  },
 footer:{
    height: 90,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    //paddingBottom: 10,
    marginTop: -18
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
