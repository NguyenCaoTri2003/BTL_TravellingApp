import { Text, View, StyleSheet } from 'react-native';
import ScreenSignUp from './components/screenSignUp';
import ScreenSearch from './components/screenSearch';
import ScreenFavorite from './components/screenFavorite';
import ScreenHome from './components/screenHome';
import ScreenInfo from './components/screen_Info';
import ScreenReviews from './components/screen_Reviews';
import ScreenProfile from './components/Screen_Profile';
import ScreenDescription from './components/screen_Description';
import ScreenFacilitiesServices from './components/screen_Facilities&Services';
import ScreenConfirm from './components/screen_Confirm';
import ScreenBookingConfirmed from './components/screen_Booking_confirmed';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ApiProvider } from './components/context/ApiContext';
import { AuthProvider } from './components/context/AuthContext';
import { DataProvider } from './components/context/DataContext'; // Import DataProvider
import { SearchProvider } from './components/context/SearchContext';
import { ReviewsProvider } from './components/context/ReviewContext';

import TextReviews from './components/text_review';

const Stack = createStackNavigator();
 
export default function App() {
  return (
    <AuthProvider style={styles.container}> 
      <ApiProvider>
        <DataProvider> {/* Bọc ứng dụng bằng DataProvider */}
          <SearchProvider>
            <ReviewsProvider>
                <NavigationContainer>
                  <Stack.Navigator 
                    initialRouteName="ScreenSignUp"
                    screenOptions={{
                      headerShown: false,
                      cardStyleInterpolator: () => ({
                        cardStyle: {
                          opacity: 1,
                        },
                      }),
                      transitionSpec: {
                        open: { animation: 'timing', config: { duration: 0 } },
                        close: { animation: 'timing', config: { duration: 0 } },
                      },
                    }}
                  >
                    <Stack.Screen 
                      name="ScreenSignUp" 
                      component={ScreenSignUp} 
                      options={{ headerShown: false }} 
                      
                    />
                    <Stack.Screen 
                      name="ScreenHome" 
                      component={ScreenHome} 
                      options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                      name="ScreenSearch" 
                      component={ScreenSearch} 
                      options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                      name="ScreenFavorite" 
                      component={ScreenFavorite} 
                      options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                      name="ScreenInfo" 
                      component={ScreenInfo} 
                      options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                      name="ScreenReviews" 
                      component={ScreenReviews} 
                      options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                      name="ScreenProfile" 
                      component={ScreenProfile} 
                      options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                      name="ScreenDescription" 
                      component={ScreenDescription} 
                      options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                      name="ScreenFacilitiesServices" 
                      component={ScreenFacilitiesServices} 
                      options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                      name="ScreenConfirm" 
                      component={ScreenConfirm} 
                      options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                      name="ScreenBookingConfirmed" 
                      component={ScreenBookingConfirmed} 
                      options={{ headerShown: false }} 
                    />

                    <Stack.Screen 
                      name="TextReviews" 
                      component={TextReviews} 
                      options={{ headerShown: false }} 
                    />
                  
                  </Stack.Navigator>
                </NavigationContainer>
              </ReviewsProvider>
            </SearchProvider>
        </DataProvider>
      </ApiProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
