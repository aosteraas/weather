import React from 'react';
import styled from 'styled-components/macro';
import { WiDaySunny } from 'weather-icons-react';
import { useWeather } from './hooks';
import { Currently } from './Currently';
const AppWrapper = styled.div`
  height: 100vh;
  background-color: ${props => props.theme.black};
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
  }
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

const App: React.FC = () => {
  const { getWeather, getLocation, weather, error } = useWeather();

  return (
    <AppWrapper>
      <header>
        <WiDaySunny size={24} color="#FFF" /> <span>Weather</span>
      </header>
      <Main>
        {weather ? (
          <Currently currently={weather.currently} />
        ) : (
          <div>
            <Button onClick={getLocation}>Make things happen</Button>
          </div>
        )}
      </Main>
    </AppWrapper>
  );
};

export default App;
