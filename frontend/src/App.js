import {Routes, Route} from 'react-router-dom';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import RequireLogin from './components/RequireLogin';
import Casa from './components/Casa';
import Dispositivo from './components/Dispositivo';

export const server = "localhost";

function App() {
  return (
    <div className="App">
		<Routes>
			<Route path="/" element={<LogIn />}/>
			<Route path="/signup" element={<SignUp />}/>
			<Route path="/" element={<RequireLogin />}>
				<Route path="/home" element={<Home />} />
				<Route path="/casa/:idCasa" element={<Casa />} />
				<Route path="/disp/:idDisp" element={<Dispositivo />} />
			</Route>
		</Routes>
    </div>
  );
}

export default App;
