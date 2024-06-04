import CandidateService from './CandidateService';

const service = new CandidateService();
const nextAvatar = () => `https://i.pravatar.cc/300?img=${service.nextId}`;

const fetchDelay = 2000;
const updateDelay = 500;

const delay = timeout => new Promise((resolve) => {
  setTimeout(resolve, timeout);
});

const addCandidate = async (params) => {
  await delay(updateDelay);
  try {
    const candidate = await service.addCandidate(params);
    return candidate;
  } catch (error) {
    console.error('Error in DelayedCandidateService:', error);
  }
};

const updateCandidate = async (params) => {
  await delay(updateDelay);
  try {
    const candidates = service.updateCandidate(params);
    return candidates;
  } catch (error) {
    console.error('Error in DelayedCandidateService:', error);
  }
};

const removeCandidate = async (params) => {
  await delay(updateDelay);
  return service.removeCandidate(params);
};

const fetchCandidates = async () => {
  await delay(updateDelay);
  try {
    const candidates = service.fetchCandidates();
    return candidates;
  } catch (error) {
    console.error('Error in DelayedCandidateService:', error);
  }
};

const fetchDetails = async (params) => {
  await delay(fetchDelay);
  return service.fetchDetails(params);
};

export { nextAvatar };

export default {
  updateCandidate,
  fetchCandidates,
  fetchDetails,
  addCandidate,
  removeCandidate
};
