import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageProps,
  Dimensions,
  Image,
} from 'react-native';

import Animated from 'react-native-reanimated';

interface HeaderBackgroundProps {
  /** image to use as background of the header */
  image: ImageProps;

  /** The background color to use. Defaults to '#000' */
  backgroundColor?: string;

  /** header height. This will be injected automatically by the AnimatableHeader and normally you don't need to use this prop yourself. */
  headerHeight?: number;

  /** The current scroll position. This will be injected automatically by the AnimatableHeader and normally you don't need to use this prop yourself.  */
  scrollY?: Animated.Value<number>;

  /** Additional styles or styles to override default style */
  style?: StyleProp<ViewStyle>;
}

/** description */
const HeaderBackground: React.FC<HeaderBackgroundProps> = ({
  image,
  backgroundColor = '#000',
  style,
  headerHeight,
  scrollY,
  ...rest
}) => {
  const scale: any = Animated.interpolate(scrollY!, {
    inputRange: [-headerHeight!, 0],
    outputRange: [3, 1],
    extrapolateRight: Animated.Extrapolate.CLAMP,
  });

  const opacity = Animated.interpolate(scrollY!, {
    inputRange: [-headerHeight! / 2, 0, headerHeight!],
    outputRange: [0, 0.2, 1],
    extrapolateRight: Animated.Extrapolate.CLAMP,
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { height: headerHeight! },
        { transform: [{ scale }] },
        style,
      ]}
      {...rest}
    >
      <Image style={styles.image} source={image} />
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            opacity,
          },
          { backgroundColor: backgroundColor },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});

export default HeaderBackground;
