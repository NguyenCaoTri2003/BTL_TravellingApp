import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from 'react'; 
import Icons from 'react-native-vector-icons/FontAwesome6';
import IconsC from 'react-native-vector-icons/Ionicons';
import IconsF from 'react-native-vector-icons/FontAwesome';
import { Alert } from 'react-native';
import { useDataHotel } from './context/DataContext';


import { useAuth } from './context/AuthContext';
import { useApi } from './context/ApiContext'; // Assuming you have API context for handling API requests
import { useNavigation } from '@react-navigation/native'; // Add this to handle navigation
import { useSearchContext } from './context/SearchContext';

  const API_URL = 'https://6722030b2108960b9cc28724.mockapi.io/loginApp';

  const Room = ({item, navigation, toggleFavorite, userFavorites, showBox1, handleSelectHotel}) => {
    return (
      <TouchableOpacity
      style={styles.room} 
      onPress={() => handleSelectHotel(item)}
 
      >
            <Image source={item.img} style={styles.imgRoom}/> 
            <TouchableOpacity style={styles.heart} onPress={() => toggleFavorite(item.id)} >
              <Icons name='heart' color={userFavorites.includes(item.id) ? 'red' : 'gray'} size={30} style={styles.iconHeart} />
            </TouchableOpacity>
            <View style={styles.detail1}>
              <Text style={styles.textHotel}>{item.title}</Text>
              <View style={styles.rate}>
                <IconsC name='star'size={20} color = '#EBC350' style={styles.iconRate} />
                <Text style={styles.textRace}>{item.rate}</Text>
              </View>
            </View>
            <View style={styles.detail2}>
              {!showBox1 && (
                <Text style={styles.textPlace}>{item.place}</Text>
              )}
              {showBox1 && (
                <Text style={styles.textPlace}>{item.facility_1.bedroom} bedroom</Text>
              )}
              <View style={styles.price}>
                <Icons name='dollar-sign' color='#000' size={20} style={styles.iconPrice} />
                <Text style={styles.textPrice}><Text style={styles.textBold}>{item.price}</Text>/night</Text>
              </View>
            </View>
          </TouchableOpacity>
    );
  }

  

  export default function ScreenHome() {
    const { currentUser, setCurrentUser } = useAuth();
    const { users, updateUser } = useApi(); // Assuming you have API functions to update user data
    const [loading, setLoading] = useState(false);
    const { dataHotel } = useDataHotel();
    const navigation = useNavigation(); // To navigate to other screens

    const [selectedMenu, setSelectedMenu] = useState('beach'); // Đổi thành 'beach' để tương thích với keys trong DataHotel
    const [selectedMainMenu, setSelectedMainMenu] = useState('Search');
    const [searchQuery, setSearchQuery] = useState(''); 
    const [filteredData, setFilteredData] = useState(dataHotel[selectedMenu.toLowerCase()]);
    
    
    const [searchText, setSearchText] = useState('Where do you want to stay?');
    const [showBox1, setShowBox1] = useState(false);
    
    //const [hotels, setHotels] = useState(DataHotel);
    const userFavorites = currentUser?.listFavorateHotel || [];
    const { searchData } = useSearchContext();  

    const { setSelectedHotel } = useDataHotel();

    const renderItem = ({ item }) => <Room item={item} navigation={navigation} toggleFavorite={toggleFavorite} userFavorites={userFavorites} showBox1={showBox1} handleSelectHotel={handleSelectHotel}/>;

    useEffect(() => {
    // Lọc dữ liệu dựa trên từ khóa tìm kiếm
      const dataToShow = dataHotel[selectedMenu.toLowerCase()];
      setFilteredData(
        dataToShow.filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) 
      );
    }, [searchQuery, selectedMenu]);

    useEffect(() => {
      if (
        searchData &&
        (searchData.place !== 'Anywhere' ||
          searchData.date !== 1 ||
          searchData.guests !== 1)
      ) {
        const { place, date, guests } = searchData;

        const updatedText = `${place || 'Anywhere'}, ${
          date ? (date === 1 ? '1 day' : `${date} days`) : '1 day'
          }, ${
          guests ? (guests === 1 ? '1 guest' : `${guests} guests`) : '1 guest'
          }`;

        setSearchText(updatedText);
      } else {
        setSearchText('Where do you want to stay?');
      }
    }, [searchData]);

    useEffect(() => {
      if (searchData?.setShowBox1 !== undefined) {
        setShowBox1(searchData.setShowBox1);
      }
    }, [searchData]);

    // Lấy dữ liệu dựa vào trạng thái selectedMenu
    const dataToShow = dataHotel[selectedMenu.toLowerCase()]; // Chuyển giá trị thành chữ thường để khớp với keys

    const filterData = (dataToShow) => {
      //const { searchData } = useSearchContext(); // Lấy thông tin tìm kiếm từ context
      const { place, guests } = searchData || {}; // Đảm bảo xử lý trường hợp searchData null

      return dataToShow.filter((item) => {
        // Điều kiện kiểm tra địa điểm
        const placeCondition = !place || place === 'Anywhere' || item.continent.includes(place);

        // Điều kiện kiểm tra số lượng khách
        const guestCondition = !guests || item.facility_1.guest >= guests;

        return placeCondition && guestCondition;
      });
    };

    const dataSearch = filterData(dataToShow);

    // Toggle yêu thích khách sạn
    const toggleFavorite = async (hotelId) => {
      let updatedFavorites;
      
      // Kiểm tra nếu khách sạn đã có trong danh sách yêu thích
      if (userFavorites.includes(hotelId)) {
        // Nếu đã có, xóa khỏi danh sách yêu thích
        updatedFavorites = userFavorites.filter(id => id !== hotelId);
        removeHotelFromFavorites(hotelId);
      } else {
        // Nếu chưa có, thêm vào danh sách yêu thích
        updatedFavorites = [...userFavorites, hotelId];
        addHotelToFavorites(hotelId);
      }

      // Cập nhật lại danh sách yêu thích trong context
      setUserFavorites(updatedFavorites);
    };

    // Thêm khách sạn vào danh sách yêu thích
    const addHotelToFavorites = (hotelId) => {
      const updatedFavorites = [...currentUser.listFavorateHotel, hotelId];
      const updatedUser = { ...currentUser, listFavorateHotel: updatedFavorites };
      setCurrentUser(updatedUser); // Cập nhật context
      updateUser(updatedUser); // Cập nhật API
    };

    // Xóa khách sạn khỏi danh sách yêu thích
    const removeHotelFromFavorites = (hotelId) => {
      const updatedFavorites = currentUser.listFavorateHotel.filter(id => id !== hotelId);
      const updatedUser = { ...currentUser, listFavorateHotel: updatedFavorites };
      setCurrentUser(updatedUser); // Cập nhật context
      updateUser(updatedUser); // Cập nhật API
    };

    const handleSelectHotel = (hotel) => {
      setSelectedHotel(hotel); // Lưu khách sạn được chọn vào context
      navigation.navigate('ScreenInfo'); // Điều hướng đến màn hình chi tiết
    };
      
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.search}
            onPress={() => navigation.navigate('ScreenSearch')}
          >
            <View>
              <Image source={require('../image/icon-search.png')} style={styles.iconSearch} />
            </View>
            <Text style={styles.textSearch}>{searchText}</Text>
             {showBox1 && (
              <TouchableOpacity>
                <Image source={require('../image/btn-filter.png')} style={styles.iconFilter} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          
          <View style={styles.menu}>
            <TouchableOpacity 
              style={[styles.menuItem, selectedMenu === 'beach' && styles.menuSelect]} 
              onPress={() => setSelectedMenu('beach')}
            >
              <Icons 
                name="umbrella-beach" 
                color={selectedMenu === 'beach' ? '#04BAD6' : '#414B52'} 
                size={30}  
              />
              <Text 
                style={[
                  styles.textMenu, 
                  selectedMenu === 'beach' && styles.textSelect
                ]}
              >
                Beach
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.menuItem, selectedMenu === 'mountain' && styles.menuSelect]} 
              onPress={() => setSelectedMenu('mountain')}
            >
              <Icons 
                name="mountain" 
                color={selectedMenu === 'mountain' ? '#04BAD6' : '#414B52'} 
                size={30}  
              />
              <Text 
                style={[
                  styles.textMenu, 
                  selectedMenu === 'mountain' && styles.textSelect
                ]}
              >
                Mountain
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.menuItem, selectedMenu === 'camping' && styles.menuSelect]} 
              onPress={() => setSelectedMenu('camping')}
            >
              <Icons 
                name="campground" 
                color={selectedMenu === 'camping' ? '#04BAD6' : '#414B52'} 
                size={30}  
              />
              <Text 
                style={[
                  styles.textMenu, 
                  selectedMenu === 'camping' && styles.textSelect
                ]}
              >
                Camping
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          {((!showBox1 && filteredData.length > 0) || (showBox1 && dataSearch.length > 0)) ? (
            <FlatList
              data={showBox1 ? dataSearch : filteredData}
              renderItem={renderItem}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Text style={styles.noDataText}>Không có khách sạn cần tìm</Text>
          )}
        </View>

        <View style={styles.footer}>
          <View style={styles.footer}>
            <TouchableOpacity 
              style={[styles.itemMenuMain, selectedMainMenu === 'Search']} 
              onPress={() => setSelectedMainMenu('Search')}
            >
              <IconsF name='search' color={selectedMainMenu === 'Search' ? '#04BAD6' : '#414B52'} size={25}/>
              <Text style={[styles.textMenuMain, selectedMainMenu === 'Search' && styles.textSelect]}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.itemMenuMain, selectedMainMenu === 'Favorite']} 
              onPress={() => {
                navigation.navigate('ScreenFavorite')
              }}
            >
              <IconsF name='heart' color={selectedMainMenu === 'Favorite' ? '#04BAD6' : '#414B52'} size={25}/>
              <Text style={[styles.textMenuMain, selectedMainMenu === 'Favorite' && styles.textSelect]}>Favorite</Text>
            </TouchableOpacity >
            <TouchableOpacity 
              style={[styles.itemMenuMain, selectedMainMenu === 'Bookings']} 
              onPress={() => setSelectedMainMenu('Bookings')}
            >
              <IconsF name= 'suitcase' color={selectedMainMenu === 'Bookings' ? '#04BAD6' : '#414B52'} size={25}/>
              <Text style={[styles.textMenuMain, selectedMainMenu === 'Bookings' && styles.textSelect]}>Bookings</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.itemMenuMain, selectedMainMenu === 'Inbox']} 
              onPress={() => setSelectedMainMenu('Inbox')}
            >
              <IconsF name='wechat' color={selectedMainMenu === 'Inbox' ? '#04BAD6' : '#414B52'} size={25}/>
              <Text style={[styles.textMenuMain, selectedMainMenu === 'Inbox' && styles.textSelect]}>Inbox</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.itemMenuMain, selectedMainMenu === 'Profile']} 
              onPress={() => setSelectedMainMenu('Profile')}
            >
              <IconsF name='user-circle-o' color={selectedMainMenu === 'Profile' ? '#04BAD6' : '#414B52'} size={25}/>
              <Text style={[styles.textMenuMain, selectedMainMenu === 'Profile' && styles.textSelect]}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header:{
    flex: 2,
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    backgroundColor: '#EBFDFF',
    paddingTop: 35
  },
  search:{
    borderWidth: 1,
    width: "95%",
    height: 50,
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: '#B4B5B4',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#fff',
  },
  iconSearch:{
    width: 30,
    height: 30,
    marginLeft: 20
  },
  iconFilter:{
    width: 30,
    height: 30,
  },
  textSearch:{
    width: "70%",
    height: 70,
    fontSize: 18,
    marginLeft: 20,
    color: '#B4B5B4',
    marginTop: 45
  },
  menu:{
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  menuItem:{
    width: '33.3%',
    height: 60,
    alignItems: 'center',
  },
  textMenu:{
    fontSize: 14,
    color: '#414B52'
  },
  menuSelect:{
    borderBottomWidth: 5,
    borderBottomColor: '#04BAD6'
  },
  textSelect:{
    color: '#04BAD6',
  },
  content:{
    flex: 8,
    paddingHorizontal: 20,
    paddingTop: 30,
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
  textMenuMain:{
    fontSize: 16
  },
  noDataText: {
  fontSize: 20,
  color: '#414B52',
  textAlign: 'center',
  marginTop: 20,
}

});