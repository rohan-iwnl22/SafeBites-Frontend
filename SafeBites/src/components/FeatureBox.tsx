import { View, Text } from 'react-native';

interface FeatureBoxProps {
  icon: JSX.Element;
  label: string;
}

export default function FeatureBox({ icon, label }: FeatureBoxProps) {
  return (
    <View style={{ alignItems: 'center', padding: 20, backgroundColor: '#f0f0f0', borderRadius: 10, flex: 1 }}>
      {icon}
      <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>{label}</Text>
    </View>
  );
}
