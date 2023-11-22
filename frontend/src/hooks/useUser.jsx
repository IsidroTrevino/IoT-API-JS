import React, {useContext, useState} from 'react';

const UserContext = React.createContext();
export const UserProvider = ({children}) => {
	const [user, setUser] = useState(undefined);

	return (
		<UserContext.Provider value={{user, setUser}}>
			{children}
		</UserContext.Provider>
	);
}

export const useUser = () => {
	const user = useContext(UserContext);
	return user;
}