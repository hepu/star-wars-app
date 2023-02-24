# Star Wars App

ReactJS app that allows the user to sign in and get all the relevant information from the Star Wars API

## Getting Started

### Requirements

- `node >16`
- `npm` or `yarn`

### Installation

- `yarn install`

### Running

- To run the web server, run: `yarn start`

## About the code

This is a ReactJS application that uses `react-router` to navigate between pages.
API calls are done using `fetch` and a small lib that allows the routes to be created beforehand.
Querying the API its done by implementing `react-query` on all the views.

## Things to improve

- API errors displaying
- Implement Reset password
- Custom UI to make it look unique
- Refresh token before the 1 hour expiration