import React from 'react';
import {
  View, TouchableOpacity, Text, ScrollView, StyleSheet
} from 'react-native';

import CandidateAvatar from '../components/CandidateAvatar';
import CandidateTextInput from '../components/CandidateTextInput';

import Validators from '../model/Validators';
import withValidation from '../components/HOC/withValidation';

import { nextAvatar } from '../model/DelayedCandidateService';

const { minimalLength, maximalLength, correctEmail } = Validators;

const NameInput = withValidation(CandidateTextInput, [minimalLength(3), maximalLength(20)]);
const SurnameInput = withValidation(CandidateTextInput, [minimalLength(3), maximalLength(20)]);
const EmailInput = withValidation(CandidateTextInput, [
  minimalLength(3),
  correctEmail,
  maximalLength(20)
]);
const CityInput = withValidation(CandidateTextInput, [minimalLength(3), maximalLength(20)]);
const CountryInput = withValidation(CandidateTextInput, [minimalLength(3), maximalLength(20)]);

class CandidateProfileInputScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      navigation: {
        state: {
          params: {
            name, surname, email, city, country, avatarUrl
          } = {}
        }
      }
    } = this.props;

    this.state = {
      name: name || '',
      surname: surname || '',
      email: email || '',
      city: city || '',
      country: country || '',
      avatarUrl: avatarUrl || nextAvatar(),
      isNameValid: Boolean(name),
      isSurnameValid: Boolean(surname),
      isEmailValid: Boolean(email),
      isCityValid: Boolean(city),
      isCountryValid: Boolean(country),
      isAllInputsValid: false
    };

    this.onNameChanged = this.onNameChanged.bind(this);
    this.onSurnameChanged = this.onSurnameChanged.bind(this);
    this.onEmailChanged = this.onEmailChanged.bind(this);
    this.onCityChanged = this.onCityChanged.bind(this);
    this.onCountryChanged = this.onCountryChanged.bind(this);
    this.onSubmitPressed = this.onSubmitPressed.bind(this);
    this.onValidate = this.onValidate.bind(this);

  }

  onNameChanged = (value, isValid, messages) => {
    this.setState({ name: value, isNameValid: isValid, messages: messages });
  };

  onSurnameChanged = (value, isValid, messages) => {
    this.setState({ surname: value, isSurnameValid: isValid, messages: messages });
  };

  onEmailChanged = (value, isValid, messages) => {
    this.setState({ email: value, isEmailValid: isValid , messages: messages});
  };

  onCityChanged = (value, isValid, messages) => {
    this.setState({ city: value, isCityValid: isValid, messages: messages });
  };

  onCountryChanged = (value, isValid, messages) => {
    this.setState({ country: value, isCountryValid: isValid, messages: messages });
  };

  onValidate = () => {
    const {
      isCountryValid,
      isCityValid,
      isSurnameValid,
      isEmailValid,
      isNameValid,
      ...candidate
    } = this.state;


    const isValid = [isCountryValid, isCityValid, isSurnameValid, isEmailValid, isNameValid].reduce(
      (p, c) => p && c,
      true
    );

    return isValid;
  };

  onSubmitPressed = () => {
    const {
      isCountryValid,
      isCityValid,
      isSurnameValid,
      isEmailValid,
      isNameValid,
      ...candidate
    } = this.state;

    const {
      navigation: {
        goBack,
        state: {
          params: { onSubmited }
        }
      }
    } = this.props;

    const isValid = [isCountryValid, isCityValid, isSurnameValid, isEmailValid, isNameValid].reduce(
      (p, c) => p && c,
      true
    );

    if (isValid) {
      this.setState.isAllInputsValid = true;
      onSubmited(candidate);
      goBack();
    }
  };

  render() {
    const {
      name, surname, email, city, country, avatarUrl
    } = this.state;

    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <CandidateAvatar style={styles.avatar} avatarUrl={avatarUrl} />
        </View>
        <ScrollView>
          <NameInput label="Name" value={name} onChanged={this.onNameChanged} />
          <SurnameInput label="Surname" value={surname} onChanged={this.onSurnameChanged} />
          <EmailInput label="Email" value={email} onChanged={this.onEmailChanged} />
          <CityInput label="City" value={city} onChanged={this.onCityChanged} />
          <CountryInput label="Country" value={country} onChanged={this.onCountryChanged} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity disabled={this.state.isAllInputsValid} style={styles.submitButton} onPress={this.onSubmitPressed}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default CandidateProfileInputScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    marginTop: 30
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
  },
  submitButton: {
    width: 200,
    height: 40,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16
  },
  cancelButtonText: {
    marginTop: 12,
    color: '#000',
    fontSize: 14
  },
  buttonContainer: {
    marginTop: 12,
    alignItems: 'center'
  }
});
