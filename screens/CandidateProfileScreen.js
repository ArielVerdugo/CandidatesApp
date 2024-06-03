import React from 'react';
import { View, StyleSheet } from 'react-native';

import service from '../model/DelayedCandidateService';

import CandidateAvatar from '../components/CandidateAvatar';
import CandidateProfileSection from '../components/CandidateProfileSection';
import CandidateProfileSectionEntry from '../components/CandidateProfileSectionEntry';

export default class CandidateProfileScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    const { navigation, payload } = this.props;

    navigation.setParams({
      ...payload,
      onSubmited: async (candidate) => {
        const {
          payload: { id },
          navigation: {
            state: {
              params: { onUpdated }
            }
          }
        } = this.props;

        const updated = await service.updateCandidate({ id, ...candidate });
        navigation.setParams({ ...updated });
        this.setState({ ...updated });
        onUpdated(updated);
      }
    });

    this.state = { ...payload };
  }

  render() {
    const {
      name, surname, email, city, country, avatarUrl
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <CandidateAvatar style={styles.avatar} avatarUrl={avatarUrl} />
        </View>

        <CandidateProfileSection title="Personal">
          <CandidateProfileSectionEntry title="Name" info={name} />
          <CandidateProfileSectionEntry title="Surname" info={surname} />
        </CandidateProfileSection>
        <CandidateProfileSection title="Contact">
          <CandidateProfileSectionEntry title="Email" info={email} />
          <CandidateProfileSectionEntry title="City" info={city} />
          <CandidateProfileSectionEntry title="Country" info={country} />
        </CandidateProfileSection>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    marginTop: 10
  },
  avatar: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: '#34495e'
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20
  }
});
