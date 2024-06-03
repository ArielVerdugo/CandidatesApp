import React from 'react';
import { Image } from 'react-native';

const placeholder = require('../assets/images/avatar_placeholder.png');

export default class CandidateAvatar extends React.PureComponent {
  render() {
    const { avatarUrl, style } = this.props;

    return <Image style={style} source={{ uri: avatarUrl }} defaultSource={placeholder} />;
  }
}
