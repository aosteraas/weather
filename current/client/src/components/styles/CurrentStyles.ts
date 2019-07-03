import styled from 'styled-components/macro';
import { Flex, Box } from 'rebass';

const Summary = styled(Box)`
  min-height: 14rem;
  padding: 3rem;
  height: auto;
  border: 1px solid #fff;
  border-radius: 1rem;

  svg {
    width: 100%;
    height: 100%;
    max-height: 14rem;
  }
  p {
    font-size: 2rem;
    text-align: center;
  }
`;

const Overview = styled(Flex)`
  width: 25rem;
  flex-direction: column;
  align-items: center;
  border: 1px solid #fff;
  border-radius: 1rem;
  background: #fff;
  color: ${p => p.theme.colors.lightBlue};
  margin: 1rem;
  svg {
    height: 3rem;
    width: 3rem;
  }
`;
const Data = styled.div`
  flex: 1;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: right;
  padding-right: 1rem;
`;

const Label = styled.div`
  padding: 1rem;
  width: 100%;
  text-align: center;
`;
export { Summary, Overview, Data, Label };
