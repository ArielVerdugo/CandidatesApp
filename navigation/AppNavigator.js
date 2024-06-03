import React from 'react';
import { Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CandidatesListScreen from '../screens/CandidatesListsScreen';
import CandidateProfileScreenWithLoading from '../screens/CandidateProfileScreenWithLoading';
import CandidateProfileInputScreen from '../screens/CandidateProfileInputScreen';

const CandidatesStack = createStackNavigator({
  CandidatesList: {
    screen: props => (
      <CandidatesListScreen {...props} loadingProps={{ text: 'Loading candidates list...' }} />
    ),
    navigationOptions: ({
      navigation: {
        navigate,
        state: { params }
      }
    }) => ({
      title: 'Candidates',
      headerRight: () => <Button onPress={() => navigate('Modal', params)} title="Add" color="#000" />
    })
  },
  CandidateProfile: {
    screen: props => (
      <CandidateProfileScreenWithLoading
        {...props}
        loadingProps={{ text: 'Loading candidate profile...' }}
      />
    ),
    navigationOptions: ({
      navigation: {
        navigate,
        state: { params }
      }
    }) => ({
      title: 'Profile',
      headerRight: () => <Button onPress={() => navigate('Modal', params)} title="Edit" color="#000" />
    })
  }
});

export default createAppContainer(
  createStackNavigator(
    {
      Main: { screen: CandidatesStack },
      Modal: { screen: CandidateProfileInputScreen }
    },
    {
      mode: 'modal',
      headerMode: 'none'
    }
  )
);
