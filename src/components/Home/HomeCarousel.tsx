import React from 'react';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import HomeCarouselItem from './HomeCarouselItem';

export const SLIDER_WIDTH = Dimensions.get(`window`).width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const data = [
  `https://cdn.pixabay.com/photo/2022/08/21/21/24/colours-7402147_960_720.jpg`,
  `https://cdn.pixabay.com/photo/2022/09/20/07/49/tomatoes-7467255_960_720.jpg`,
  `https://cdn.pixabay.com/photo/2022/05/29/19/51/village-weaver-7229880_960_720.jpg`
];

const HomeCarousel = () => {
  const isCarousel = React.useRef(null);
  const [index, setIndex] = React.useState(0);

  return (
    <View>
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={HomeCarouselItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={3}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: `rgba(0, 0, 0, 0.92)`
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  );
};

export default HomeCarousel;
