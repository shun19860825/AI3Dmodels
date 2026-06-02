import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from '../context/AppContext';

export default function RootLayout() {
  return (
    <AppProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0f0f1a' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: '#0f0f1a' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" options={{ title: 'AI採寸', headerShown: false }} />
        <Stack.Screen name="camera/front" options={{ title: '正面写真を撮影' }} />
        <Stack.Screen name="camera/side" options={{ title: '側面写真を撮影' }} />
        <Stack.Screen name="processing" options={{ title: '解析中', headerBackVisible: false }} />
        <Stack.Screen name="results" options={{ title: '採寸結果', headerBackVisible: false }} />
      </Stack>
    </AppProvider>
  );
}
