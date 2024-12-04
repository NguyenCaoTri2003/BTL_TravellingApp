import { Text, SafeAreaView, StyleSheet, ScrollView, View, TouchableOpacity, Image, FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// You can import supported modules from npm
import { useAuth } from './context/AuthContext'; // AuthContext để lấy thông tin người dùng
import { useApi } from './context/ApiContext'; // ApiContext để cập nhật dữ liệu
import { useNavigation } from '@react-navigation/native'; // Điều hướng
import { useDataHotel } from './context/DataContext';
import React, { useEffect, useState } from 'react';
import { useSearchContext } from './context/SearchContext';

const Reviews = ({ itemReview }) => {
  return (
    <View style={styles.review_details_box}>
      <View style={styles.box_name_star}>
        <View style={styles.tt_person}>
          <Image style={styles.img_avatar} defaultSource={require('../image/avt-default.png')} source={itemReview.avatar} />
          <View style={styles.name_date}>
            <Text style={styles.txt_full_name}>{itemReview.full_name}</Text>
            <Text style={styles.txt_date}>{itemReview.assessment_date}</Text>
          </View>
        </View>
        {/** hiện thị sao theo rate */}
        <View style={styles.box_star_icon}>
          {Array.from({ length: Math.min(itemReview.rate, 5) }, (_, index) => (
            <FontAwesome key={index} name="star" color="yellow" size={15} style={styles.icon_star} />
          ))}
        </View>
      </View>
      <Text style={styles.txt_comment} numberOfLines={2}>{itemReview.comment}</Text>
    </View>
  );
};

const renderItem = ({ itemReview }) => {
  return <Reviews itemReview={itemReview} />;
};

export default function ScreenInfo() {

  //const { item } = route.params; 
  const [reviews, setReviews] = useState([]);
  const { currentUser, setCurrentUser } = useAuth();
  const { updateUser } = useApi();
  const navigation = useNavigation();
  // const { dataHotel } = useDataHotel();
  const { selectedHotel, setSelectedHotel } = useDataHotel(); // Access context here
  
  const item = selectedHotel || {};  // Use selectedHotel from context
  const { searchData } = useSearchContext();  
  const { place, date, guests } = searchData;

  useEffect(() => {
    if (selectedHotel && selectedHotel.reviews) {
      setReviews(selectedHotel.reviews); // Gán reviews từ selectedHotel
    }
  }, [selectedHotel]);

  const calculateTotalReviews = (reviews) => {
    return reviews && Array.isArray(reviews) ? reviews.length : 0;
  };

  // tính trung bình cộng rate
  const calculateAverageRate = (reviews) => {
    if (!reviews || reviews.length === 0) return 0; // Nếu reviews không có dữ liệu, trả về 0
    const totalRate = reviews.reduce((sum, review) => sum + (review.rating || 0), 0); // Tổng điểm
    return (totalRate / reviews.length).toFixed(1); // Làm tròn đến 1 chữ số thập phân
  };

  if (!selectedHotel || !selectedHotel.id) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>No hotel selected</Text>
    </SafeAreaView>
  );
}

  const selectHotel = (hotel) => {
    setSelectedHotel(hotel); // Đặt khách sạn đã chọn vào context
    if (hotel.reviews && Array.isArray(hotel.reviews)) {
      navigation.navigate('ScreenReviews', {
        reviews: hotel.reviews, // Truyền mảng reviews sang ScreenReview
      });
    } else {
      console.warn("No reviews available for the selected hotel.");
      navigation.navigate('ScreenReviews', {
        reviews: [], // Truyền một mảng rỗng nếu không có reviews
      });
    }
  };

  console.log("Selected hotel:", selectedHotel);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view_like}>
        <TouchableOpacity style={styles.view_icon}>
          <AntDesign name="left" color="white" size={20} onPress={() => navigation.goBack()} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.img_banner}>
          <Image style={styles.img} source={item.img} />
          
        </View>
        <View style={styles.info_room}>
          <Text style={styles.name_room}>{item.title}</Text>
          <View style={styles.view_map}>
            <View style={styles.name_map}>
              <FontAwesome name="map-marker" color="#00bdd5" size={20} style={styles.icon} /> 
              <Text style={styles.txt_address}>{item.location}</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.txt_view_map}>View map</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.view_rate_review}>
            <View style={styles.rate_review}>
              <FontAwesome name="star" color="yellow" size={15} style={styles.icon} />
              <Text style={styles.txt_rate}>{calculateAverageRate(reviews)}/5</Text>
            </View>
            <TouchableOpacity
              style={styles.rate_review}
              onPress={() => selectHotel(selectedHotel)}
            >
              <Text style={styles.txt_rv}>{calculateTotalReviews(reviews)} reviews</Text>
              <AntDesign name="right" color="#75777b" size={20} style={styles.icon_right} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.facilities_services}>
          <Text style={styles.txt_title}>Facilities & services</Text>
          <View style={styles.v_Facilities}>
            <Text style={styles.txt_Facilities}>{item.facility_1.guest} guests</Text>
            <Text style={styles.txt_Facilities}>{item.facility_1.bedroom} bedroom</Text>
            <Text style={styles.txt_Facilities}>{item.facility_1.bed} bed</Text>
            <Text style={styles.txt_Facilities}>{item.facility_1.bath} bath</Text>
          </View>

          {/** Dịch vụ 2 */}
          <View style={styles.services_2_list}>
            {item.facility_2.wifi === 1 && (
              <View style={styles.v_services}>
                <FontAwesome5 name="wifi" color="#75777b" size={14} style={styles.icon} />
                <Text>Wifi</Text>
              </View>
            )}
            {item.facility_2.kitchen === 1 && (
              <View style={styles.v_services}>
                <Image source={require('../image/icon-bed.png')} style={styles.icon_img} />
                <Text>Kitchen</Text>
              </View>
            )}
            {item.facility_2.pool === 1 && (
              <View style={styles.v_services}>
                <Image source={require('../image/icon-bed.png')} style={styles.icon_img} />
                <Text>Pool</Text>
              </View>
            )}
            {item.facility_2.garden === 1 && (
              <View style={styles.v_services}>
                <Image source={require('../image/icon-bed.png')} style={styles.icon_img} />
                <Text>Garden</Text>
              </View>
            )}
          </View>     

          <TouchableOpacity
            style={styles.bt_show_more}
            onPress={() => navigation.navigate('ScreenFacilitiesServices', {
              facility_1: item.facility_1,
              facility_2: item.facility_2,
              cleaning: item.cleaning,
              bathroom: item.bathroom,
           })}
          >
            <Text style={styles.bt_txt}>Show All</Text>
          </TouchableOpacity>
        </View>

        {/** Reviews */}
        <View style={styles.facilities_services}>
          <View style={styles.v_title}>
            <Text style={styles.txt_title}>Reviews</Text>
            <TouchableOpacity
              style={styles.bt_see_all}
              onPress={() => selectHotel(selectedHotel)}
            >
              <Text style={styles.txt_see_all}>See all</Text>
              <AntDesign name="right" color="#75777b" size={15} style={styles.icon_right} />
            </TouchableOpacity>
          </View>
          <View style={styles.v_cham}>
            <Text style={styles.txt_cham}>{calculateAverageRate(reviews)}</Text>
            <Text style={styles.txt_5}> /5</Text>
          </View>
          <View style={styles.v_flatlist}>
            <FlatList
              data={reviews.slice(0, 3)}
              renderItem={({ item }) => <Reviews itemReview={item} />}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              //keyExtractor={(itemReview) => itemReview.id.toString()}
              keyExtractor={(itemReview, index) => 
                (itemReview?.id ? itemReview.id.toString() : `key-${index}`)
              }
              ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
            />
          </View>
        </View>
        <View style={styles.facilities_services}>
          <Text style={styles.txt_title}>Policies</Text>
          <View style={styles.view_Policies}>
            <Text style={styles.txt_rules}>House rules</Text>
            <View style={styles.v_time}>
              <AntDesign name="clockcircleo" color="#747579" size={17} style={styles.icon} />
              <Text style={styles.txt_Facilities}>Earliest check-in time: 14:00</Text>
            </View>
            <View style={styles.v_time}>
              <AntDesign name="clockcircleo" color="#747579" size={17} style={styles.icon} />
              <Text style={styles.txt_Facilities}>Lastest check-out time: 12:00</Text>
            </View>
          </View>
          <Text style={styles.txt_title}>Checkin policies</Text>
          <Text style={styles.txt_nd} numberOfLines={2}>
            It's always a good idea to confirm the check-in policy directly with the owner/manager
            before your arrival so that you can...
          </Text>
          <TouchableOpacity style={styles.bt_show_more}>
            <Text style={styles.bt_txt}>View more</Text>
            <AntDesign name="right" color="#75777b" size={15} style={styles.icon_right_2} />
          </TouchableOpacity>
        </View>

        {/** Description */}
        <View style={styles.facilities_services}>
          <Text style={styles.txt_title}>Description</Text>
          <Image style={styles.img_description} source={item.img_description} />
          <Text style={styles.txt_nd} numberOfLines={3}>{item.description}</Text>
          <TouchableOpacity
            style={styles.bt_show_more}
            onPress={() => navigation.navigate('ScreenDescription',{
              description: item.description,
              location: item.location,
              img_description: item.img_description,
           })}
          >
            <Text style={styles.bt_txt}>View more</Text>
            <AntDesign name="right" color="#75777b" size={15} style={styles.icon_right_2} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.txt_footer}>
          <Text style={styles.txt_footer1}>From: </Text>
          <Text style={styles.txt_footer2}>${item.price}/night</Text>
        </View>
        <TouchableOpacity
          style={styles.bt_book_now}
          onPress={() => navigation.navigate('ScreenConfirm',{
            price: item.price,
            img: item.img,
            date,
            guests,
            title: item.title,
            id: item.id
          })}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Book now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  txt_comment:{
    marginTop: 15,
    color: 'gray',
  },
  txt_full_name:{
    fontWeight: 'bold',
    fontSize: 17,
  },
  icon_star:{
    marginLeft: 3,
  },
  txt_date:{
    color: 'gray',
  },
  img_avatar:{
    height: 50,
    width: 50,
    borderRadius: 50,
    resizeMode: 'cover', // Đảm bảo ảnh thu nhỏ mà không bị mất tỉ lệ
    marginRight: 7,
  },
  name_date:{
    justifyContent: 'space-between',
    height: 50,
    paddingVertical: 2,
  },
  tt_person:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  box_star_icon:{
    flexDirection: 'row',
  },
  box_name_star:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  review_details_box:{
    height: 140,
    width: 300,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    padding: 15,
  },
  img_description:{
    width: "100%", 
    height: 180, 
    resizeMode: 'cover', // Đảm bảo ảnh thu nhỏ mà không bị mất tỉ lệ
    marginTop: 10,
  },
  txt_nd:{
    color: 'gray',
    marginVertical: 10,
  },
  txt_rules:{
    color: '#626366',
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon_right_2:{
    marginTop: 2,
    marginLeft: 5,
  },
  v_time:{
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  view_Policies:{
    padding: '5%',
    backgroundColor: '#fafafa',
    marginVertical: 10,
    
  },

  v_flatlist:{
    marginBottom: 15,
  },

  txt_5:{
    fontSize: 17,
    paddingBottom: 2
  },
  txt_cham:{
    fontSize: 27,
    fontWeight: 'bold',
  },
  v_cham:{
    flexDirection: 'row',
    alignItems: 'end',
    marginVertical: 10,
  },
  txt_see_all:{
    color: 'gray'
  },
  icon_right:{
    marginLeft: 5,
  },
  bt_see_all: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  v_title:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bt_txt:{
    color: 'gray',
  },

  bt_show_more:{
    height: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#adaeb0',
    marginTop: 10,
    marginBottom: 15,
    flexDirection:'row',

  },
  icon_img:{
    marginRight: 10,
    height: 20,
    width: 20,
  },
  v_services:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  txt_Facilities:{
    marginRight: 10,
    color: 'gray',
  },
  v_Facilities:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  txt_title:{
    fontSize: 19,
    fontWeight: 'bold',
  },

  facilities_services:{
    paddingHorizontal: '5%',
    borderBottomWidth: 1,
    borderColor: '#efefef',
    marginTop: 20,
  },
  txt_rv:{
    marginLeft: 10,
    fontSize: 17,
    color: 'gray',
    textAlign: 'center',
  },
  rate_review:{
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  view_rate_review:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
    height: 50,
    paddingHorizontal: '5%',
    borderRadius: 5,
  },
  txt_view_map:{
    color: '#00bdd5',
    textDecorationLine: 'underline', // Gạch chân văn bản
  },

  icon:{
    marginRight: 10,
  },
  view_map:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 13,
  },
  name_map:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  name_room:{
    fontWeight: 'bold',
    fontSize: 20,
  },
  info_room:{
    marginTop: 10,
    paddingHorizontal: '5%',
    borderBottomWidth: 1,
    borderColor: '#efefef',
    paddingBottom: 20,
    //marginBottom: 20,
  },
  view_icon:{
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Làm mờ nền
    alignItems: 'center',
    justifyContent: 'center',
    top: 30, 
    left: 0, 
    zIndex: 10, 
  },
  view_like:{
    top: 30,
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    position: 'absolute', // Cố định vị trí
    zIndex: 10, // Luôn nằm trên các thành phần khác
  },
  img:{
    width: "100%", 
    height: 240, 
    resizeMode: 'cover', // Đảm bảo ảnh thu nhỏ mà không bị mất tỉ lệ
  },
  bt_book_now:{
    backgroundColor: '#00bdd5',
    height: '60%',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  footer:{
    flexDirection: 'row',
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    borderTopWidth: 1,
    borderColor: '#efefef',
  },
  txt_footer:{
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  txt_footer1:{
    color: 'gray',
    fontSize: 17,
  },
  txt_footer2:{
    fontWeight: 'bold',
    fontSize: 18,
  }
});
