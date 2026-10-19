import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

function AppContainer() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default AppContainer;
