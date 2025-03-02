import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { IconProvider } from '@/context/iconContext';
import { useFonts } from 'expo-font';
import { Stack, Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { AuthProvider } from '@/context/authContext';

import { useColorScheme } from '@/hooks/useColorScheme';
import { getCurrentUser, onAuthStateChange } from '@/context/supabaseAuth';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
 // const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    checkUser();
    const authSubscription = onAuthStateChange((user) => {
      //setUser(user);
      setIsLoading(false);
    });

    return () => {
      authSubscription.data?.subscription?.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const { user } = await getCurrentUser();
    // setUser(user);
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || isLoading) {
    return null;
  }
const user= {id:1, email:"test@test.com"}
  return (
    <AuthProvider>
      <IconProvider>
      <Stack>
        {!user ? (
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(biby)" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="+not-found" options={{ presentation: 'modal' }} />
        <Stack.Screen name="Screens/iaAbout" 
          options={{ 
            headerBackTitle: 'Back',
            headerTitle: 'About',
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
      </IconProvider>
    </AuthProvider>
  );
}
