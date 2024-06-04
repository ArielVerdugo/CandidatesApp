import { StorageAdapter } from "../adapter/storage-adapter";

export const onSaveCadidate = async (id,name, surname, email, city, country, avatarUrl) => {
  try {
    const lastCandidates = await onGetCandidates();
    const candidates = [...lastCandidates,
    {
      'id': id,
      'name': name,
      'surname': surname,
      'email': email,
      'city': city,
      'country': country,
      'avatarUrl': avatarUrl
    }];
    await StorageAdapter.setItem('candidates', candidates);
  } catch (error) {
    console.error('Error while saving candidate:', error);
    throw error;
  }
}

export const onGetCandidates = async () => {
  try{
    const candidates = await StorageAdapter.getItem('candidates');
    return candidates;
  } catch (error) {
    console.error('Error while getting candidates:', error);
    throw error;
  }
}

export const onEditCadidate = async (key, value) => {
  try {
    await StorageAdapter.setItem(key, value);
    // buscar al candidato a editar, luego que cosa editar
  } catch (error) {
    console.error('Error while saving candidate:', error);
    throw error;
  }
}