import styled from 'styled-components/macro';

export const AppStyle = styled.div`
  height: 100vh;
  background-color: ${props => props.theme.black};
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid ${p => p.theme.white};
  }
`;

export const Main = styled.main`
  padding: 2rem;
  display: flex;
  align-items: center;
  height: 100%;
`;
