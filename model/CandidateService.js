class CandidateService {
  constructor() {
    this.candidates = [];
    this.nextId = this.candidates.length + 1;
  }

  addCandidate = async ({
    name, surname, email, city, country, avatarUrl
  }) => {};

  updateCandidate = async ({
    id, name, surname, email, city, country, avatarUrl
  }) => {};

  removeCandidate = async (id) => {};

  fetchCandidates = async () => [];

  fetchDetails = async id => ({});
}

export default CandidateService;
