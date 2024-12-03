import { Text, SafeAreaView, StyleSheet, ScrollView, View, TouchableOpacity, Image, FlatList} from 'react-native';

import { useRoute } from '@react-navigation/native';

export default function ScreenBookingConfirmed({navigation}) {

  // Lấy ngày tháng năm hiện tại
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  const route = useRoute();
  const { totalAmountAll } = route.params;
  // Sinh mã ngẫu nhiên
  const randomRefNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={ require('../image/icon-success.png')} style={styles.imgSuccess} />
        <View style={styles.boxPay}>
          <View style={styles.info}>
            <Text style={styles.titleInfo}>Payment success!</Text>
            <View style={styles.infoDetail}>
              <View style={styles.info1}>
                <Text style={styles.textDetail1}>Ref number</Text>
                <Text style={styles.textDetail2}>{randomRefNumber}</Text>
              </View>
              <View style={styles.info1}>
                <Text style={styles.textDetail1}>Date</Text>
                <Text style={styles.textDetail2}>{formattedDate}</Text>
              </View>
              <View style={styles.info1}>
                <Text style={styles.textDetail1}>Time</Text>
                <Text style={styles.textDetail2}>{currentDate.toLocaleTimeString('en-US', { hour12: false })}</Text>
              </View>
              <View style={styles.info1}>
                <Text style={styles.textDetail1}>Payment method</Text>
                <Text style={styles.textDetail2}>Credit Card</Text>
              </View>
            </View>
          </View>
          <View style={styles.footeBoxPay}>
            <View style={styles.info1}>
                <Text style={styles.textDetail1}>Amount</Text>
                <Text style={styles.textDetail2}>${totalAmountAll}</Text>
            </View>
            <TouchableOpacity style={styles.btnGetPDF}>
              <Text style={styles.textBtnGetPDF}>Get PDF receipt</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btnView}>
          <Text style={styles.textBtnView}>View booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: 'white',
    
  },
  content:{
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', 
    paddingHorizontal: 20,
    backgroundColor: '#F8F9FB'
  },
  boxPay:{
    backgroundColor: '#fff',
    width: '95%',
    height: 450,
    borderRadius: 20,
    justifyContent: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4,
  },
  info:{
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
     paddingVertical: 10,
     borderBottomWidth: 1,
     borderBottomColor: '#D6D6D6',
     borderColor: '#959699',
     elevation: 5,
  },
  titleInfo:{
    fontSize: 37,
    fontWeight: 'bold',
    marginTop: 55
  },
  infoDetail:{
    width: '100%',
    height: 150,
    justifyContent: 'space-around',
  },
  info1:{
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    width: '100%',
   
  },
  textDetail1:{
    fontSize: 19,
    color: '#3B3B3B',
  },
  textDetail2:{
    fontSize: 19,
    fontWeight: 'bold'
  },
  imgSuccess:{
    position: 'absolute',
    width: 156,
    height: 180,
    top: 80,
    left: '50%', 
    transform: [{ translateX: -90 }],
    zIndex: 10, 
  },
  footeBoxPay:{
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20
  },
  btnGetPDF:{
    width: '95%',
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#959699'
  },
  textBtnGetPDF:{
    fontSize: 20,
    color: '#959699'
  },
  footer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnView:{
    width: '95%',
    borderRadius: 10,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00BDD5',
    marginBottom: 30
  },
  textBtnView:{
    fontSize: 20,
    color: '#fff'
  },
});
