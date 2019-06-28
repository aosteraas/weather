import React from 'react';
import styled from 'styled-components/macro';
import { WiDaySunny } from 'weather-icons-react';
import { useWeather } from './hooks';
import { Currently } from './Currently';
import { AppStyle, Main } from './styles';

const Button = styled.button`
  color: ${p => p.theme.black};
  background-color: ${p => p.theme.white};
  padding: 1rem;
`;

const App: React.FC = () => {
  const { getWeather, getLocation, weather, error } = useWeather();

  return (
    <AppStyle>
      <header>
        <WiDaySunny size={24} color="#FFF" /> <span>Weather</span>
      </header>
      <Main>
        {weather ? (
          <Currently units={weather.flags.units} currently={weather.currently} />
        ) : (
          <div>
            <Button onClick={getLocation}>Make things happen</Button>
          </div>
        )}
      </Main>
    </AppStyle>
  );
};

export default App;
