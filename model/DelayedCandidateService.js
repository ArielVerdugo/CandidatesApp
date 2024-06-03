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
  return service.addCandidate(params);
};

const updateCandidate = async (params) => {
  await delay(updateDelay);
  return service.updateCandidate(params);
};

const removeCandidate = async (params) => {
  await delay(updateDelay);
  return service.removeCandidate(params);
};

const fetchCandidates = async () => {
  await delay(fetchDelay);
  return service.fetchCandidates();
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
