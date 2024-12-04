import React from 'react';
import { Text, SafeAreaView, StyleSheet, ScrollView, View, TouchableOpacity, FlatList, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ReviewsContext } from './context/ReviewContext';
import { useDataHotel } from './context/DataContext'



  const Reviews = ({ item, onPress }) => {
    return (
      <TouchableOpacity style={styles.review_details_box} onPress={() => onPress(item)}>
        <View style={styles.box_name_star}>
          <View style={styles.tt_person}>
            <Image
              style={styles.img_avatar}
              source={item.avatar}
            />
            <View style={styles.name_date}>
              <Text style={styles.txt_full_name}>{item.reviewer}</Text>
            </View>
          </View>
          <View style={styles.box_star_icon}>
            {Array.from({ length: Math.min(item.rating, 5) }, (_, index) => (
              <FontAwesome
                key={index}
                name="star"
                color="yellow"
                size={15}
                style={styles.icon_star}
              />
            ))}
          </View>
        </View>
        <Text style={styles.txt_comment} numberOfLines={2}>
          {item.comment}
        </Text>
      </TouchableOpacity>
    );
  };


export default function ScreenReviews({route}) {
 
  const { reviews } = route.params || { reviews: [] };
  console.log('route', reviews)
  //const { reviews } = useContext(ReviewsContext);
  const navigation = useNavigation(); 
  const { selectedHotel, setSelectedHotel } = useDataHotel(); // Access context here
  
  // tổng số review
  const calculateTotalReviews = (reviews) => {
   return reviews.length; // Count the number of reviews
  };

  // tính trung bình cộng rate
  const calculateAverageRate = (reviews) => {
    if (reviews.length === 0) return 0; // Nếu không có review, trả về 0
    const totalRate = reviews.reduce((sum, review) => sum + review.rating, 0); // Tính tổng rate
    const average = totalRate / reviews.length; // Tính trung bình cộng
    return average.toFixed(1); // Làm tròn trung bình cộng đến 1 chữ số thập phân
  };

  // Hiện thị số sao tương ướng với tổng rate
  const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - hasHalfStar;

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesome key={`full-${i}`} name="star" color="#ebbc4d" size={20} style={styles.icon_star} />);
  }
  
  // Add half star if exists
  if (hasHalfStar) {
    stars.push(<FontAwesome key="half" name="star-half-o" color="#ebbc4d" size={20} style={styles.icon_star} />);
  }
  
  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FontAwesome key={`empty-${i}`} name="star-o" color="#ebbc4d" size={20} style={styles.icon_star} />);
  }
  
  return stars;
};


  const calculateRatingDistribution = (reviews) => {
    const ratingCount = [0, 0, 0, 0, 0]; // Để đếm đánh giá cho 1, 2, 3, 4, 5 sao
    
    reviews.forEach((review) => {
      ratingCount[review.rate - 1] += 1;
    });

    const totalReviews = reviews.length;
    const percentages = ratingCount.map((count) => (count / totalReviews) * 100);
    
    return percentages;
  };

  // Nhận tỷ lệ phần trăm cho mỗi xếp hạng (1-5 sao)
  const ratingPercentages = calculateRatingDistribution(reviews);

  // model
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const openModal = (review) => {
    setSelectedReview(review);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedReview(null);
  };

  // Tính toán phần trăm đánh giá
  const calculateRatingPercentages = (reviews) => {
    const totalReviews = reviews.length;
    const ratingCounts = [0, 0, 0, 0, 0];

    reviews.forEach((review) => {
      const rating = Math.floor(review.rating || 0); // Đảm bảo có rating
      if (rating >= 1 && rating <= 5) {
        ratingCounts[5 - rating] += 1;
      }
    });

    return ratingCounts.map((count) => (totalReviews > 0 ? (count / totalReviews) * 100 : 0));
  };

  const reversedRatingPercentages = calculateRatingPercentages(reviews);
  const ratingColors = ["#FFD700", "#FFD700", "#FFD700", "#FFD700", "#FFD700"];

//
  const renderItem = ({ item }) => {
    return <Reviews item={item} onPress={openModal}/>;
  };

  


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.view_icon} onPress={() => navigation.goBack()}>
          <AntDesign name="left" color="gray" size={25} />
        </TouchableOpacity>
        <Text style={styles.title_header}>Reviews</Text>
        <AntDesign name="left" color="white" size={20} />
      </View>
      
      <ScrollView style={styles.scroll_view} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
       <Text style={styles.txt_review}>{calculateTotalReviews(reviews)} reviews</Text>
       <View style={styles.box_rate}>
        <View style={styles.view_total_rate}>
          <Text style={styles.txt_rate}>{calculateAverageRate(reviews)}/5</Text>
          <View style={styles.box_star}>
            {renderStars(parseFloat(calculateAverageRate(reviews)))}
          </View>
        </View>
          <View style={styles.view_phanTram}>
            {reversedRatingPercentages.map((percentage, index) => (
              <View style={styles.box_phanTram} key={index}>
                <View style={styles.thanh_phanTram}>
                  <View
                    style={[
                      styles.thanh_phanTram_mau,
                      { width: `${percentage}%`, backgroundColor: ratingColors[index] },
                    ]}
                  />
                </View>
                <Text>{5 - index}</Text>
              </View>
            ))}
          </View>
        </View>

       <View style={styles.facilities_services}>
       <View style={styles.v_flatlist}>
        <FlatList
            data={reviews} // Lấy 2 item đầu tiên từ danh sách
            renderItem={renderItem}
            showsVerticalScrollIndicator = {false}
            //keyExtractor={(item) => item.id.toString()}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={{ width: 16 }} />} //khoảng cách giữa các item
          />
       </View>
      </View>
      </ScrollView>

      {/* Modal hiển thị chi tiết review */}
      {selectedReview && (
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="none"
          onRequestClose={closeModal}
        >
         <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image style={styles.modalImage} source={selectedReview.avatar} />
              <Text style={styles.modalName}>{selectedReview.full_name}</Text>
              <View>
               <Text style={styles.modalComment}>{selectedReview.comment}</Text>
              </View>      
              <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
         </TouchableWithoutFeedback>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: 'white',
  },
  txt_comment:{
    marginTop: 10,
    width: '100%',
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
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    padding: 15,
  },

  v_flatlist:{
    marginBottom: 15,
  },

  thanh_phanTram_mau:{
    backgroundColor: '#ebbc4d',
    width: '60%',
    height: 7,
    borderRadius: 5,
  },
  thanh_phanTram:{
    height: 7,
    width: 100,
    backgroundColor: '#d0d1d9',
    marginRight: 10,
    borderRadius: 5,
  },
  box_phanTram:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  txt_rate:{
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  icon_star:{
    marginRight: 3,
  },
  box_star:{
    flexDirection: 'row',
  },
  box_rate:{
    height: 150,
    width: '100%',
    backgroundColor: '#f8f9fb',
    borderRadius: 5,
    marginTop: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  txt_review:{
    marginTop: 20,
    fontSize: 27,
    fontWeight: 'bold',
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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  modalName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalComment: {
    fontSize: 16,
    //textAlign: 'center',
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: '#ebbc4d',
    padding: 10,
    borderRadius: 5,
  },
  modalCloseText: {
    color: 'white',
    fontWeight: 'bold',
  },
  txt_full_name:{
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 5
  }
});
