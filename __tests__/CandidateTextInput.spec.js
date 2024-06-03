import React from 'react';
import { View, Text, TextInput } from 'react-native';
import TestRenderer from 'react-test-renderer';

import CandidateTextInput from '../components/CandidateTextInput';

describe('CandidateTextInput', () => {
  it('does not render additional views when there are no errors', async () => {
    const testProps = { label: 'username', value: 'test', errors: [] };
    const testRenderer = TestRenderer.create(<CandidateTextInput {...testProps} />);
    const testApp = testRenderer.root;

    const testViews = testApp.findAllByType(View);
    const testTexts = testApp.findAllByType(Text);
    const testTextInputs = testApp.findAllByType(TextInput);

    expect(testViews).toHaveLength(1);
    expect(testTexts).toHaveLength(1);
    expect(testTextInputs).toHaveLength(1);
  });

  it('render list of errors when errors are present', async () => {
    const errors = ['This is an error', 'This is another error', 'This is an error as well'];
    const testProps = { label: 'username', value: 'test', errors };
    const testRenderer = TestRenderer.create(<CandidateTextInput {...testProps} />);
    const testApp = testRenderer.root;

    const testTexts = testApp.findAllByType(Text);

    expect(testTexts).toHaveLength(1 + errors.length);
    const [, ...errorTexts] = testTexts;

    expect(errorTexts.map(v => v.props.children)).toEqual(errors.map(v => `- ${v}`));
  });

  it('rendered errors have unique keys', async () => {
    const errors = ['This is an error', 'This is another error', 'This is an error as well'];
    const testProps = { label: 'username', value: 'test', errors };
    const testRenderer = TestRenderer.create(<CandidateTextInput {...testProps} />);
    const testApp = testRenderer.root;

    const testTexts = testApp.findAllByType(Text);
    const [, ...errorTexts] = testTexts;

    // eslint-disable-next-line no-underscore-dangle
    const errorKeys = errorTexts.map(v => v._fiber.key);
    expect(errorKeys).toEqual(errors);
  });
});
