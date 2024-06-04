import { onSaveCadidate, onGetCandidates } from "../config/helper/candidateHelper";

class CandidateService {
  constructor() {
    this.candidates = [];
    this.nextId = this.candidates.length + 1;
  }

  addCandidate = async ({
    name, surname, email, city, country, avatarUrl
  }) => {
    try {
      await onSaveCadidate(this.nextId, name, surname, email, city, country,avatarUrl);
      const candidate = {
        id: this.nextId,
        name, surname, email, city, country, avatarUrl
      };
      this.candidates.push(candidate); 
      this.nextId += 1; 
      return candidate;
    } catch (error) {
      console.error('Error while add candidates:', error);
      throw error;
    }
  };

  updateCandidate = async ({
    id, name, surname, email, city, country, avatarUrl
  }) => {
    const candidates = onGetCandidates();
    console.log(candidates.find(candidates.id = 1));
  };

  removeCandidate = async (id) => {};

  fetchCandidates = async () => {
    try{
      const candidates = await onGetCandidates();
    return candidates;
    } catch (error) {
      console.error('Error while getting candidates:', error);
      throw error;
    }
  };

  fetchDetails = async id => ({});
}

export default CandidateService;
