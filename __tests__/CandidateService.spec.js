import CandidateService from '../model/CandidateService';

describe('Candidate Service', () => {
  it('initially has no candidates', async () => {
    const service = new CandidateService();

    const candidates = await service.fetchCandidates();

    expect(candidates).toHaveLength(0);
  });

  it('allows to add new candidate and returns it in response', async () => {
    const service = new CandidateService();

    const firstCandidate = {
      name: 'Jan',
      surname: 'Kowalski',
      email: 'jan.kowalski@gmail.com',
      avatarUrl: 'avatar_url_1',
      country: 'Poland',
      city: 'Poznan'
    };

    const secondCandidate = {
      name: 'Adam',
      surname: 'Nowak',
      email: 'adam.nowak@gmail.com',
      avatarUrl: 'avatar_url_2',
      country: 'Poland',
      city: 'Warsaw'
    };

    const firstAddedCandidate = await service.addCandidate(firstCandidate);
    const candidatesAfterFirstAddition = await service.fetchCandidates();

    const secondAddedCandidate = await service.addCandidate(secondCandidate);
    const candidatesAfterSecondAddition = await service.fetchCandidates();

    expect(firstAddedCandidate).toEqual({ id: '1', ...firstCandidate });
    expect(secondAddedCandidate).toEqual({ id: '2', ...secondCandidate });
    expect(candidatesAfterFirstAddition).toEqual([
      {
        name: 'Jan',
        surname: 'Kowalski',
        id: '1',
        avatarUrl: 'avatar_url_1'
      }
    ]);

    expect(candidatesAfterSecondAddition).toEqual([
      {
        name: 'Jan',
        surname: 'Kowalski',
        id: '1',
        avatarUrl: 'avatar_url_1'
      },
      {
        name: 'Adam',
        surname: 'Nowak',
        avatarUrl: 'avatar_url_2',
        id: '2'
      }
    ]);
  });

  it('allows to update candidate and returns it in response', async () => {
    const service = new CandidateService();

    const firstCandidate = {
      name: 'Jan',
      surname: 'Kowalski',
      email: 'jan.kowalski@gmail.com',
      avatarUrl: 'avatar_url_1',
      country: 'Poland',
      city: 'Poznan'
    };

    const secondCandidate = {
      name: 'Adam',
      surname: 'Nowak',
      email: 'adam.nowak@gmail.com',
      avatarUrl: 'avatar_url_2',
      country: 'Poland',
      city: 'Warsaw'
    };

    const secondCandidateWithUpdatedData = {
      id: '2',
      name: 'Adamus',
      surname: 'Nowakus',
      email: 'adamus.nowakus@gmail.com',
      avatarUrl: 'avatar_url_3',
      country: 'France',
      city: 'Paris'
    };

    await service.addCandidate(firstCandidate);
    await service.addCandidate(secondCandidate);
    const updatedSecondCandidate = await service.updateCandidate(secondCandidateWithUpdatedData);
    const candidatesAfterUpdate = await service.fetchCandidates();

    expect(updatedSecondCandidate).toEqual({ ...secondCandidateWithUpdatedData });

    expect(candidatesAfterUpdate).toEqual([
      {
        name: 'Jan',
        surname: 'Kowalski',
        id: '1',
        avatarUrl: 'avatar_url_1'
      },
      {
        id: '2',
        name: 'Adamus',
        surname: 'Nowakus',
        avatarUrl: 'avatar_url_3'
      }
    ]);
  });

  it('allows to fetch candidate details', async () => {
    const service = new CandidateService();

    const firstCandidate = {
      name: 'Jan',
      surname: 'Kowalski',
      email: 'jan.kowalski@gmail.com',
      avatarUrl: 'avatar_url_1',
      country: 'Poland',
      city: 'Poznan'
    };

    const secondCandidate = {
      name: 'Adam',
      surname: 'Nowak',
      email: 'adam.nowak@gmail.com',
      avatarUrl: 'avatar_url_2',
      country: 'Poland',
      city: 'Warsaw'
    };

    await service.addCandidate(firstCandidate);
    await service.addCandidate(secondCandidate);

    const firstCandidateDetails = await service.fetchDetails('1');
    const secondCandidateDetails = await service.fetchDetails('2');

    expect(firstCandidateDetails).toEqual({ id: '1', ...firstCandidate });
    expect(secondCandidateDetails).toEqual({ id: '2', ...secondCandidate });
  });

  it('allows to remove candidates', async () => {
    const service = new CandidateService();

    const firstCandidate = {
      name: 'Jan',
      surname: 'Kowalski',
      email: 'jan.kowalski@gmail.com',
      avatarUrl: 'avatar_url_1',
      country: 'Poland',
      city: 'Poznan'
    };

    const secondCandidate = {
      name: 'Adam',
      surname: 'Nowak',
      email: 'adam.nowak@gmail.com',
      avatarUrl: 'avatar_url_2',
      country: 'Poland',
      city: 'Warsaw'
    };

    await service.addCandidate(firstCandidate);
    await service.addCandidate(secondCandidate);

    await service.removeCandidate('1');
    const candidatesAfterFirstRemoval = await service.fetchCandidates();
    await service.removeCandidate('2');
    const candidatesAfterSecondRemoval = await service.fetchCandidates();

    expect(candidatesAfterFirstRemoval).toEqual([
      {
        id: '2',
        name: 'Adam',
        surname: 'Nowak',
        avatarUrl: 'avatar_url_2'
      }
    ]);

    expect(candidatesAfterSecondRemoval).toEqual([]);
  });
});
