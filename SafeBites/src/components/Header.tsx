import { View, Text } from 'react-native';

export default function Header() {
  return (
    <View style={{ alignItems: 'center', marginVertical: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
        Scan food products and identify harmful ingredients instantly!
      </Text>
    </View>
  );
}
