**lesson 1: getting started**

- testing frameworks consist of tools for test creation and execution
- popular testing frameworks: jest, vitest, and mocha
- vitest is favored for its ecmascript modules and ts support
- react testing library is recommended for testing react components (provides a user-centric approach to testing)
- jsdom is a tool used to simulate a web browser in a node.js environment and facilitates the writing/execution of web application tests
- happydom is an alternative to jsdom (offers faster performance, but lacks some browser apis)
- @testing-library/jest-dom is a node package that includes matchers for writing assertions

**lesson 2: testing react components**

- 2 major concerns when testing react components: 1)how they render 2)how they respond to user action
  1. rendering
  - components should be verified they render correctly under various conditions
  - if component has props, different props should be passed to verify they're rendered correctly
  2. user action
  - if component handles user events, those events should be simulated and checked to see if they react as expected
- tests should be written in such a way that they are maintainable, robust, and trustworthy
- to ensure robustness of tests, test the **_behavior_** (what app does), not the **_implementation_** (how it's done)
  - this ensures tests remain valid even when the implementation changes, as long as the behavior stays consistent
  - for example, hooks, context, and reducers are all implementation details. these things may change in the future and break tests in place
  - an exception to this rule would be if they're used by several components and have complex logic. in this case, it would be best to unit test those pieces in isolation. for the most part, they should be tested as part of testing the components (**_integration testing_**)
- as a general rule of thumb: integration => unit => e2e (from most to least often used)
  - integration tests tend to be slower than unit tests because it tests several units together, but it provides better confidence in application sturdiness. also, these tests are less likely to break if code is refactored (as long as the end result stays the same)
- styles should be avoided testing bc of their fragility and minimal value delivery (doesn't tell us if the app looks good)
