import { Route, Routes } from 'react-router-dom';
import { routes } from './helpers';

function App() {
  const routeElements = routes.map(route => {
    const { id, url, component } = route;
    return <Route key={id} path={url} element={component} />;
  });
  return (
    <>
      <Routes>{routeElements}</Routes>
    </>
  );
}

export default App;
