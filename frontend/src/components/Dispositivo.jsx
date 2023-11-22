import { Link, useParams } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import { server } from '../App';

const Dispositivo = () => {

	const { user } = useUser();
	const { idDisp } = useParams();

	const [disp, setDisp] = useState(undefined);
	const [horarios, setHorarios] = useState(undefined);

	useEffect(() => {

		const getDisp = async () => {

			const response = await fetch(`http://${server}:3000/api/verDisp/${idDisp}`);
			const body = await response.json();
			setDisp(body[0]);

		}
		getDisp();

		const getHorarios = async () => {

			const response = await fetch(`http://${server}:3000/api/verHorarios/${idDisp}`);
			const body = await response.json();
			setHorarios(body);

		}
		getHorarios();

	}, []);

	return (
		
		<div className="home-container">
			<Navbar />
			<div className="content">
				{disp == undefined
					? "Loading..."	
					: <>
					
					<Link className="back" to={`/casa/${disp.idCasa}`}>&lt; Back</Link>

					<h2>Welcome, {user.nombre} {user.apellido}</h2>

					<div className="info-disp">
						<div className="info-left">
							<h3>{disp.nombreDisp}</h3>
						</div>
						<div className="info-right">
							<h3>Schedule</h3>
							<div className="calendario">
								<div className="marcas">
									<div className="marca">0:00</div>
									<div className="marca">1:00</div>
									<div className="marca">2:00</div>
									<div className="marca">3:00</div>
									<div className="marca">4:00</div>
									<div className="marca">5:00</div>
									<div className="marca">6:00</div>
									<div className="marca">7:00</div>
									<div className="marca">8:00</div>
									<div className="marca">9:00</div>
									<div className="marca">10:00</div>
									<div className="marca">11:00</div>
									<div className="marca">12:00</div>
									<div className="marca">13:00</div>
									<div className="marca">14:00</div>
									<div className="marca">15:00</div>
									<div className="marca">16:00</div>
									<div className="marca">17:00</div>
									<div className="marca">18:00</div>
									<div className="marca">19:00</div>
									<div className="marca">20:00</div>
									<div className="marca">21:00</div>
									<div className="marca">22:00</div>
									<div className="marca">23:00</div>
									<div className="marca"></div>
								</div>
								<div className="days">
									<div className="day">
										<h4>Monday</h4>
										<div className="hora" style={{height: '57.6px', marginTop: '57.6px'}}></div>
										<div className="hora" style={{height: '57.6px', marginTop: '57.6px'}}></div>
									</div>
									<div className="day">
										<h4>Tuesday</h4>
									</div>
									<div className="day">
										<h4>Wednesday</h4>
									</div>
									<div className="day">
										<h4>Thursday</h4>
									</div>
									<div className="day">
										<h4>Friday</h4>
									</div>
									<div className="day">
										<h4>Saturday</h4>
									</div>
									<div className="day">
										<h4>Sunday</h4>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					
				</>}
			</div>
		</div>

	);

}

export default Dispositivo;