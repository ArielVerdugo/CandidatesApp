import React from 'react';
import renderer from 'react-test-renderer';
import CandidateProfileScreen from '../screens/CandidateProfileScreen';

describe('CandidateProfileScreen', () => {
  it('renders correctly', () => {
    const navigation = { setParams: jest.fn() };
    const payload = {
      name: 'Jan',
      email: 'jk@m.com',
      surname: 'Kowalski',
      country: 'Poland',
      city: 'Poznan',
      avatarUrl: 'avatar_url'
    };

    const tree = renderer.create(<CandidateProfileScreen {...{ navigation, payload }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
