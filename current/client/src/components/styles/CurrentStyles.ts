import styled from 'styled-components/macro';
import { Flex, Box } from 'rebass';

const Summary = styled(Box)`
  min-height: 14rem;
  padding: 3rem;
  height: auto;
  border: 1px solid #dfdfdf;
  border-radius: 15px;

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
  /* height: 100px; */
  align-items: center;
  border: 1px solid #dfdfdf;
  border-radius: 15px;
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

export { Summary, Overview, Data };
