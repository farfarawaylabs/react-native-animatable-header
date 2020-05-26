import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  AnimatableHeader,
  CollapsedHeader,
  HeaderBackground,
  ScrollableContent,
} from '@farfarawaylabs/react-native-animatable-header';

import bgOne from './demoImages/bgOne.jpg';

const items = [
  { title: 'This is a content item' },
  { title: 'This is a content item' },
  { title: 'This is a content item' },
  { title: 'This is a content item' },
  { title: 'This is a content item' },
  { title: 'This is a content item' },
  { title: 'This is a content item' },
  { title: 'This is a content item' },
  { title: 'This is a content item' },
  { title: 'This is a content item' },
  { title: 'This is a content item' },
  { title: 'This is a content item' },
  { title: 'This is a content item' },
  { title: 'This is a content item' },
  { title: 'This is a content item' },
];

export default function App() {
  return (
    <View style={styles.container}>
      <AnimatableHeader backgroundColor="#000">
        <HeaderBackground image={bgOne} />
        <ScrollableContent
          title="Great Title"
          titleColor="#FFF"
          titleStyle={{ fontSize: 48 }}
        >
          {items.map((currItem, index) => {
            return (
              <Text style={[styles.item]} key={`item${index}`}>
                {currItem.title}
              </Text>
            );
          })}
        </ScrollableContent>
        <CollapsedHeader title="Great Title" />
      </AnimatableHeader>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    color: 'white',
    fontSize: 30,
    paddingVertical: 15,
  },
});
