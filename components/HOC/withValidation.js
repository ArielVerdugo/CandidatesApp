import React from 'react';
import {
    View, Text
  } from 'react-native';

const withValidation = (Wrapped, validators) => {
   

    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                value: props.value || '',
                isValid: false,
                validationMessagesError: [],
            };
        }

        validate = (value) => {
            let resultsValidations = [];
            let validationMessagesError = [];
            validators.forEach((element) => resultsValidations.push(element(value)));
            let isValid = !resultsValidations.map(element => element.isValid ? true : false).includes(false);

            if(!isValid){
                resultsValidations.forEach((element) => (element.message !== undefined ) && validationMessagesError.push(element.message))
                this.setState({ value, isValid, validationMessagesError});
                this.props.onChanged(value, isValid,validationMessagesError);
            } else{
                validationMessagesError = ''
                this.setState({ value, isValid,validationMessagesError});
                this.props.onChanged(value, isValid, validationMessagesError);
            }
        };

        render() {
            console.log(this.state);
            return (
                <>
                    <Wrapped
                    {...this.props}
                    value={this.state.value}
                    validateOnChange={this.validate}
                    />
                    <Text>{this.state.validationMessagesError}</Text>

                </>
                
            );
        }
    };
};

export default withValidation;
