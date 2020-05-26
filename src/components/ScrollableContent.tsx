import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Text,
  TextStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { onScrollEvent } from 'react-native-redash';
import LinearGradient from 'react-native-linear-gradient';

interface ScrollableContentProps {
  /** The background color to use. Defaults to '#000'. */
  backgroundColor?: string;

  /** The header title */
  title?: string;

  /** The title color. Defaults to '#FFF'. */
  titleColor?: string;

  /** Additional styles or override default styles for the header title */
  titleStyle?: StyleProp<TextStyle>;

  /** Additional or overide default style for the container of the title. By default it centers the title horizontally and put it on the bottom vertically */
  titleContainerStyle?: StyleProp<ViewStyle>;

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
const ScrollableContent: React.FC<ScrollableContentProps> = ({
  backgroundColor = '#000',
  title,
  titleColor = '#FFF',
  titleStyle,
  titleContainerStyle,
  headerHeight,
  scrollY,
  style,
  children,
  ...rest
}) => {
  const height = Animated.interpolate(scrollY!, {
    inputRange: [-headerHeight!, 0],
    outputRange: [0, headerHeight!],
    extrapolate: Animated.Extrapolate.CLAMP,
  });
  const opacity = Animated.interpolate(scrollY!, {
    inputRange: [-headerHeight! / 2, 0, headerHeight! / 1.5],
    outputRange: [0, 1, 0],
    extrapolateLeft: Animated.Extrapolate.CLAMP,
  });
  return (
    <Animated.ScrollView
      onScroll={onScrollEvent({ y: scrollY })}
      style={[styles.container, style]}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={1}
      {...rest}
    >
      <View style={{ height: headerHeight }}>
        <Animated.View style={[styles.gradient, { height }]}>
          <LinearGradient
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0.3 }}
            end={{ x: 0, y: 1.2 }}
            colors={[
              'rgba(0, 0, 0, 0)',
              'rgba(0, 0, 0, 0.2)',
              'rgba(0, 0, 0, 1)',
            ]}
          />
        </Animated.View>
        <Animated.View
          style={[styles.titleContainer, titleContainerStyle, { opacity }]}
        >
          <Text style={[styles.title, { color: titleColor }, titleStyle]}>
            {title}
          </Text>
        </Animated.View>
      </View>
      <View style={[styles.content, { backgroundColor: backgroundColor }]}>
        {children}
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
  },
  titleContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 48,
    fontWeight: 'bold',
  },
  content: {
    paddingTop: 32,
  },
});

export default ScrollableContent;
