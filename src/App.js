import { Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';
import GlobalStyles from '@styles/globalStyle';

const Home = loadable(() => import('@pages/Home'));
const Login = loadable(() => import('@pages/Login'));
const Product = loadable(() => import('@pages/Product'));
const Signup = loadable(() => import('@pages/Signup'));

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <GlobalStyles />
    </>
  );
};

export default App;
