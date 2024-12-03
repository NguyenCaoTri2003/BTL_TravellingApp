import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, Platform } from 'react-native';
import IconsC from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSearchContext } from './context/SearchContext'; 
import { useNavigation } from '@react-navigation/native'; 
import { useAuth } from './context/AuthContext';

const PLACE = [
  { id: '1', img: require('../image/canhtudo-1.png'), title: 'Anywhere' },
  { id: '2', img: require('../image/place-thuysi.png'), title: 'Europe' },
  { id: '3', img: require('../image/place-hanquoc.png'), title: 'Asia' },
  { id: '4', img: require('../image/place-america.png'), title: 'America' },
  { id: '5', img: require('../image/place-africa.png'), title: 'Africa' },
];

const Place = ({ item, onSelect }) => (
  <TouchableOpacity style={styles.place} onPress={() => onSelect(item.title)}>
    <Image source={item.img} style={styles.imgPlace} />
    <Text style={styles.textPlace}>{item.title}</Text>
  </TouchableOpacity> 
);

export default function ScreenSearch() {
  const { setSearchDetails } = useSearchContext();
  const navigation = useNavigation();

  // Hiển thị các box
  const [isVisibleBox1, setIsVisibleBox1] = useState(false);
  const [isVisibleBox2, setIsVisibleBox2] = useState(false);
  const [isVisibleBox3, setIsVisibleBox3] = useState(false);
  // Chọn place
  const [titleRight, setTitleRight] = useState('Anywhere');
  // Chọn ngày
  const [selectedButton, setSelectedButton] = useState('start');
  // Chọn date
  const [startDate, setStartDate] = useState(new Date()); // Khởi tạo startDate là ngày hiện tại
  const [endDate, setEndDate] = useState(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [daysSelected, setDaysSelected] = useState(0);
  //tang giam
  const [adultsCount, setAdultsCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  //tim kiem
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(PLACE);
  const [showIcon, setShowIcon] = useState(false);
  const [showBox1, setShowBox1] = useState(false);

  const { currentUser, setCurrentUser } = useAuth();

  useEffect(() => {
    setShowStartPicker(true); // Mở bộ chọn ngày cho Start Date khi màn hình được hiển thị
  }, []);

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndPicker(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  const renderPlace = ({ item }) => (
    <Place item={item} onSelect={handleSelectPlace} />
  );

  const handleOpenBox1 = () => {
    setIsVisibleBox1(true);
    setIsVisibleBox2(false);
    setIsVisibleBox3(false);
  };

  const handleOpenBox2 = () => {
    setIsVisibleBox1(false);
    setIsVisibleBox2(true);
    setIsVisibleBox3(false);
  };

  const handleOpenBox3 = () => {
    setIsVisibleBox1(false);
    setIsVisibleBox2(false);
    setIsVisibleBox3(true);
  };

  const handleSelectPlace = (placeTitle) => {
    setTitleRight(placeTitle);
    setIsVisibleBox1(false); 
  };

  const handleNext = () => {
    calculateDays(); // Tính toán số ngày
    handleCloseBox2(); // Đóng contentBox2
  };

  const calculateDays = () => {
    if (startDate && endDate) {
      const diffInTime = endDate.getTime() - startDate.getTime();
      const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24)) + 1;
      setDaysSelected(diffInDays); // Cập nhật số ngày đã chọn
    }
  };

  const handleCloseBox2 = () => {
    setIsVisibleBox2(false); // Đóng contentBox2
  };

  const clearAll = () => {
    setIsVisibleBox1(false);
    setIsVisibleBox2(false);
    setIsVisibleBox3(false);
    handleSelectPlace('Anywhere')
    setAdultsCount(0)
    setChildrenCount(0)
    setDaysSelected(0)
  }


  const handleAddAdults = () => setAdultsCount(adultsCount + 1);

  const handleMinusAdults = () => {
    if (adultsCount > 0) setAdultsCount(adultsCount - 1);
  };

  const handleAddChildren = () => setChildrenCount(childrenCount + 1);

  const handleMinusChildren = () => {
    if (childrenCount > 0) setChildrenCount(childrenCount - 1);
  };

  const handleNextGuest = () => {
    setIsVisibleBox3(false);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === '') {
      setFilteredData(PLACE);
      return;
    }
    const newData = PLACE.filter((item) =>
      item.title.toLowerCase().startsWith(text.toLowerCase())
    );
    setFilteredData(newData);
  };

  // const handleSearchAll = () => {
  //   const data = {
  //     place: titleRight,
  //     date: daysSelected,
  //     guests: adultsCount + childrenCount,
  //     setShowIcon: true,
  //     setShowBox1: true,
  //     currentUser
  //   };
  //   navigation.navigate('HomeCu', data); // Truyền dữ liệu sang ScreenHome
  // };

  const handleSearchAll = () => {
    const data = {
      place: titleRight,
      date: daysSelected,
      guests: adultsCount + childrenCount,
      setShowBox1: true,
    };
      
    // Cập nhật dữ liệu vào context
    setSearchDetails(data);
      
    // Điều hướng sang HomeCu
    navigation.navigate('ScreenHome');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <TouchableOpacity onPress={() => navigation.navigate('ScreenHome')}>
          <IconsC name="close" color="#B4B5B4" size={35} style={styles.iconClose} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {!isVisibleBox1 && (
          <TouchableOpacity style={styles.contentBoxButton} onPress={handleOpenBox1}>
            <Text style={styles.titleLeft}>Location</Text>
            <Text style={styles.titleRight}>{titleRight}</Text>
          </TouchableOpacity>
        )}

        {isVisibleBox1 && (
          <View style={styles.contentBox1}>
            <Text style={styles.titleBox1}>Where to?</Text>
            <View style={styles.inputBox1}>
              <Image source={require('../image/icon-search.png')} style={styles.iconSearch} />
              <TextInput
                style={styles.inputSearch}
                placeholder="Search"
                placeholderTextColor="#B4B5B4"
                value={searchText}
                onChangeText={handleSearch} 
              />
            </View>
            <View style={styles.listBox1}>
              <FlatList
                data={filteredData}
                renderItem={renderPlace}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        )}

        {!isVisibleBox2 && (
          <TouchableOpacity style={styles.contentBoxButton} onPress={handleOpenBox2}>
            <Text style={styles.titleLeft}>When</Text>
            <Text style={styles.titleRight}>{daysSelected === 0 ? 'Add time' : `${daysSelected} days`}</Text>
          </TouchableOpacity>
        )}

        {isVisibleBox2 && (
          <View style={styles.contentBox2}>
            <Text style={styles.titleBox2}>When staying</Text>
            <View style={styles.boxBtnDate}>
              <TouchableOpacity
                style={[styles.btnStartDate, selectedButton === 'start' ? styles.activeButton : styles.inactiveButton,]}
                onPress={() => {
                  setSelectedButton('start');
                  setShowStartPicker(true);
                  setShowEndPicker(false);
                }}
              >
                <Text style={[styles.btnTextDate, selectedButton === 'start' ? styles.activeText : styles.inactiveText]}>
                  Start Date
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btnEndDate, selectedButton === 'end' ? styles.activeButton : styles.inactiveButton,]}
                onPress={() => {
                  setSelectedButton('end');
                  setShowEndPicker(true);
                  setShowStartPicker(false);
                }}
              >
                <Text style={[styles.btnTextDate, selectedButton === 'end' ? styles.activeText : styles.inactiveText]}>
                  End Date
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.date}>
              {showStartPicker && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="default"
                  onChange={onStartDateChange}
                />
              )}
              {showEndPicker && ( 
                <DateTimePicker
                  value={endDate || new Date()}
                  mode="date"
                  display="default"
                  minimumDate={startDate || new Date()} 
                  onChange={onEndDateChange}
                  
                />
              )}
            </View>
            <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
              <Text style={styles.textBtnNext}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
         {!isVisibleBox3 && (
          <TouchableOpacity style={styles.contentBoxButton} onPress={handleOpenBox3}>
            <Text style={styles.titleLeft}>Guests</Text>
            <Text style={styles.titleRight}>
              {adultsCount > 0 || childrenCount > 0 
              ? `${adultsCount} adults, ${childrenCount} children` 
              : 'Add guests'}
            </Text>
          </TouchableOpacity>
        )}

        {isVisibleBox3 && (
          <View style={styles.contentBox3}>
            <Text style={styles.titleBox3}>Home many guests ?</Text>
            <View style={styles.boxChange}>
              <View style={styles.changeAldult}>
                <Text style={styles.titleChange1}>Aldults</Text>
                <View style={styles.change1}>
                  <TouchableOpacity style={[styles.minus, adultsCount === 0 ? styles.inactiveBorder : styles.activeBorder]} onPress={handleMinusAdults}>
                    <Text style={[styles.textMinus, adultsCount === 0 ? styles.inactiveText2 : styles.activeText2]}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.number}>{adultsCount}</Text>
                  <TouchableOpacity style={styles.add} onPress={handleAddAdults}>
                    <Text style={styles.textAdd}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.changeChildren}>
                <Text style={styles.titleChange2}>Children</Text>
                <View style={styles.change2}>
                  <TouchableOpacity style={[styles.minus, childrenCount === 0 ? styles.inactiveBorder : styles.activeBorder]} onPress={handleMinusChildren}>
                    <Text style={styles.textMinus}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.number}>{childrenCount}</Text>
                  <TouchableOpacity style={styles.add} onPress={handleAddChildren}><Text style={styles.textAdd}>+</Text></TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.btnNext} onPress={handleNextGuest}>
              <Text style={styles.textBtnNext}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.btnClear} 
          onPress={clearAll}
        >
            <Text style={styles.textBtnClear}>Clear All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.btnSearch} 
          onPress={() => {
            handleSearchAll()
          }}
          >
            <Image source={require('../image/icon-search-white.png')} style={styles.iconSearch} />
            <Text style={styles.textBtnSearch}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff',
    paddingVertical: 10
  },
  header: { flex: 2},
  iconClose: { 
    marginLeft: 360, 
    marginTop: 80 
    },
  content: { 
    flex: 7, 
    paddingHorizontal: 20,
  },
  
  contentBoxButton: {
    height: 70,
    padding: 10,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#BBBCBD',
    borderRadius: 10,
  },
  titleLeft:{
    fontSize: 18,
    color: '#AAAEB1'
  },
  titleRight:{
    fontSize: 19,
    fontWeight: 'bold'
  },
  contentBox1: {
    borderWidth: 1,
    height: 390,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: '#BBBCBD',
    borderRadius: 10,
    marginVertical: 10,
    
  },
  titleBox1: {
    fontSize: 30, 
    fontWeight: 'bold',
    marginTop: 15,
    width: '100%',
    marginLeft: 50
  },
  inputBox1: {
    borderWidth: 1,
    flexDirection: 'row',
    height: 70,
    borderColor: '#BBBCBD',
    borderRadius: 10,
    width: '90%', 
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputSearch: { width: '85%', height: 70, borderRadius: 10, fontSize: 18 },
  iconSearch: { width: 30, height: 30, marginLeft: 15 },
  listBox1: { flexDirection: 'row', width: '100%', paddingHorizontal: 20 },
  place: { marginRight: 10, height: 180, justifyContent: 'space-between' },
  imgPlace: { width: 150, height: 150, borderRadius: 10 },
  textPlace: { fontSize: 17 },
  contentBox2: {
    borderWidth: 1,
    height: 390,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: '#BBBCBD',
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 10
  },
  titleBox2: {
    fontSize: 30, 
    fontWeight: 'bold',
    marginBottom: 15,
    width: '100%',
    marginLeft: 50
  },
  boxBtnDate:{
    flexDirection: 'row',
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  date:{
    width: '100%',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',   
  },
  btnStartDate:{
    height: 52,
    width: '45%',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnTextDate:{
    fontSize: 17,
  },
  btnEndDate:{
    height: 52,
    width: '45%',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeButton: {
    backgroundColor: '#00BDD5', 
  },
  inactiveButton: {
    backgroundColor: '#EAEBED', 
  },
  activeText: {
    color: 'white', 
  },
  inactiveText: {
    color: '#808184' 
  },
  btnNext:{
    width: 130,
    height: 60,
    backgroundColor: '#C8F9FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 210,
    borderRadius: 10
  },
  textBtnNext:{
    fontSize: 18,
    color: '#4C9AA5',
    
  },
  contentBox3: {
    borderWidth: 1,
    height: 320,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: '#BBBCBD',
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 22
  },
  titleBox3: {
    fontSize: 30, 
    fontWeight: 'bold',
    marginBottom: 15,
    width: '100%'
    
  },
  boxChange:{
    width: '100%',
    height: 160,
    justifyContent: 'space-around',
    marginBottom: 10
  },
  changeAldult:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  change1:{
    flexDirection: 'row',
    width: '42%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleChange1:{
    fontSize: 21,
  },
  textAdd:{
    fontSize: 21
  },
  textMinus:{
    fontSize: 21
  },
  number:{
    fontSize: 21
  },
  add:{
    borderWidth: 1,
    borderRadius: 90,
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  minus:{
    borderWidth: 1,
    borderRadius: 90,
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeChildren:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    height: 80,
    borderColor: '#BBBCBD',
  },
  change2:{
    flexDirection: 'row',
    width: '42%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleChange2:{
    fontSize: 21,
  },
  activeText2: {
    color: 'black',
  },
  inactiveText2: {
    color: 'gray',
  },
  activeBorder: {
    borderColor: 'black',
  },
  inactiveBorder: {
    borderColor: 'gray',
  },
  footer: { 
    flex: 1, 
    borderTopWidth: 1,
    borderTopColor: '#BBBCBD',
    paddingHorizontal: 20,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textBtnClear:{
    color: '#B5B6BA',
    fontSize: 18
  },
  btnSearch:{
    backgroundColor: '#05B9D5',
    width: 130,
    borderRadius: 10,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  textBtnSearch:{
    color: '#fff',
    fontSize: 18,
    marginRight: 20
  }
});
