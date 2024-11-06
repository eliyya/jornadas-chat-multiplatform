import React from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { newMessageFormStyles } from '@/lib/styles'
import { useSocket } from '@/lib/socket';
import { createMessage } from '@/lib/messages';

export function NewMessageForm({ username, avatar }: {
  username: string;
  avatar?: string
}) {
  const [message, setMessage] = React.useState('');
  const socket = useSocket()

  return (
    <View style={newMessageFormStyles.container}>
      <TextInput
        value={message}
        onChangeText={setMessage}
        style={newMessageFormStyles.input}
        placeholder="Message"
      />
      <Pressable
        onPress={() => {
          createMessage({
            message,
            socket,
            username: username,
            avatar,
          })
        }}
        style={({ pressed }) => [
          newMessageFormStyles.button,
          pressed && newMessageFormStyles.hover,
        ]}
      >
        <Text style={newMessageFormStyles.text} >Send</Text>
      </Pressable>
    </View>
  );
}
