import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/Components/Login';
import Register from './src/Components/Registro';
import Inicio from './src/Components/Inicio';
import Estadisticas from './src/Components/Estadisticas';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Register" component={Register}/>
      <Stack.Screen name="Inicio" component={Inicio} options={{headerShown:false}}/>
      <Stack.Screen name="Estadisticas" component={Estadisticas}/>
    </Stack.Navigator>
  );
}

export default function Navigation(){
  return(
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}