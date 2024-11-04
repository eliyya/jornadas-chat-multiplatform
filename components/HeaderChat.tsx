import React, { useState, useTransition } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
// import { logout } from '@/actions/auth';
import { GithubSuccesResponse } from '@/types';

interface HeaderChatProps {
  user: GithubSuccesResponse;
}

export function HeaderChat({ user }: HeaderChatProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isPending, startTransition] = useTransition();

  const getAvatar = (user: GithubSuccesResponse) => {
    const baseUrl = new URL(user.avatar_url);
    baseUrl.searchParams.append('size', '36');
    return baseUrl.toString();
  };

  const handleLogout = async () => {
    // startTransition(async () => {
    //   await logout();
    // });
  };

  return (
    <View className="rounded-b-lg border-gray-200 bg-white p-4 shadow-md flex-row items-center justify-between">
      <Text className="font-semibold text-black truncate">RealtimeChat</Text>
      <View>
        <View className="relative">
          {/* PFP */}
          <TouchableOpacity
            className="-m-3 block p-3"
            onPress={() => setShowMenu((prev) => !prev)}
          >
            <View className="h-9 w-9">
              <Image
                source={{ uri: getAvatar(user) }}
                className="rounded-full"
                style={{ width: 36, height: 36 }}
                alt="PFP"
              />
              <View className="absolute right-0 top-0 h-2 w-2 rounded-full ring-2 ring-white transition-colors bg-green-400" />
            </View>
          </TouchableOpacity>
          {/* Menu */}
          {showMenu && (
            <View className="absolute z-10 mt-0.5 w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-900/5 right-0">
              <Text className="w-full truncate py-1 pl-6 pr-3 text-sm leading-6 text-gray-500">
                elimacmun@gmail.com
              </Text>
              <View className="w-full truncate py-2 pl-6 pr-3 text-sm leading-6 text-gray-500 flex-row items-center gap-2">
                <View className="h-1 w-1 rounded-full transition-colors bg-green-400" />
                <Text className="text-xs text-gray-500">Connected</Text>
              </View>
              <TouchableOpacity
                onPress={handleLogout}
                className="block w-full pr-3 pl-6 py-1 text-left text-sm leading-6 text-gray-900 hover:bg-gray-100 disabled:text-gray-600"
                disabled={isPending}
              >
                <Text>Sign Out</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
