import { HeaderChat } from '@/components/HeaderChat';
import { MessageList } from '@/components/MessageList';
import { NewMessageForm } from '@/components/NewMessageForm.tsx';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SocketProvider } from '@/lib/socket'
// import { Linking } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import { useContext, useState } from 'react';
import { useSession } from '@/lib/session';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    position: 'relative',           // relative
    flex: 1,                        // flex para ocupar el espacio disponible en su contenedor
    flexDirection: 'column',        // flex-col
    gap: 12,                        // gap-3 (3 * 4 = 12)
  },
});


export default function HomeScreen() {
  const { setUsername, username } = useSession()

  const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
  }

  const [authRequest] = useAuthRequest(
    {
      clientId: 'Ov23li4rlMbBfbPhXQAq',
      redirectUri: makeRedirectUri({
        scheme: 'jrtcm',
      }),
      scopes: ['user'],
    },
    discovery
  )

  const handleLogin = async () => {
    const response = await authRequest?.promptAsync(discovery);

    if (response?.type === 'success') {
      const { code } = response.params;
      fetch('http://localhost:25565/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Tipo de contenido
        },
        body: JSON.stringify({
          code
        })
      }).then(r => r.json()).then(({ token }) => {
        setToken(token)
        Alert.alert("Autenticación Exitosa", `Código: ${code}`);
      })

    } else {
      Alert.alert("Error", "No se pudo iniciar sesión");
    }
  };



  if (username) return (
    <SafeAreaView style={styles.container}>
      <SocketProvider>
        <HeaderChat username={username} />
        <View className="flex-1">
          <MessageList username={username} />
        </View>
        <NewMessageForm username={username} />
      </SocketProvider>
    </SafeAreaView>
  )
  return (
    <View className="flex-1 sm:w-2/3 lg:w-1/2 w-full mx-auto flex-col gap-3">
      <View className="flex-1 items-center justify-center">
        <View className="-mt-12 flex max-w-xs flex-col items-center">
          <Image
            source={require('../assets/images/LOGO_JORNADAS_SIN.png')}
            style={{ width: 320, height: 247 }}
          />
          <View className="my-10">
            <Text className="mb-4 text-center text-2xl font-semibold text-balance">
              Welcome to Realtime Chat
            </Text>
            <Text className="text-sm text-center">
              Before you start chatting, log in with your GitHub account to verify who you are.
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleLogin}
            className="rounded-md border-gray-500 border p-2 hover:bg-gray-800 transition-all flex flex-row justify-center gap-2 items-center"
          >
            <Text className="text-center text-white">Login with GitHub</Text>
            <Image
              source={require('../assets/images/github-mark-white.png')}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
