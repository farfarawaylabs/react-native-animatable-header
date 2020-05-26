import React from 'react';
import {
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

interface CollapsedHeadrProps {
  /** The background color to use. Defaults to '#000' */
  backgroundColor?: string;

  /** The title to show */
  title?: string;

  /** The color of the title. Defaults to '#FFF */
  titleColor?: string;

  /** Additional styles or override default styles for the header title */
  titleStyle?: StyleProp<TextStyle>;

  /** The height of the header when it is collapsed. Defaults to 30% of the header height */
  collapsedHeight?: number;

  /** header height. This will be injected automatically by the AnimatableHeader and normally you don't need to use this prop yourself. */
  headerHeight?: number;

  /** The current scroll position. This will be injected automatically by the AnimatableHeader and normally you don't need to use this prop yourself.  */
  scrollY?: Animated.Value<number>;

  /**
   * Additional styles or styles to override default style
   */
  style?: StyleProp<ViewStyle>;
}

/** description */
const CollapsedHeadr: React.FC<CollapsedHeadrProps> = ({
  backgroundColor = '#000',
  title,
  titleColor = '#FFF',
  titleStyle,
  collapsedHeight,
  style,
  scrollY,
  headerHeight,
  ...rest
}) => {
  const collapsedHeaderHeight = collapsedHeight
    ? collapsedHeight
    : headerHeight! * 0.3;

  const delta = headerHeight! - collapsedHeaderHeight;

  const backgroundOpacity = Animated.interpolate(scrollY!, {
    inputRange: [0, delta],
    outputRange: [0, 1],
    extrapolate: Animated.Extrapolate.CLAMP,
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: backgroundColor },
        { opacity: backgroundOpacity },
        { height: collapsedHeaderHeight },
        style,
      ]}
      {...rest}
    >
      <Text style={[styles.title, { color: titleColor }, titleStyle]}>
        {title}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '400',
  },
});

export default CollapsedHeadr;
