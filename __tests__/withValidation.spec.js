import React from 'react';
import { View } from 'react-native';
import TestRenderer from 'react-test-renderer';

import Validators from '../model/Validators';
import withValidation from '../components/HOC/withValidation';

const { maximalLength, minimalLength } = Validators;

const TestChildComponent = props => <View {...props} />;

describe('withValidation HOC', () => {
  it('passes validateOnChange as a prop to validate changing input', async () => {
    const TestComponent = withValidation(TestChildComponent, [maximalLength(5), minimalLength(3)]);

    const testRenderer = TestRenderer.create(<TestComponent />);
    const testApp = testRenderer.root;

    const testChildComponent = testApp.findByType(TestChildComponent);

    expect(testChildComponent.props.validateOnChange).toBeDefined();
  });

  it('passes list of errors after validation', async () => {
    const TestComponent = withValidation(TestChildComponent, [maximalLength(5), minimalLength(3)]);
    const onChanged = jest.fn();
    const testRenderer = TestRenderer.create(<TestComponent onChanged={onChanged} />);
    const testApp = testRenderer.root;

    const testChildComponent = testApp.findByType(TestChildComponent);
    const validate = testChildComponent.props.validateOnChange;

    expect(testChildComponent.props.errors).toEqual([]);

    validate('thisIsVeryLong');
    expect(testChildComponent.props.errors).toEqual(['Maximal length is 5']);
    validate('th');
    expect(testChildComponent.props.errors).toEqual(['Minimal length is 3']);
    validate('good');
    expect(testChildComponent.props.errors).toEqual([]);
  });

  it('notifies of changing input along with validation status', async () => {
    const TestComponent = withValidation(TestChildComponent, [maximalLength(5), minimalLength(3)]);
    const onChanged = jest.fn();
    const testRenderer = TestRenderer.create(<TestComponent onChanged={onChanged} />);
    const testApp = testRenderer.root;

    const testChildComponent = testApp.findByType(TestChildComponent);
    const validate = testChildComponent.props.validateOnChange;

    expect(testChildComponent.props.errors).toEqual([]);

    validate('thisIsVeryLong');
    expect(onChanged).toHaveBeenLastCalledWith('thisIsVeryLong', false);
    validate('th');
    expect(onChanged).toHaveBeenLastCalledWith('th', false);
    validate('good');
    expect(onChanged).toHaveBeenLastCalledWith('good', true);
  });
});
