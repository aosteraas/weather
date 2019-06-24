import React from 'react';
import styled from 'styled-components/macro';
import { WiDaySunny } from 'weather-icons-react';

const AppWrapper = styled.div`
  height: 100vh;
  background-color: ${props => props.theme.black};
`;
const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Button = styled.button`
  color: ${p => p.theme.black};
  background-color: ${p => p.theme.white};
  padding: 1rem;
`;
const lat = -37.7692497;
const lon = 144.9506981;
const location = { lat, lon };

const App: React.FC = () => {
  const getWeather = async () => {
    //
  };

  return (
    <AppWrapper>
      <header className="App-header">
        <WiDaySunny size={24} color="#FFF" />{' '}
      </header>
      <Main>
        <div>
          <Button onClick={() => getWeather()}>Make things happen</Button>
        </div>
      </Main>
    </AppWrapper>
  );
};

export default App;
