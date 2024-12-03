import { Text, SafeAreaView, StyleSheet, ScrollView, View, TouchableOpacity, Image, FlatList} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Data_Reviews = [
  {
    id: 1,
    full_name: 'Jinny Oslin',
    avatar: require('../image/avatar_1.jpg'),
    assessment_date: 'One day ago',
    rate: 5,
    comment: 'The best apartment I have ever booked. Spacious, clean, Scandinavian design. Excellent location. Astonishing views to the port. Comfortable beds. Feeling like home. It is better than the pictures showing',
  }, 
  {
    id: 2,
    full_name: 'Marina John',
    avatar: require('../image/avatar_2.jpg'),
    assessment_date: 'One day ago',
    rate: 4,
    comment: 'The best apartment I have ever booked. Spacious, clean, Scandinavian design. Excellent location. Astonishing views to the port. Comfortable beds. Feeling like home. It is better than the pictures showing',
  }, 
];



export default function TextReviews({ navigation }) {


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.view_icon} onPress={() => navigation.goBack()}>
          <AntDesign name="left" color="gray" size={25} />
        </TouchableOpacity>
        <Text style={styles.title_header}>Reviews</Text>
        <AntDesign name="left" color="white" size={20} />
      </View>

      <ScrollView style={styles.scroll_view}>
        <Text style={styles.txt_title}>All Reviews</Text>



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
  txt_title:{
    fontSize: 30,
    textAlign: 'center',
  },
  scroll_view:{
    flex: 1,
    marginTop: 90,
    paddingHorizontal: '5%',
    //backgroundColor: 'red',
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
