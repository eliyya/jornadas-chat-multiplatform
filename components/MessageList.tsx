import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
// import { $messages, useStore } from '@/lib/messages';
// import { Message } from './Message';
// import { socket } from '@/lib/socket';
// import { getToken } from '@/actions/auth';
import { GithubSuccesResponse } from '@/types';
import {Message} from '@/components/Message'
import { useSocket } from '@/lib/socket';

interface MessageListProps {
  user: GithubSuccesResponse;
}

export function MessageList({ user }: MessageListProps) {
  const messages: any[] = [/*useStore($messages)*/];
  const socket = useSocket()

  useEffect(() => {
    // const executeAsync = async () => {
    //   const token = (await getToken())!;
    //   await socket.createInstance(token).catch(e => console.log(e));
    // };
    // executeAsync();
  }, []);

  return (
    <ScrollView
      className="flex h-full flex-col justify-end py-4 pl-4"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {messages.map((message, i) => {
        const mine = message.username === user.login;
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
