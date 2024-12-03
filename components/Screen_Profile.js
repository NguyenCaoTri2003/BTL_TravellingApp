import { Text, SafeAreaView, StyleSheet, ScrollView, View, TouchableOpacity, Image, FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
// You can import supported modules from npm
import { Card } from 'react-native-paper';

export default function ScreenProfile({ navigation, route }) {

  return (
    <SafeAreaView style={styles.container}>
      {/* thanh header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.view_icon} onPress={() => navigation.goBack()}>
          <AntDesign name="left" color="gray" size={25} />
        </TouchableOpacity>
        <Text style={styles.title_header}>Profile</Text>
        <AntDesign name="left" color="white" size={20} />
      </View>
      {/* scroll_view */}
      <ScrollView style={styles.scroll_view}>
        {/* avatar */}
        <View style={styles.view_view}>
          <View style={styles.view_avatar}>
            <Image style={styles.avatar_img} source={require('../image/avatar_2.jpg')}/>
            <TouchableOpacity style={styles.btn_change_img}>
              <Feather name="camera" color="#828282" size={23} />
            </TouchableOpacity>
          </View>
        </View>
        {/* info */}
        <View style={styles.v_info}>
          <View style={styles.txt_noidung}>
           <Text style={styles.txt_title}>Name: </Text>
           <Text style={styles.txt_nd}>sssssssssssssss</Text>
          </View>
          <TouchableOpacity>
            <Image source={require('../image/icons8-pen-25.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.v_info}>
          <View style={styles.txt_noidung}>
           <Text style={styles.txt_title}>Phone: </Text>
           <Text style={styles.txt_nd}>sssssssssssssss</Text>
          </View>
          <TouchableOpacity>
            <Image source={require('../image/icons8-pen-25.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.v_info}>
          <View style={styles.txt_noidung}>
           <Text style={styles.txt_title}>Password: </Text>
           <Text style={styles.txt_nd}>ssssssssssssssss</Text>
          </View>
          <TouchableOpacity>
            <Image source={require('../image/icons8-pen-25.png')} />
          </TouchableOpacity>
        </View>

          
      </ScrollView>

      <View style={styles.v_btn}>
        <TouchableOpacity style={styles.btn_cancel}>
          <Text style={styles.txt_btn}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn_save}>
          <Text style={styles.txt_btn}>Save</Text>
        </TouchableOpacity>
      </View>

      {/** */}

    </SafeAreaView>
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
    position: "absolute",
    bottom:30,
    height: 70,
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: '5%',
    zIndex: 998,
    flexDirection: 'row',
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
    top:0,
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
 
});
