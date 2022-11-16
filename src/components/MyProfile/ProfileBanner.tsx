import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import ProfileIcon from '../Icons/Profile';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="500" zoomAndPan="magnify" viewBox="0 0 375 374.999991" height="500" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="e3c8406a1e"><path d="M 120 23.613281 L 256 23.613281 L 256 188 L 120 188 Z M 120 23.613281 " clip-rule="nonzero"/></clipPath><clipPath id="23f541c533"><path d="M 60.679688 310 L 61 310 L 61 313 L 60.679688 313 Z M 60.679688 310 " clip-rule="nonzero"/></clipPath><clipPath id="d6f20af5b8"><path d="M 314 311 L 314.929688 311 L 314.929688 315 L 314 315 Z M 314 311 " clip-rule="nonzero"/></clipPath><clipPath id="3df934c39c"><path d="M 60.679688 193 L 314.929688 193 L 314.929688 358 L 60.679688 358 Z M 60.679688 193 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#e3c8406a1e)"><path fill="#ff1616" d="M 187.804688 187.207031 C 224.96875 187.207031 255.101562 150.613281 255.101562 105.476562 C 255.101562 60.335938 245.210938 23.742188 187.804688 23.742188 C 130.394531 23.742188 120.5 60.335938 120.5 105.476562 C 120.5 150.613281 150.632812 187.207031 187.804688 187.207031 Z M 187.804688 187.207031 " fill-opacity="1" fill-rule="nonzero"/></g><g clip-path="url(#23f541c533)"><path fill="#ff1616" d="M 60.6875 312.003906 C 60.675781 309.25 60.664062 311.226562 60.6875 312.003906 Z M 60.6875 312.003906 " fill-opacity="1" fill-rule="nonzero"/></g><g clip-path="url(#d6f20af5b8)"><path fill="#ff1616" d="M 314.910156 314.152344 C 314.945312 313.398438 314.921875 308.925781 314.910156 314.152344 Z M 314.910156 314.152344 " fill-opacity="1" fill-rule="nonzero"/></g><g clip-path="url(#3df934c39c)"><path fill="#ff1616" d="M 314.773438 308.707031 C 313.527344 230.074219 303.257812 207.671875 224.660156 193.480469 C 224.660156 193.480469 213.59375 207.578125 187.808594 207.578125 C 162.019531 207.578125 150.953125 193.480469 150.953125 193.480469 C 73.210938 207.511719 62.316406 229.585938 60.882812 306.148438 C 60.765625 312.402344 60.710938 312.730469 60.691406 312.003906 C 60.695312 313.363281 60.699219 315.878906 60.699219 320.265625 C 60.699219 320.265625 79.414062 357.984375 187.808594 357.984375 C 296.203125 357.984375 314.914062 320.265625 314.914062 320.265625 C 314.914062 317.449219 314.914062 315.488281 314.917969 314.15625 C 314.898438 314.605469 314.855469 313.734375 314.773438 308.703125 Z M 314.773438 308.707031 " fill-opacity="1" fill-rule="nonzero"/></g></svg>
`;

interface IProfile {
  data: {
    name: string;
    email?: string;
  };
}

const ProfileBanner = ({data}: IProfile) => {
  return (
    <View style={style.container}>
      <View>{/*** <SvgXml xml={xml} width="100%" height="100%" /> NOT WORKING*/}</View>
      <View style={style.profileInfo}>
        <Text style={style.profileInfo.titles}>{data.name}</Text>
        <Text>{data.email ? data.email : ``}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: `center`,
    justifyContent: `flex-start`
  },
  profileInfo: {
    alignItems: `center`,
    titles: {
      fontWeight: `400`,
      color: `black`,
      fontSize: 24,
      textAlign: `left`
    }
  }
});

export default ProfileBanner;
