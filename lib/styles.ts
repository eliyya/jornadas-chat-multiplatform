import { StyleSheet } from 'react-native'

export const headerStyles = StyleSheet.create({
    container: {
        height: 78,
        display: 'flex',
        width: '100%',                  // h-24 (24 * 4 = 96)
        backgroundColor: '#ffffff',   // bg-white
        padding: 8,         // px-2 (2 * 4 = 8)
        flexDirection: 'row',         // flex-row
        alignItems: 'flex-end',         // items-center
        justifyContent: 'space-between', // justify-between
    },
    title: {
        fontWeight: '900',
        fontSize: 24
    },
    modal: {
        position: 'absolute',
        right: 0,
        top: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    modalButton: {
        marginTop: 5,
        backgroundColor: 'gray',
        padding: 10,
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
    },
    username: {
        fontSize: 16,
        paddingHorizontal: 8,
        paddingVertical: 4
    },
    image: {
        width: 36,
        height: 36
    }
});

export const newMessageFormStyles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',   // bg-white
        flexDirection: 'row',         // flex-row
        alignItems: 'center',         // items-center
        height: 48,
        display: 'flex'
    },
    input: {
        flex: 1,
        height: 48,
        fontSize: 18
    },
    button: {
        position: 'relative',           // relative
        borderRadius: 6,                 // rounded-md
        paddingHorizontal: 48,           // px-5 (5 * 4 = 20)
        paddingVertical: 32,              // py-2 (2 * 4 = 8)
    },
    pending: {
        backgroundColor: '#fca5a5',      // bg-red-300 (color más claro)
    },
    default: {
        backgroundColor: '#ef4444',      // bg-red-500
    },
    hover: {
        backgroundColor: '#f87171',      // bg-red-400 para hover
    },
    text: {
        color: '#000000',
        textAlign: 'center',
        padding: 8
    },
});