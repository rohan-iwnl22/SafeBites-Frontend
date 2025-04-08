import { View, Image } from 'react-native';

export default function ImageBanner() {
  return (
    <View style={{ alignItems: 'center', marginVertical: 20 }}>
      <Image 
        source={require('../assets/banner.png')} 
        style={{ width: '90%', height: 150, resizeMode: 'contain' }} 
      />
    </View>
  );
}
