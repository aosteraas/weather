import React from 'react';
import styled from 'styled-components/macro';
import { WiDaySunny } from 'weather-icons-react';
import { useWeather } from './hooks';
import { Currently } from './Currently';
import { Forecast } from './Forecast';
import { AppStyle, Main } from './styles';

const Button = styled.button`
  color: ${p => p.theme.colors.black};
  background-color: ${p => p.theme.colors.white};
  padding: 1rem;
`;

const App: React.FC = () => {
  const { getWeather, getLocation, weather, error } = useWeather();
  const { flags, currently, daily } = weather;

  return (
    <AppStyle>
      <header>
        <WiDaySunny size={24} color="#FFF" /> <span>Weather</span>
      </header>
      <Main>
        {weather ? (
          <>
            <Currently units={flags.units} currently={currently} />
            <Forecast units={flags.units} daily={daily} />
          </>
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
