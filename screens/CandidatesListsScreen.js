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

    const { navigation, data } = this.props;

    navigation.setParams({
      onSubmited: async (candidate) => {
        try {
          const added = await service.addCandidate(candidate);
          const { candidates } = this.state;
          this.setState({ candidates: [...candidates, added] });
          navigation.goBack();
        } catch (error) {
          console.error('Error while sending candidate:', error);
          throw error;
        }
      }
    });

    this.state = { candidates: data || [] };
    this.onUpdated = this.onUpdated.bind(this);

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
              onPress={() => navigation.navigate('CandidateProfile', {
                id: item.id,
                name: item.name,
                surname: item.surname,
                email: item.email,
                city: item.city,
                country: item.country,
                avatarUrl: item.avatarUrl,
                onUpdated: this.onUpdated
              }
              )
              }
            >
              <View>
                <CandidateRowItem {...item} />
              </View>
            </TouchableWithoutFeedback>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  }
}

const fetcher = async () => service.fetchCandidates();

export const CandidateFetchingScreen = withFetching(CandidatesListScreen, LoadingIndicator, fetcher);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
