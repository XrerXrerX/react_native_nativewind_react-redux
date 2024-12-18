/** @format */

import { View, Text, ViewStyle, TextStyle } from "react-native";

// Define props types
interface InfoBoxProps {
  title: string;
  subtitle: string;
  containerStyles?: string; // Optional because styles might be passed as a className or directly
  titleStyles?: string; // Optional for additional styling on the title
}

const InfoBox: React.FC<InfoBoxProps> = ({
  title,
  subtitle,
  containerStyles,
  titleStyles,
}) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      <Text className="text-sm text-gray-100 text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
