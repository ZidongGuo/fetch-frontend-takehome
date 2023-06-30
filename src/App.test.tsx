import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import '@testing-library/jest-dom/extend-expect';

// import App from './App';
// import LogInPage from './components/LogInPage';
// import Home from './components/Home';
// import Match from './components/Match';

// jest.mock('./components/LogInPage', () => () => <div>Login page mock</div>);
// jest.mock('./components/Home', () => () => <div>Home page mock</div>);
// jest.mock('./components/Match', () => () => <div>Match page mock</div>);

// describe('App', () => {
//   it('should render LogInPage at "/" route', () => {
//     render(
//       <MemoryRouter initialEntries={['/']}>
//         <App />
//       </MemoryRouter>
//     );
//     expect(screen.getByText('Login page mock')).toBeInTheDocument();
//   });

//   it('should render Home at "/home" route', () => {
//     render(
//       <MemoryRouter initialEntries={['/home']}>
//         <App />
//       </MemoryRouter>
//     );
//     expect(screen.getByText('Home page mock')).toBeInTheDocument();
//   });

//   it('should render Match at "/yourmatch" route', () => {
//     render(
//       <MemoryRouter initialEntries={['/yourmatch']}>
//         <App />
//       </MemoryRouter>
//     );
//     expect(screen.getByText('Match page mock')).toBeInTheDocument();
//   });
// });