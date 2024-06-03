import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CandidateAvatar from './CandidateAvatar';

export default class CandidateRowItem extends React.PureComponent {
  render() {
    const { name, surname, avatarUrl } = this.props;

    return (
      <View style={styles.container}>
        <CandidateAvatar style={styles.image} avatarUrl={avatarUrl} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.surname}>{surname}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    alignItems: 'center',
    padding: 12,
    flexDirection: 'row'
  },
  name: {
    fontSize: 14,
    marginRight: 5
  },
  surname: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#34495e',
    marginRight: 10
  }
});
