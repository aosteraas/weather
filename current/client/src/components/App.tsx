import React from 'react';
import styled from 'styled-components/macro';

const AppWrapper = styled.div`
  height: 100vh;
  background-color: ${props => props.theme.black};
`;

const App: React.FC = () => {
  return (
    <AppWrapper>
      <header className="App-header">
        <p>Weather Goes Here</p>
      </header>
    </AppWrapper>
  );
};

export default App;
