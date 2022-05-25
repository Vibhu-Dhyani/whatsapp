import './App.css';
import { Route } from 'react-router-dom';
import LoginPage from './myComponents/LoginPage/LoginPage';
import ChatPage from './myComponents/ChatPage/ChatPage';
import { Container , Box} from "@mui/material";

function App() {
  return (
    <div  className="App">
      
      <div className="App_topBar"></div>
      <Container className="App_body">
        <Route path="/" component={LoginPage} exact />
        <Route path="/chats" component={ChatPage} />
      </Container>
      
    </div>
  );
}

export default App;
