import styled from 'styled-components/macro';

export const AppStyle = styled.div`
  background-color: ${props => props.theme.colors.black};
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid ${p => p.theme.colors.white};
  }
`;

export const Main = styled.main`
  background-image: linear-gradient(
    180deg,
    ${p => p.theme.colors.blue} 0%,
    ${p => p.theme.colors.lightBlue} 74%
  );
`;
