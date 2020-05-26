import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

export interface CollapsedHeaderTitleProps {
  /** The title to show */
  title?: string;

  /** The color of the title. Defaults to '#FFF */
  titleColor?: string;

  /** Additional styles or override default styles for the header title */
  titleStyle?: StyleProp<TextStyle>;

  /** header height. This will be injected automatically by the CollapsedHeader parent and normally you don't need to use this prop yourself. */
  headerHeight?: number;

  /** Collapsed header height. This will be injected automatically by the CollapsedHeader parent and normally you don't need to use this prop yourself. */
  collapsedHeaderHeight?: number;

  /** The current scroll position. This will be injected automatically by the CollapsedHeader parent and normally you don't need to use this prop yourself.  */
  scrollY?: Animated.Value<number>;

  /**
   * Additional styles or styles to override default style
   */
  style?: StyleProp<ViewStyle>;
}

/** description */
const CollapsedHeaderTitle: React.FC<CollapsedHeaderTitleProps> = ({
  title,
  titleColor = '#FFF',
  titleStyle,
  style,
  headerHeight,
  collapsedHeaderHeight,
  scrollY,
  ...rest
}) => {
  const delta = collapsedHeaderHeight!;

  const titleOpacity = Animated.interpolate(scrollY!, {
    inputRange: [
      collapsedHeaderHeight!,
      headerHeight! - collapsedHeaderHeight!,
    ],
    outputRange: [0, 1],
    extrapolate: Animated.Extrapolate.CLAMP,
  });

  return (
    <Animated.View
      style={[styles.titleContainer, { opacity: titleOpacity }, style]}
      {...rest}
    >
      <Text style={[styles.title, { color: titleColor }, titleStyle]}>
        {title}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '400',
  },
  titleContainer: {
    width: '33%',
  },
});

export default CollapsedHeaderTitle;
