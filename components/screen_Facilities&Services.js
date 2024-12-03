import { Text, SafeAreaView, StyleSheet, ScrollView, View, TouchableOpacity, Image, FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

// or any files within the Snack
import { useRoute } from '@react-navigation/native';

// const data = [
//   {
//     id: 1,
//     facility_1: {
//       guest: 2,
//       bedroom: 1,
//       bed: 1,
//       bath: 1,
//     },
//     facility_2: { // 1: True, 0: False
//       wifi: 1,
//       kitchen: 1,
//       exercise_equipment: 1,
//       pool: 1,
//       garden: 1,
//     },
//     cleaning: {
//       washer: 1,
//       free_dryer: 1,
//       iron: 1,
//     },
//     bathroom:{
//       bathtub: 1,
//       hair_dryer: 1,
//     },
//   },
// ];

// Icon mapping based on facility names
const facilityIcons = {
  wifi: require('../image/icons8-wifi-48.png'),
  kitchen: require('../image/icon_kitchen.png'),
  pool: require('../image/icon_pool.png'),
  garden: require('../image/icon_garden.png'),
  exercise_equipment:require('../image/icons8-dumbbell-48.png'),
  washer: require('../image/icons8-washer-48.png'),
  free_dryer: require('../image/icons8-washer-48.png'),
  iron: require('../image/icons8-iron-48.png'),
  bathtub: require('../image/icons8-bathtub-48.png'),
  hair_dryer: require('../image/icons8-hair-dryer-64.png'),
};


export default function ScreenFacilitiesServices({ navigation }) {
  const route = useRoute();
  const { facility_1, facility_2, cleaning, bathroom } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.view_icon} onPress={() => navigation.goBack()}>
          <AntDesign name="left" color="gray" size={25} />
        </TouchableOpacity>
        <Text style={styles.title_header}>Facilities & Services</Text>
        <AntDesign name="left" color="white" size={20} />
      </View>

      <ScrollView
        style={styles.scroll_view}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* Render Facilities 1 */}
        <View style={styles.view_Facilities}>
          <Text style={styles.txt_title}>Facilities</Text>
          <View style={styles.box_facility_1}>
            <Text style={styles.txt_box_facility_1}>{facility_1.guest} Guests</Text>
            <Text style={styles.txt_box_facility_1}>{facility_1.bedroom} Bedroom</Text>
            <Text style={styles.txt_box_facility_1}>{facility_1.bed} Bed</Text>
            <Text style={styles.txt_box_facility_1}>{facility_1.bath} Bath</Text>
          </View>
        </View>

        {/* Render Facilities 2 */}
        <View style={styles.view_Facilities}>
          {Object.keys(facility_2).map((name_facility_2, index) => (
            facility_2[name_facility_2] === 1 && (
              <View key={index} style={styles.box_facility_2}>
                <Image source={facilityIcons[name_facility_2]} style={styles.icon_img} />
                <Text style={styles.txt_box_facility_2}>
                  {name_facility_2.charAt(0).toUpperCase() + name_facility_2.slice(1)}
                </Text>
              </View>
            )
          ))}
        </View>

        {/* Render Services */}
        <Text style={styles.txt_title}>Services</Text>
        <View style={styles.view_Facilities}>
          {Object.keys(cleaning).map((name_cleaning, index) => (
            cleaning[name_cleaning] === 1 && (
              <View key={index} style={styles.box_facility_2}>
                <Image source={facilityIcons[name_cleaning]} style={styles.icon_img} />
                <Text style={styles.txt_box_facility_2}>
                  {name_cleaning.charAt(0).toUpperCase() + name_cleaning.slice(1)}
                </Text>
              </View>
            )
          ))}
        </View>

        {/* Render Bathroom */}
        <Text style={styles.txt_title}>Bathroom</Text>
        <View style={styles.view_Facilities}>
          {Object.keys(bathroom).map((name_bathroom, index) => (
            bathroom[name_bathroom] === 1 && (
              <View key={index} style={styles.box_facility_2}>
                <Image source={facilityIcons[name_bathroom]} style={styles.icon_img} />
                <Text style={styles.txt_box_facility_2}>
                  {name_bathroom.charAt(0).toUpperCase() + name_bathroom.slice(1)}
                </Text>
              </View>
            )
          ))}
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
  // txt_title_mini:{
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   marginBottom: 15,
  // },
  txt_box_facility_2:{
    fontSize: 16,
  },
  icon_img:{
    marginRight: 10,
    height: 25,
    width: 25,
  },
  box_facility_2:{
    flexDirection: 'row',
    marginBottom:15,
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    paddingHorizontal: 5,
    paddingBottom:12,
    alignItems: 'center',
  },
  txt_box_facility_1:{
    fontSize: 16,
    marginRight: 15,
    color: 'gray',
    marginBottom: 15,
  },
  box_facility_1:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  txt_title:{
    marginVertical: 15,
    fontSize: 23,
    fontWeight: 'bold',
  },
  view_Facilities:{
    
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
