/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState, createContext, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/components/Home';
import Login from './src/components/Login';

export const UserContext = createContext();

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <UserContext.Provider value={{user, setUser}}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {!user ? (
            <Stack.Screen name="Login" component={Login} />
          ) : (
            <Stack.Screen name="Home" component={Home} />
          )}
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
};

export default App;
