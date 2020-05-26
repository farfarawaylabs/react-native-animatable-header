import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Dimensions,
} from 'react-native';
import Animated from 'react-native-reanimated';

const DEFAULT_HEIGHT = Dimensions.get('window').height * 0.3;

interface AnimatableHeaderProps {
  /** header height. Defaults to 30% of the window height */
  headerHeight?: number;

  /** Set the background color for all the child components. Not set by default */
  backgroundColor?: string;

  /**
   * Additional styles or styles to override default style
   */
  style?: StyleProp<ViewStyle>;
}

const AnimatableHeader: React.FC<AnimatableHeaderProps> = ({
  headerHeight = DEFAULT_HEIGHT,
  backgroundColor,
  style,
  children,
  ...rest
}) => {
  const scrollY = new Animated.Value(0);
  return (
    <View style={[styles.container, style]} {...rest}>
      {React.Children.map(children, (currChild: any, index: number) => {
        let props = {
          headerHeight: headerHeight,
          scrollY: scrollY,
          key: `AHChild${index}`,
        };

        if (backgroundColor) {
          props = Object.assign({}, props, {
            backgroundColor: backgroundColor,
          });
        }
        return React.cloneElement(currChild, props);
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AnimatableHeader;

/**
const AnimatableHeader: React.FC<AnimatableHeaderProps> = ({
  headerBackgroundImage,
  height = DEFAULT_HEIGHT,
  collapsedHeaderBackgroundColor = '#000',
  scrollableContentBackgroundColor = '#000',
  collapsedHeaderTitleColor = '#FFF',
  titleColor = '#FFF',
  titleStyle,
  style,
  children,
  ...rest
}) => {
  const scrollY = new Animated.Value(0);
  return (
    <View style={[styles.container, style]} {...rest}>
      <HeaderBackground
        image={headerBackgroundImage}
        height={height}
        scrollY={scrollY}
      />
      <ScrollableContent
        maxHeight={height}
        scrollY={scrollY}
        backgroundColor={scrollableContentBackgroundColor}
        titleColor={titleColor}
      >
        {children}
      </ScrollableContent>
      <CollapsedHeader
        scrollY={scrollY}
        maxHeight={height}
        backgroundColor={collapsedHeaderBackgroundColor}
        titleColor={collapsedHeaderTitleColor}
      />
    </View>
  );
};
**/
