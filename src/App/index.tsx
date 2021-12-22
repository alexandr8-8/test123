import styled from "styled-components";
import Header from "./Header";
import Main from "./Main";

// 1377px
const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  max-width: 1024px;
`;

const App: React.FC = () => {
  return (
    <AppDiv>
      <Header />
      <Main />
    </AppDiv>
  );
};

export default App;
