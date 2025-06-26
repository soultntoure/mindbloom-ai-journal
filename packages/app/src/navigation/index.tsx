import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import JournalEntryScreen from '../screens/JournalEntryScreen';
import useUserStore from '../state/userStore';
// Import Auth screens here later (e.g., LoginScreen)

export type RootStackParamList = {
  Home: undefined;
  JournalEntry: { entryId?: string };
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { token } = useUserStore();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="JournalEntry" component={JournalEntryScreen} options={{ title: 'Journal' }} />
          </>
        ) : (
          // <Stack.Screen name="Login" component={LoginScreen} />
          // For now, let's just show home screen
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome' }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
