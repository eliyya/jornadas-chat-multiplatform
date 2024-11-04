import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
// import { createMessage } from '@/lib/messages';
import { GithubSuccesResponse } from '@/types';
import { useTransition } from 'react';

interface NewMessageFormProps {
  user: GithubSuccesResponse;
}

export function NewMessageForm({ user }: NewMessageFormProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = React.useState('');

  const handleSubmit = async () => {
    // startTransition(async () => {
    //   await createMessage(message, user.login);
    //   setMessage(''); // Limpiar el campo después de enviar
    // });
  };

  return (
    <View className="flex flex-row gap-2">
      <View className="flex-grow">
        <TextInput
          value={message}
          onChangeText={setMessage}
          className="h-full w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
          placeholder="Message"
        />
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={isPending}
        className={`relative cursor-pointer rounded-md px-5 py-2 ${
          isPending
            ? 'bg-red-300'
            : 'bg-red-500 enabled:hover:bg-red-400'
        }`}
      >
        <Text className="text-white text-center">Send</Text>
      </TouchableOpacity>
    </View>
  );
}
