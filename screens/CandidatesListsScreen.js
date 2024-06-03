import React from 'react';
import {
  View, FlatList, StyleSheet, TouchableWithoutFeedback
} from 'react-native';

import service from '../model/DelayedCandidateService';
import withFetching from '../components/HOC/withFetching';

import LoadingIndicator from '../components/LoadingIndicator';
import CandidateRowItem from '../components/CandidateRowItem';

class CandidatesListScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    const { navigation, payload } = this.props;

    navigation.setParams({
      onSubmited: async (candidate) => {
        const added = await service.addCandidate(candidate);

        const { candidates } = this.state;
        this.setState({ candidates: [...candidates, added] });

        navigation.goBack();
      }
    });

    this.state = { candidates: payload };
  }

  onUpdated = ({
    id, name, surname, avatarUrl
  }) => {
    const { candidates } = this.state;

    const index = candidates.findIndex(v => v.id === id);

    this.setState({
      candidates: [
        ...candidates.slice(0, index),
        {
          id,
          name,
          surname,
          avatarUrl
        },
        ...candidates.slice(index + 1)
      ]
    });
  };

  render() {
    const { navigation } = this.props;
    const { candidates } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={candidates}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('CandidateProfile', { id: item.id, onUpdated: this.onUpdated })
              }
            >
              <View>
                <CandidateRowItem {...item} />
              </View>
            </TouchableWithoutFeedback>
          )}
          keyExtractor={({ id }) => id}
        />
      </View>
    );
  }
}

const fetcher = async () => service.fetchCandidates();

export default withFetching(CandidatesListScreen, LoadingIndicator, fetcher);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
