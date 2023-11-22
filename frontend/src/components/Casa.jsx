import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from './Navbar';
import { useUser } from '../hooks/useUser';
import { server } from '../App';

const Casa = () => {

	const {user} = useUser();
	const { idCasa } = useParams();

	const [casa, setCasa] = useState(undefined);
	const [disps, setDisps] = useState(undefined);

	const navigate = useNavigate();

	useEffect(() => {

		const getCasa = async() => {

			const response = await fetch(`http://${server}:3000/api/verCasa/${idCasa}`);
			const body = await response.json();

			setCasa(body[0]);

		}
		getCasa();

		const getDisps = async () => {
			const response = await fetch(`http://${server}:3000/api/verDisps/${idCasa}`);
			const body = await response.json();

			setDisps(body);
		}
		getDisps();

	}, []);

	return (

		<div className="home-container">
			<Navbar />
			<div className="content">
				<Link className="back" to="/home">&lt; Back</Link>
				<h2>Welcome, {user.nombre} {user.apellido}</h2>
				{casa == undefined
					? "Loading..."
					: <>

						<h4>Your devices in {casa.nombreCasa}</h4>
						{disps != undefined
							? <div className="card-grid">

								{disps.map((disp, i) => (
									<div className="card" key={i} onClick={() => navigate(`/disp/${disp.idDisp}`)}>
										{/* <img src="" /> */}
										<div className="card-body">
											<p>{disp.nombreDisp}</p>
											<p>MAC: {disp.macAddress}</p>
										</div>
									</div>
								))}

							</div>
							: <></>
						}
					</>}
			</div>
		</div>

	)

}

export default Casa;