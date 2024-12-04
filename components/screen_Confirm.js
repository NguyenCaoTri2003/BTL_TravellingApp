import { Text, SafeAreaView, StyleSheet, ScrollView, View, TouchableOpacity, Image, Modal, Button } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, { useState, useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import { useApi } from './context/ApiContext';
import { useAuth } from './context/AuthContext';

export default function ScreenConfirm({ navigation }) {

  const [selectedOption, setSelectedOption] = useState(null); // Trạng thái cho checkbox
  const [showError, setShowError] = useState(false); // Trạng thái hiển thị lỗi
  const route = useRoute();
  const { price, img, date, guests, title, id } = route.params;
  const fee1 = 5;
  const fee2 = 5;
  const [currentDate, setCurrentDate] = useState(date);  
  const [currentGuests, setCurrentGuests] = useState(guests);
  const { currentUser, setCurrentUser } = useAuth();
  const { users, updateUser } = useApi(); 

  const randomRefNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

  const currentDateBooking = new Date();
  const day = String(currentDateBooking.getDate()).padStart(2, '0');
  const month = String(currentDateBooking.getMonth() + 1).padStart(2, '0');
  const year = currentDateBooking.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  // State để điều khiển modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOptionM, setSelectedOptionM] = useState('date'); // 'date' or 'guests'

  // Hàm thay đổi số ngày
  const incrementDate = () => setCurrentDate(currentDate + 1);
  const decrementDate = () => setCurrentDate(currentDate > 1 ? currentDate - 1 : 1); 

  const incrementGuests = () => setCurrentGuests(currentGuests + 1);
  const decrementGuests = () => setCurrentGuests(currentGuests > 1 ? currentGuests - 1 : 1); 



  // Mở modal khi bấm vào icon
  const openModal = (option) => {
    setSelectedOptionM(option); // Chọn phần cần thay đổi (ngày hoặc khách)
    setModalVisible(true); // Hiển thị modal
  };

  // Đóng modal
  const closeModal = () => setModalVisible(false);

  // Tham chiếu tới ScrollView
  const scrollViewRef = useRef(null);

  const handleSelect = (option) => {
    setSelectedOption(option); // Cập nhật trạng thái khi chọn
    setShowError(false); // Ẩn lỗi khi có sự thay đổi
  };

  

  const calculateTotalPrice = (pricePerNight, date) => {
    const totalPrice = pricePerNight * date;
    return {
      totalText: `$${pricePerNight} x ${date} night`,  // Đoạn hiển thị số tiền mỗi đêm và số đêm
      totalAmount: `$${totalPrice}`,  // Tổng số tiền
    };
  };

  const calculateTotal = (pricePerNight, fee1, fee2) => {
    const totalPrice = pricePerNight + fee1 + fee2;
    return totalPrice;
  };

  const totalAmountAll = calculateTotal((price * currentDate), fee1, fee2);

  const { totalText, totalAmount } = calculateTotalPrice(price, currentDate);

  // const handleBookNow = () => {
  //   if (!selectedOption) {
  //     setShowError(true); // Hiển thị lỗi nếu chưa chọn phương thức thanh toán
  //     // Cuộn lên vùng lỗi
  //     if (scrollViewRef.current) {
  //       scrollViewRef.current.scrollTo({ y: 280, animated: true }); // Cuộn lên vị trí chứa lỗi
  //     }
  //   } else {
  //     setShowError(false);
  //     // Điều hướng tới màn hình "ScreenBookingConfirmed"
  //     navigation.navigate('ScreenBookingConfirmed',{
  //       totalAmountAll
  //     });
  //   }
  // };

  const handleBookNow = async () => {
    if (!selectedOption) {
      setShowError(true); // Hiển thị lỗi nếu chưa chọn phương thức thanh toán
      // Cuộn lên vùng lỗi
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 280, animated: true }); // Cuộn lên vị trí chứa lỗi
      }
    } else {
      setShowError(false);

      // Lấy thông tin người dùng từ context
      const user = currentUser; // currentUser được lấy từ ApiContext

      if (user) {
        try {
          // Thêm id khách sạn vào listBookedHotel
          const bookingDetails = {
            id, // ID khách sạn
            numberDay: date, // Số ngày (được lấy từ `route.params`)
            guests, // Số khách (được lấy từ `route.params`)
            idBill: randomRefNumber,
            totalAmountAll,
            dayBooking: formattedDate,
            selectedOption
          };

          const updatedUser = {
            ...user,
            listBookedHotel: [...user.listBookedHotel, bookingDetails],
          };

          // Gửi API PUT để cập nhật người dùng
          const response = await fetch(
            `https://6722030b2108960b9cc28724.mockapi.io/loginApp/${user.id}`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedUser),
            }
          );

          if (response.ok) {
            const data = await response.json();
            setCurrentUser(data); // Cập nhật lại thông tin người dùng trong context
            // Điều hướng tới màn hình "ScreenBookingConfirmed"
            navigation.navigate('ScreenBookingConfirmed', {
              totalAmountAll,
              randomRefNumber,
              formattedDate,
              selectedOption
            });
          } else {
            console.error('Failed to update user');
          }
        } catch (err) {
          console.error('Error updating user:', err);
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.view_icon} onPress={() => navigation.goBack()}>
          <AntDesign name="left" color="gray" size={25} />
        </TouchableOpacity>
        <Text style={styles.title_header}>Confirm and pay</Text>
        <AntDesign name="left" color="white" size={20} />
      </View>

      <ScrollView
        ref={scrollViewRef} // Tham chiếu ScrollView
        style={styles.scroll_view}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.box_info}>
          <View style={styles.v_tt}>
            <View style={styles.view_cost}>
              <Text style={styles.txt_gia}>${price}</Text>
              <Text>/night</Text>
            </View>
            <Text style={styles.txt_name}>{title}</Text>
          </View>
          <View style={styles.v_img_}>
            <Image style={styles.img_banner} source={img} />
          </View>
        </View>

        <View style={styles.view_in4}>
          <Text style={styles.txt_title_in4}>Your trip</Text>
          <View style={styles.v_date_guest}>
            <View>
              <Text style={styles.txt_title_mini}>Dates</Text>
              <Text style={styles.txt_nd_mini}>{currentDate} day</Text>
            </View>
            <TouchableOpacity onPress={() => openModal('date')}>
              <Image source={require('../image/icons8-pen-25.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.v_date_guest}>
            <View>
              <Text style={styles.txt_title_mini}>Guests</Text>
              <Text style={styles.txt_nd_mini}>{currentGuests} guest</Text>
            </View>
            <TouchableOpacity onPress={() => openModal('guests')}>
              <Image source={require('../image/icons8-pen-25.png')} />
            </TouchableOpacity>
          </View>

          {/* Modal để thay đổi ngày hoặc khách */}
          <Modal visible={modalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{selectedOptionM === 'date' ? 'Change Dates' : 'Change Guests'}</Text>
                <View style={styles.modalButtons}>
                  {/* Nếu chọn 'date', hiển thị các nút tăng/giảm ngày */}
                  {selectedOptionM === 'date' ? (
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.btnSelect} onPress={decrementDate} >
                        <Text style={styles.textbtnSelect}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.modalValue}>{currentDate} day(s)</Text>
                      <TouchableOpacity style={styles.btnSelect} onPress={incrementDate} >
                        <Text style={styles.textbtnSelect}>+</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    // Nếu chọn 'guests', hiển thị các nút tăng/giảm khách
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.btnSelect} onPress={decrementGuests} >
                        <Text style={styles.textbtnSelect}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.modalValue}>{currentGuests} guest(s)</Text>
                      <TouchableOpacity style={styles.btnSelect} onPress={incrementGuests} >
                        <Text style={styles.textbtnSelect}>+</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <Button title="Close" onPress={closeModal} />
              </View>
            </View>
          </Modal>

        </View>

        {/**Payment options */}
        <View style={styles.view_in4}>
          <Text style={styles.txt_title_in4}>Payment options</Text>
          {/* Option 1 */}
          <View style={styles.v_payment}>
            <View style={styles.v_payment_option}>
              <Text style={styles.txt_title_mini}>Pay in full</Text>
              <Text style={styles.txt_nd_mini_pay}>Pay $30 now to finalize your booking.</Text>
            </View>
            <TouchableOpacity onPress={() => handleSelect('payInFull')}>
              <View style={styles.v_check_bok}>
                {selectedOption === 'payInFull' && <View style={styles.check_box_true}></View>}
              </View>
            </TouchableOpacity>
          </View>
          {/* Option 2 */}
          <View style={styles.v_payment}>
            <View style={styles.v_payment_option}>
              <Text style={styles.txt_title_mini}>Pay a part now</Text>
              <Text style={styles.txt_nd_mini_pay}>You can make a partial payment now and the remaining amount at a later time.</Text>
            </View>
            <TouchableOpacity onPress={() => handleSelect('payPart')}>
              <View style={styles.v_check_bok}>
                {selectedOption === 'payPart' && <View style={styles.check_box_true}></View>}
              </View>
            </TouchableOpacity>
          </View>
          {showError && <Text style={styles.txt_error}>Please select payment option</Text>}
        </View>

        <View style={styles.view_in4}>
          <Text style={styles.txt_title_in4}>Price details</Text>
          <View style={styles.v_date_guest}> 
            <Text style={styles.txt_nd_mini}>{totalText}</Text>
            <Text style={styles.txt_nd_mini_2}>{totalAmount}</Text>
          </View>
          <View style={styles.v_date_guest}> 
            <Text style={styles.txt_nd_mini}>Kayak fee</Text>
            <Text style={styles.txt_nd_mini_2}>${fee1}</Text>
          </View>
          <View style={styles.v_date_guest}> 
            <Text style={styles.txt_nd_mini}>Street parking fee</Text>
            <Text style={styles.txt_nd_mini_2}>${fee2}</Text>
          </View>     
        </View>
        <View style={styles.v_total}>
          <Text style={styles.txt_nd_mini}>Total (USD)</Text>
          <Text style={styles.txt_nd_mini_2}>${totalAmountAll}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn_book_now} onPress={handleBookNow}>
          <Text style={styles.txt_book_now}>Book now</Text>
          <View style={styles.view_in}></View>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: 'white',
  },
  txt_nd_mini_pay:{
    fontSize: 17,
    color: 'gray',
    width: '100%',
  },
  v_payment_option:{
    width: '85%',
    marginBottom: 20,
  },
  v_payment:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt_error:{
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
    fontStyle: 'italic',
  },
  v_total:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 150,
    width: '100%',
    marginTop:20,
  },

  check_box_true:{
    backgroundColor: '#00bdd5',
    height: 15,
    width: 15,
    borderRadius: 50,
  },
  v_check_bok:{
    borderWidth: 1,
    height: 20,
    width: 20,
    borderRadius: 50,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  txt_nd_mini_2:{
    fontWeight: 'bold',
    fontSize: 17,
  },
  txt_nd_mini:{
    fontSize: 17,
    
  },
  txt_title_mini:{
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 5,
    color:'#2F2F2F',
  },
  v_date_guest:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  txt_title_in4:{
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 20,
  },
  view_in4:{
    marginTop: 25,
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    paddingBottom: 10,

  },
  txt_name:{
    marginVertical: 12,
  },
  txt_gia:{
    fontSize: 23,
    fontWeight: 'bold',
  },
  view_cost:{
    flexDirection: 'row',
    alignItems: 'end',
  },
  v_img_:{
    height: 120,
    width: 120,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  img_banner:{
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover', // Đảm bảo ảnh thu nhỏ mà không bị mất tỉ lệ
    borderRadius: 5,
  },
  box_info:{
    height: 160,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 30,
    borderColor: '#d0d1d9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
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
   // paddingBottom: 100,
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
  txt_book_now:{
    color: 'white',
    fontWeight: 'bold',
  },
  btn_book_now: {
    backgroundColor: '#00bdd5',
    height: '60%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  footer:{
    position: "absolute",
    bottom:0,
    height: 80,
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    borderTopWidth:1,
    borderColor: '#d0d1d9',
    alignItems: 'center',
    paddingHorizontal: '5%',
    zIndex: 998,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalButtons: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnSelect:{
    width: 50,
    height: 50,
    backgroundColor: '#00BDD5',
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textbtnSelect:{
    fontSize: 14,
    color: '#fff'
  },
  modalValue: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
});
