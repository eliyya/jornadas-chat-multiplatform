import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Message } from '@/components/Message'
import { useSocket } from '@/lib/socket';
import { $messages, useStore } from '@/lib/messages';

interface MessageListProps {
  username: string;
}
export function MessageList({ username }: MessageListProps) {
  const messages = useStore($messages);
  const socket = useSocket()

  useEffect(() => {
    socket.createInstance(username).then(s => s.onMessage(data => {
      $messages.set([
        ...$messages.get().filter(m => m.id !== data.id),
        data,
      ])
    }))

  }, [socket])

  return (
    <ScrollView
      className="flex h-full flex-col justify-end py-4 pl-4"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {messages.map((message, i) => {
        const mine = message.username === username;
        const showName =
          !mine && messages[i - 1]?.username !== message.username;
        const showAvatar =
          !mine && messages[i + 1]?.username !== message.username;

        return (
          <Message
            showAvatar={showAvatar}
            showName={showName}
            mine={mine}
            message={message}
            key={message.id}
          />
        );
      })}
    </ScrollView>
  );
}
