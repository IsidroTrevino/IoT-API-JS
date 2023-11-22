import { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';
import Navbar from './Navbar';
import { server } from '../App';
import { useNavigate } from 'react-router-dom';

const Home = () => {

	const {user} = useUser();
	const [casas, setCasas] = useState(undefined);

	const navigate = useNavigate();

	useEffect(() => {

		const getCasas = async () => {
			try {
				const response = await fetch(`http://${server}:3000/api/verCasas/${user.idUsuario}`);
				const body = await response.json();
				setCasas(body);
			} catch (error) {
				setCasas([]);
			}	
		}
		getCasas();


	}, []);

	return (
		<div className="home-container">
			<Navbar />
			<div className="content">
				<h2>Welcome, {user.nombre} {user.apellido}</h2>
				<h4>Your houses</h4>
				{casas == undefined
					? "Loading..."
					: <>
					
					<div className="card-grid">
						{casas.map((casa, i) => (
							<div key={i} className="card" onClick={() => navigate(`/casa/${casa.idCasa}`)}>
								<img src={`images/house${casa.idCasa % 6}.jpg`} />
								<div className='card-body'>
									<p>{casa.nombreCasa}</p>
									<p>WIFI: {casa.nombreRed}</p>
								</div>
							</div>
						))}
						
					</div>

				</>}
			</div>
		</div>
	)
}

export default Home;