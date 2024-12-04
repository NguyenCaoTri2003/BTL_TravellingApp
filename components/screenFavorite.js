import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome6';
import IconsC from 'react-native-vector-icons/Ionicons';
import IconsF from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Alert } from 'react-native';
import { useAuth } from './context/AuthContext'; // AuthContext để lấy thông tin người dùng
import { useApi } from './context/ApiContext'; // ApiContext để cập nhật dữ liệu
import { useNavigation } from '@react-navigation/native'; // Điều hướng
import { useDataHotel } from './context/DataContext';
 
const API_URL = 'https://6722030b2108960b9cc28724.mockapi.io/loginApp';

export default function ScreenFavorite() {
  const { currentUser, setCurrentUser } = useAuth();
  const { updateUser } = useApi();
  const navigation = useNavigation();
  const { dataHotel } = useDataHotel();

  // Lọc danh sách khách sạn yêu thích từ dữ liệu tổng
  const favoriteHotels = dataHotel.beach
    .concat(dataHotel.mountain)
    .concat(dataHotel.camping)
    .filter((hotel) => currentUser?.listFavorateHotel?.includes(hotel.id));

    // Xử lý xóa khách sạn khỏi danh sách yêu thích
    const handleRemoveFavorite = async (hotelId) => {
      try {
        const updatedFavorites = currentUser.listFavorateHotel.filter((id) => id !== hotelId);

        // Cập nhật trạng thái trong AuthContext
        const updatedUser = { ...currentUser, listFavorateHotel: updatedFavorites };
        setCurrentUser(updatedUser);

        Alert.alert('Success', 'Hotel removed from favorites.');
      } catch (error) {
        console.error('Failed to remove favorite:', error);
        Alert.alert('Error', 'Failed to remove hotel from favorites.');
      }
    };

    const navigateToHome = () => {
      navigation.navigate('ScreenHome'); // Quay lại màn hình HomeCu
    };

//     useEffect(() => {
//   console.log('Favorite Hotels:', favoriteHotels);
//   console.log('DataHotel:', dataHotel);
// }, [favoriteHotels, dataHotel]);

  // Render từng khách sạn yêu thích
  const renderFavoriteHotel = ({ item }) => (
    <TouchableOpacity
      style={styles.room}
      onPress={() => navigation.navigate('ScreenInfo', { item })} 
    >
      <Image source={item.img} style={styles.imgRoom} />
      <TouchableOpacity
        style={styles.heart}
        onPress={() => handleRemoveFavorite(item.id)}
      >
        <Icons name="heart" color="red" size={30} style={styles.iconHeart} />
      </TouchableOpacity>
      <View style={styles.detail1}>
        <Text style={styles.textHotel}>{item.title}</Text>
        <View style={styles.rate}>
          <IconsC name="star" size={20} color="#EBC350" style={styles.iconRate} />
          <Text style={styles.textRace}>{item.rate}</Text>
        </View>
      </View>
      <View style={styles.detail2}>
        <Text style={styles.textPlace}>{item.facility_1.bedroom} bedroom</Text>
        <View style={styles.price}>
          <Icons name="dollar-sign" color="#000" size={20} style={styles.iconPrice} />
          <Text style={styles.textPrice}>
            <Text style={styles.textBold}>{item.price}</Text>/night
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign
          name="left"
          color="#A6A7AB"
          size={25}
          onPress={navigateToHome}
        />
        <Text style={styles.name}>Favorite</Text>
        <AntDesign name="left" color="#f9f9f9" size={25} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Place you liked</Text>
          {favoriteHotels && favoriteHotels.length > 0 ? (
            <FlatList
              data={favoriteHotels}
              keyExtractor={(item, index) => (item?.id ? item.id.toString() : `key-${index}`)}
              showsVerticalScrollIndicator={false}
              renderItem={renderFavoriteHotel}
            />
          ) : (
            <Text style={styles.noFavoritesText}>No favorite hotels found.</Text>
          )}
      </View>
      <View style={styles.footer}>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.itemMenuMain}
            onPress={navigateToHome}
          >
            <IconsF name="search" color="#414B52" size={25} />
            <Text style={styles.textNormal}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemMenuMain}>
            <IconsF name="heart" color="#04BAD6" size={25} />
            <Text style={styles.textSelect}>Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemMenuMain} onPress={() => navigation.navigate('ScreenBooked')}>
            <IconsF name="suitcase" color="#414B52" size={25} />
            <Text style={styles.textNormal}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemMenuMain} onPress={() => navigation.navigate('ScreenChat')}>
            <IconsF name="wechat" color="#414B52" size={25} />
            <Text style={styles.textNormal}>Inbox</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemMenuMain} onPress={() => {navigation.navigate('ScreenProfile')}}>
            <IconsF name="user-circle-o" color="#414B52" size={25} />
            <Text style={styles.textNormal}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  room:{
    height: 500,
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%'
  },
  imgRoom:{
    width: '100%',
    height: 420,
    borderRadius: 10,
  },
  detail1:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  textHotel:{
    fontSize: 20,
    fontWeight: 'bold',
    width: '88%',
  },
  textRace:{
    fontSize: 20,
    color: '#414B52',
  },
  detail2:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  rate:{
    flexDirection: 'row',
    width: '12%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 5
  },
  price:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textPlace:{
    fontSize: 20,
    color: '#97999C'
  },
  textPrice:{
    fontSize: 20,
    color: '#414B52'
  },
  textBold:{
    fontWeight: 'bold',
    color: '#000'
  },
  heart:{
    backgroundColor :'#fff',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginRight: 15
  },
  noFavoritesText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
  content:{
    flex: 9,
    paddingHorizontal: 20,
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
