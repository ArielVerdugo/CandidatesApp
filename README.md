# Human Resources Companion Application

## Introduction

You are working for an IT company that hires people around the globe. Your company has been recently recognized as the one offering the best work conditions among IT leaders. This had a huge impact on the number of job applications you have been receiving. One of your colleagues has been asked to create an application for the HR department to help them track the candidates’ applications. You know your colleague very well, so you have not been surprised when he recently left the company to pursue a career in stand-up comedy. Unfortunately, he did not finish the application, so you have been asked to take over this task. Knowing your colleague, he might have left some surprises for you in the code...

## Problem Statement

1. In order to complete this task, debug or write additional code to ensure that all unit tests pass.

2. Pay attention to any runtime warnings and try to fix them, if they occur.

3. Below, there is a list of requirements that have to be met by the application. Make sure all of them are implemented and are working according to the specification.

4. Check the Hints section for additional insight.

## Requirements

1. The application is designed to be super secure, especially for protecting personal data of the candidates. Therefore, the data should only be stored in memory, separately for each HR employee. There is no back end that would gather all the personal data.
2. The first screen should contain a list of candidates with their avatars and full names displayed.
3. From this screen, it should be possible to go to the screen for adding new candidates by clicking on the right navigation button.
4. Each of the form fields should be validated and if any errors occur, a list of those errors should be displayed under the corresponding input field.
5. It should not be possible to submit a form if any of the fields is invalid.
6. Once the form is submitted, a new candidate should be added to the list and the screen with the list of candidates should open.
7. Clicking on a specific row on the list should open a screen presenting more details concerning a corresponding candidate.
8. From this screen, it should be possible to go to the screen for editing the candidate’s details by clicking on the right navigation button.
9. This screen should look and behave just like the screen for adding candidates, only this time all input fields should be prefilled with candidate's details.
10. Submitting the form should update the candidate’s details and the user should get back to the screen with the candidate’s details.

## Hints

1. Finish the implementation of `CandidateService` under `model/CandidateService.js`. This should perform standard CRUD operations on the candidates.
2. Finish the `withValidation` HOC located in `components/withValidation.js`. This component should take a Wrapped component and an array of validators and create a component with `validateOnChange` function passed down as a prop. This function should validate the received values using all of the validators (check `model/Validators.js` as an example) and pass down a list of encountered errors to the Wrapped component. The new component should also accept the `onChanged` prop that would be used to notify the parent about the changed value along with its current validation status.
3. Finish the `withFetching` HOC located in `components/withFetching.js`. This component should take the Wrapped component, the Loading component and the asynchronous function responsible for fetching the data. Based on those three parameters, it should create a component that would fetch the data after mounting and passing it down to the Wrapped component as the `payload` prop. It should also provide a way for the wrapped component to reload the data by passing a function via the `reload` prop. While the data is fetched, it should display the Loading component. It should also allow for specifying props for the Loading component by passing them via props as `loadingProps`. The `loadingProps` prop _should not_ be passed down to the Wrapped component.
4. The component located under `components/CandidateTextInput.js` should render the errors passed as a prop. For the purpose of this task, you can assume that errors returned by validators are and always will be unique among them.
5. There is a snapshot test for `/screens/CandidateProfileScreen.js` which is currently failing. Implement the `render` function of the components located under `/components/CandidateProfileSection.js` and `/components/CandidateProfileSectionEntry.js` to make this test pass.

## Setup

In order to run the project in a local environment, you need to download the project and run `npm install` to fetch and install all the dependencies. Then, you will be able to use the following commands:

- Run for iOS - `npm run ios`,
- Run for Android - `npm run android`,
- Run tests - `npm run test`.
