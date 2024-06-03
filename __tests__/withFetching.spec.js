import React from "react";
import { View } from "react-native";
import TestRenderer from "react-test-renderer";

import withFetching from "../components/HOC/withFetching";

const TestMainComponent = (props) => <View {...props} />;
const TestLoadingComponent = (props) => <View {...props} />;

const waitForDataToBeLoaded = () => new Promise(setImmediate);
const waitForDuration = (ms) => new Promise((res) => setTimeout(res, ms));

describe("withFetching HOC", () => {
  it("renders loading component while data is loading", async () => {
    const loader = () => waitForDuration(10000);

    const TestComponent = withFetching(
      TestMainComponent,
      TestLoadingComponent,
      loader
    );

    const testRenderer = TestRenderer.create(<TestComponent />);
    const testApp = testRenderer.root;

    const testMainComponents = testApp.findAllByType(TestMainComponent);
    const testLoadingComponents = testApp.findAllByType(TestLoadingComponent);

    expect(testMainComponents).toHaveLength(0);
    expect(testLoadingComponents).toHaveLength(1);
  });

  it("renders main component with loaded data after data is loaded", async () => {
    const dataToLoad = { data: "very important data" };
    const loader = jest.fn(() => Promise.resolve(dataToLoad));

    const TestComponent = withFetching(
      TestMainComponent,
      TestLoadingComponent,
      loader
    );

    const testRenderer = TestRenderer.create(<TestComponent />);
    const testApp = testRenderer.root;

    await waitForDataToBeLoaded();

    const testMainComponents = testApp.findAllByType(TestMainComponent);
    const testLoadingComponents = testApp.findAllByType(TestLoadingComponent);

    expect(testLoadingComponents).toHaveLength(0);
    expect(testMainComponents).toHaveLength(1);
    expect(testMainComponents[0].props.payload).toEqual(dataToLoad);
  });

  it("passes reload prop to allow a child to load the data again", async () => {
    const dataToLoad = { data: "very important data" };
    const loader = jest.fn(() => Promise.resolve(dataToLoad));

    const TestComponent = withFetching(
      TestMainComponent,
      TestLoadingComponent,
      loader
    );

    const testRenderer = TestRenderer.create(<TestComponent />);
    const testApp = testRenderer.root;

    await waitForDataToBeLoaded();

    const testMainComponents = testApp.findAllByType(TestMainComponent);
    await testMainComponents[0].props.reload();

    expect(loader).toHaveBeenCalledTimes(2);
  });
});
