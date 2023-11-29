import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const Navbar = () => {

	const {setUser} = useUser();
	const navigate = useNavigate();

	const logout = () => {
		setUser(undefined);
		navigate("/");
	}

	return (
		<nav>
			<h1>Smart Covers</h1>
				<button className="small logout-button" onClick={logout}>Log out</button>
		</nav>
	)

}

export default Navbar;