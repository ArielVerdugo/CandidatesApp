import service from '../model/DelayedCandidateService';
import withFetching from '../components/HOC/withFetching';

import LoadingIndicator from '../components/LoadingIndicator';

import CandidateProfileScreen from './CandidateProfileScreen';

const fetcher = async ({
  navigation: {
    state: {
      params: { id }
    }
  }
}) => service.fetchDetails(id);

export default withFetching(CandidateProfileScreen, LoadingIndicator, fetcher);
