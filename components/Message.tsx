import { View, Text, Image } from "react-native"

interface MessageProps {
    message: {
        id: string
        username: string
        avatar?: string
        content: string
        createdAt: string
    }
    mine: boolean
    showName: boolean
    showAvatar: boolean
}
export function Message({ message, showName, mine, showAvatar }: MessageProps) {
    return (
        <View
            className={`relative flex max-w-[85%] flex-col gap-1 rounded-md border p-2 pb-1 shadow md:max-w-[66%] text-black ${
                mine
                    ? 'self-end border-red-200 bg-red-100'
                    : 'self-start bg-white'
            }`}
        >
            {showAvatar && (
                <View className="absolute bottom-0 left-0 h-8 w-8 -translate-x-[calc(100%+8px)]">
                    <View className="relative">
                        <Image
                            source={require('../assets/images/github-mark-white.png')}
                        />
                    </View>
                </View>
            )}
            {showName && (
                <Text className="select-none truncate text-xs font-semibold text-gray-400">
                    {message.username}
                </Text>
            )}
            <Text>{message.content}</Text>
            <Text
                className='select-none text-right text-xs'
            >
                {formatDateToHours(message.createdAt)}
            </Text>
        </View>
    )
}

export function formatDateToHours(dateString: string) {
    const date = new Date(dateString)
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${hours}:${minutes}`
}