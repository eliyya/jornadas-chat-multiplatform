import { HeaderChat } from '@/components/HeaderChat';
import { MessageList } from '@/components/MessageList';
import { NewMessageForm } from '@/components/NewMessageForm.tsx';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import {SocketProvider} from '@/lib/socket'
// import { Linking } from 'react-native';

export default function HomeScreen() {
  const user = {
    login: "exampleUser",
    id: 123456,
    node_id: "MDQ6VXNlcjEyMzQ1Ng==",
    avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/exampleUser",
    html_url: "https://github.com/exampleUser",
    followers_url: "https://api.github.com/users/exampleUser/followers",
    following_url: "https://api.github.com/users/exampleUser/following{/other_user}",
    gists_url: "https://api.github.com/users/exampleUser/gists{/gist_id}",
    starred_url: "https://api.github.com/users/exampleUser/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/exampleUser/subscriptions",
    organizations_url: "https://api.github.com/users/exampleUser/orgs",
    repos_url: "https://api.github.com/users/exampleUser/repos",
    events_url: "https://api.github.com/users/exampleUser/events{/privacy}",
    received_events_url: "https://api.github.com/users/exampleUser/received_events",
    type: "User",
    user_view_type: "default",
    site_admin: false,
    name: "Example User",
    company: null,
    blog: "https://example.com",
    location: "Example City, Country",
    email: null,
    hireable: null,
    bio: "This is an example user for demonstration purposes.",
    twitter_username: "exampleUser",
    public_repos: 10,
    public_gists: 5,
    followers: 100,
    following: 50,
    created_at: "2021-01-01T12:00:00Z",
    updated_at: "2024-01-01T12:00:00Z",
  };
  
  return (
    <View className="relative flex min-h-screen sm:w-2/3 lg:w-1/2 w-full flex-col gap-3 bg-black">
      <SocketProvider>
      <View className="sticky top-0 z-10 -mx-2 px-2">
        <HeaderChat user={user} />
      </View>
      <View className="flex-1">
        <MessageList user={user} />
      </View>
      <View className="sticky bottom-0 -mx-2 py-2 pb-10 px-2">
        <NewMessageForm user={user} />
      </View>
      </SocketProvider>
    </View>
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
              Before you start chatting, log in with your GitHub account to verify who you are.
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              // const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
              // const callbackUrl = encodeURIComponent(process.env.NEXT_PUBLIC_GITHUB_CALLBACK_URL!);
              // const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user&redirect_uri=${callbackUrl}`;

              // Linking.openURL(url).catch((err) => Alert.alert("Error", "Unable to open URL"));
            }}
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
