import { HeaderChat } from '@/components/HeaderChat';
import { MessageList } from '@/components/MessageList';
import { NewMessageForm } from '@/components/NewMessageForm.tsx';
import { SafeAreaView, View, Text, Image, StyleSheet, Alert, TextInput, Pressable } from 'react-native';
import { SocketProvider } from '@/lib/socket'
// import { Linking } from 'react-native';
import { newMessageFormStyles } from '@/lib/styles'
import { useState } from 'react';
import { useSession } from '@/lib/session';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,                        // flex para ocupar el espacio disponible en su contenedor
    flexDirection: 'column',        // flex-col
    gap: 12,                        // gap-3 (3 * 4 = 12)
  },
});


export default function HomeScreen() {
  const { setUsername, username, setAvatar, avatar } = useSession()
  const [usern, setUsern] = useState('')

  const handleLogin = async () => {
    setUsername(usern)

    fetch('https://api.github.com/users/' + usern, {
      headers: {
        'Content-Type': 'application/json', // Tipo de contenido
      },
    }).then(r => r.json()).then(({ avatar_url }) => {
      setAvatar(avatar_url)
    }).catch(() => null)
  };



  if (username) return (
    <SafeAreaView style={styles.container}>
      <SocketProvider>
        <HeaderChat username={username} />
        <View className="flex-1">
          <MessageList username={username} />
        </View>
        <NewMessageForm avatar={avatar} username={username} />
      </SocketProvider>
    </SafeAreaView>
  )

  return (
    <View className="flex-1 sm:w-2/3 lg:w-1/2 w-full mx-auto flex-col gap-3 bg-black">
      <View className="flex-1 items-center justify-center">
        <View className="-mt-12 flex max-w-xs flex-col items-center">
          <Image
            source={require('../assets/images/LOGO_JORNADAS_SIN.png')}
            style={{ width: 320, height: 247 }}
          />
          <View className="my-10">
            <Text className="mb-4 text-center text-2xl font-semibold text-balance text-white">
              Welcome to Realtime Chat
            </Text>
            <Text className="text-sm text-center text-white">
              Before you start chatting, log in with your GitHub username to set who you are.
            </Text>
          </View>
          <View style={newMessageFormStyles.container}>
            <TextInput
              value={usern}
              onChangeText={setUsern}
              style={newMessageFormStyles.input}
              placeholder="Message"
            />
            <Pressable
              onPress={handleLogin}
              style={({ pressed }) => [
                newMessageFormStyles.button,
                pressed && newMessageFormStyles.hover,
              ]}
            >
              <Text style={newMessageFormStyles.text} >Send</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
