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

export default function ScreenBooked() {
  const { currentUser } = useAuth();
  const navigation = useNavigation();
  const { dataHotel } = useDataHotel();

  // Lọc danh sách khách sạn đã đặt từ dữ liệu tổng
  const bookedHotels = currentUser?.listBookedHotel.map((booking) => {
    const hotel =
      dataHotel.beach
        .concat(dataHotel.mountain) 
        .concat(dataHotel.camping)
        .find((item) => item.id === booking.id);

    return hotel
      ? { ...hotel, ...booking } // Kết hợp thông tin khách sạn và thông tin đặt phòng
      : null;
  }).filter(Boolean); // Loại bỏ giá trị null nếu không tìm thấy khách sạn
  console.log(bookedHotels)
  // Render từng khách sạn đã đặt
  const renderBookedHotel = ({ item }) => (
    <TouchableOpacity
      style={styles.room}
      
    >
      <Image source={item.img} style={styles.imgRoom} />
      <View style={styles.detail1}>
        <Text style={styles.textPrice}>ID Booking: {item.idBill}</Text>
        <Text style={styles.textPrice}>Total: {item.totalAmountAll}</Text>
      </View>
      <View style={styles.detail2}>
        <Text style={styles.textDetails}>
          Guests: {item.guests} | Days: {item.numberDay}
        </Text>
        <Text style={styles.textDetails}>Payment: {item.selectedOption}</Text>
        <Text style={styles.textDetails}>Date: {item.dayBooking}</Text>
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
          onPress={() => navigation.navigate('ScreenHome')}
        />
        <Text style={styles.name}>Bookings</Text>
        <AntDesign name="left" color="#f9f9f9" size={25} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Hotels you booked</Text>
          {bookedHotels && bookedHotels.length > 0 ? (
            <FlatList
              data={bookedHotels}
              keyExtractor={(item, index) => (item?.id ? item.id.toString() : `key-${index}`)}
              showsVerticalScrollIndicator={false}
              renderItem={renderBookedHotel}
            />
          ) : (
            <Text style={styles.noBookingsText}>No hotel bookings found.</Text>
          )}
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
          <TouchableOpacity style={styles.itemMenuMain} >
            <IconsF name="suitcase" color="#04BAD6" size={25} />
            <Text style={styles.textSelect}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemMenuMain} onPress={() => navigation.navigate('ScreenChat')}>
            <IconsF name="wechat" color="#414B52" size={25} />
            <Text style={styles.textNormal}>Inbox</Text>
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
  detail2:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  textPrice:{
    fontSize: 20,
    color: '#414B52',
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
