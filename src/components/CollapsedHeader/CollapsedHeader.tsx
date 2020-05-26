import React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

interface CollapsedHeadrProps {
  /** The background color to use. Defaults to '#000' */
  backgroundColor?: string;

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
  collapsedHeight,
  style,
  scrollY,
  headerHeight,
  children,
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
      {React.Children.map(children, (currChild) => {
        if (
          currChild &&
          currChild.type &&
          currChild.type.name === 'CollapsedHeaderTitle'
        ) {
          return React.cloneElement(currChild, {
            headerHeight,
            collapsedHeaderHeight,
            scrollY,
          });
        } else {
          return currChild;
        }
      })}
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default CollapsedHeadr;
