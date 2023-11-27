import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser'

import { Outlet } from 'react-router-dom';

const RequireLogin = () => {

	const {user, setUser} = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if(user == undefined) {
			navigate("/");
		}
	}, []);

	return (
		<>
			{user && <Outlet />}
		</>
	)

}

export default RequireLogin;