import React, { useState, useTransition } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
// import { logout } from '@/actions/auth';
import { headerStyles } from '@/lib/styles'

export function HeaderChat({ username }: {
  username: string;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    // startTransition(async () => {
    //   await logout();
    // });
  };

  return (
    <View style={headerStyles.container}>
      <Text style={headerStyles.title}>RealtimeChat</Text>
      <TouchableOpacity
        onPress={() => setShowMenu((prev) => !prev)}
      >
        <Image
          source={require('@/assets/images/LogoSistemas.png')}
          style={headerStyles.image}
        />
      </TouchableOpacity>

      {/* menu */}
      <Modal
        animationType="slide"
        visible={showMenu}
        onRequestClose={() => setShowMenu(false)}
        transparent={true}
      >
        <View style={headerStyles.modal}>
          <Text style={headerStyles.username}>
            {username}
          </Text>
          <TouchableOpacity
            onPress={() => setShowMenu(false)}
            style={headerStyles.modalButton}
            disabled={isPending}
          >
            <Text>Cerrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            style={headerStyles.modalButton}
            disabled={isPending}
          >
            <Text>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
