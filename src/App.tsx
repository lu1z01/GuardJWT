import { Workspace } from './app/Workspace';
import { Information } from './pages/Information';
export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  return path === '/' ? <Workspace /> : <Information path={path} />;
}
