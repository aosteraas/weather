import styled from 'styled-components/macro';

const CurrentStyles = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 27rem;
`;
const Summary = styled.div`
  min-height: 14rem;
  padding: 3rem;
  height: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #dfdfdf;
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

const Overview = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  border-bottom: 1px solid #dfdfdf;
  margin-top: 0.5rem;
  svg {
    height: 2.5rem;
    width: 2.5rem;
  }
`;
const Data = styled.div`
  flex: 1;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: right;
  color: ${p => p.theme.white};
  background: ${p => p.theme.black};
  padding-right: 1rem;
`;
const Overviews = styled.section`
  display: flex;
  flex-wrap: wrap;
  ${Overview}:nth-child(odd) {
    border-right: 1px solid #dfdfdf;
  }
`;

export { CurrentStyles, Summary, Overview, Data, Overviews };
