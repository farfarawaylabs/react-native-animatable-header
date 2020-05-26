import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface CollapsedHeaderSectionProps {
  /**
   * Additional styles or styles to override default style
   */
  style?: StyleProp<ViewStyle>;
}

/** description */
const CollapsedHeaderSection: React.FC<CollapsedHeaderSectionProps> = ({
  style,
  children,
  ...rest
}) => {
  return (
    <View style={[styles.container, style]} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '33%',
  },
});

export default CollapsedHeaderSection;
