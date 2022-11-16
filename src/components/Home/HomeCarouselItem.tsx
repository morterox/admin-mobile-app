import React from 'react';
import {View, Image, StyleSheet, Text, Dimensions} from 'react-native';
import {SvgUri} from 'react-native-svg';

export const SLIDER_WIDTH = Dimensions.get(`window`).width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const HomeCarouselItem = ({item, index}) => {
  console.log(item, `ITEM`);
  return (
    <View style={styles.container}>
      <Image style={styles.newsContainer} source={{uri: item}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: `15%`,
    height: 200,
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    flexWrap: `wrap`,
    width: `100%`
  },
  newsContainer: {
    height: `100%`,
    flex: 0.6,
    marginTop: 20,
    paddingTop: 30,
    backgroundColor: `#e0e0e0`,
    shadowColor: `#bebebe`,
    shadowRadius: 20,
    width: `100%`
  }
});

export default HomeCarouselItem;
