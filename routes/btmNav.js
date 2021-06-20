import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Ios from 'react-native-vector-icons/Ionicons';


import Planning from '../screen/planning'         
import Stat from '../screen/stat'
import Trans from '../screen/trans'
import Sum from '../screen/sum'

const Tab = createBottomTabNavigator();
const color = "white"


export default function btmNav() {
  return (
    <NavigationContainer >
        <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Transaksi') {
                  iconName = focused ? 'list-bullet' : 'list';
                  return <Foundation name={iconName} size={size} color={color} />;
                }
                if (route.name === 'Stats') {
                  iconName = focused ? 'graph-trend' : 'graph-pie';
                  return <Foundation name={iconName} size={size} color={color} />;
                }
                if (route.name === 'Summary') {
                    iconName = focused ? 'equal' : 'equal-box';
                    return <MIcon name={iconName} size={size} color={color} />;
                }
                if (route.name === 'Planning') {
                    iconName = focused ? 'book-open-outline' : 'book-open';
                    return <MIcon name={iconName} size={size} color={color} />;
                } 
            },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}
        >
        <Tab.Screen name="Transaksi" component={Trans}/>
        <Tab.Screen name="Stats" component={Stat} />
        <Tab.Screen name="Summary" component={Sum} />
        <Tab.Screen name="Planning" component={Planning} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}