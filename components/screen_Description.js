import { Text, SafeAreaView, StyleSheet, ScrollView, View, TouchableOpacity, Image, FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useRoute } from '@react-navigation/native';

export default function ScreenDescription({ navigation }) {

  const route = useRoute();
  const { description, location, img_description } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.view_icon} onPress={() => navigation.goBack()}>
          <AntDesign name="left" color="gray" size={25} />
        </TouchableOpacity>
        <Text style={styles.title_header}>Description</Text>
        <AntDesign name="left" color="white" size={20} />
      </View>
      
      <ScrollView style={styles.scroll_view} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <Image style={styles.img_banner} source={img_description}/>
        <Text style={styles.txt_nd}>{description}</Text>
        <View style={styles.view_map}>
         <View style={styles.name_map}>
          <FontAwesome name='map-marker' color='#00bdd5' size={25} style={styles.icon}/>
          <Text style={styles.txt_address}>{location}</Text>
         </View>
         <TouchableOpacity>
          <Text style={styles.txt_view_map}>Open map</Text>
         </TouchableOpacity>
        </View>
        <View style={styles.view_check}>
         <View style={styles.box_check}>
          <Feather name="check" color="#7b7c7e" size={16} style={styles.icon_check}/>
          <Text style={styles.txt_check}>Consectetur magna consectetur</Text>
         </View>
         <View style={styles.box_check}>
          <Feather name="check" color="#7b7c7e" size={16} style={styles.icon_check}/>
          <Text style={styles.txt_check}>Voluptate magna fugiat tempor incididunt</Text>
         </View>
         <View style={styles.box_check}>
          <Feather name="check" color="#7b7c7e" size={16} style={styles.icon_check}/>
          <Text style={styles.txt_check}>Aliqua in in mollit laboris tempor in ut incididunt</Text>
         </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: 'white',
  },
  icon_check:{
    marginRight: 10,
  },
  txt_check:{
    fontSize: 16,
    color:'#7b7c7e',
  },
  box_check:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  txt_view_map:{
    color: '#00bdd5',
    textDecorationLine: 'underline', // Gạch chân văn bản
    fontSize: 16,
  },
  txt_address:{
    fontSize: 16,
    color:'#5c5d5f',
  },

  icon:{
    marginRight: 10,
  },
  view_map:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 25,
  },
  name_map:{
    flexDirection: 'row',
    alignItems: 'center',
  },

  txt_nd:{
    marginTop: 15,
    fontSize: 15,
    color: 'gray',
  },
  img_banner:{
    width: "100%", 
    height: 180, 
    resizeMode: 'cover', // Đảm bảo ảnh thu nhỏ mà không bị mất tỉ lệ
    marginTop: 20,
    borderRadius: 5,
  },
  title_header:{
    fontWeight: 'bold',
    fontSize: 15,
    color:'#5c5c61',
  },
  scroll_view:{
    flex: 1,
    marginTop: 60,
    paddingHorizontal: '5%',
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
