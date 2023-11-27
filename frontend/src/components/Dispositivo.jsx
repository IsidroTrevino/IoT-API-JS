import { Link, useParams } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import { server } from '../App';

import EditHorario from './EditHorario';
import Registros from './Registros';

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

	const [modalActive, setModalActive] = useState(false);
	const [modalInfo, setModalInfo] = useState({});

	const closeModal = () => {
		setModalActive(false); 
		setModalInfo({});
	};

	const newSchedule = () => {
		const hr = {
			horaInicio: '08:00:00',
			horaFinal: '10:00:00',
			idHorario: horarios.length + 1,
			diaSemana: 0,
			accion: -1
		}
		const i = horarios.length;
		setModalInfo({
			title: 'New Schedule Block',
			content: <EditHorario idDisp={idDisp} mode="NEW" hr={hr} i={i} back={closeModal} horarios={horarios} setHorarios={setHorarios}/>
		})
		setModalActive(true);
	}

	const editSchedule = (hr, i) => {
		setModalInfo({
			title: 'Schedule Info',
			content: <EditHorario mode="EDIT" hr={hr} i={i} back={clickHora} horarios={horarios} setHorarios={setHorarios}/>
		})
	}

	const clickHora = (hr, i) => {

		const weekday = (day) => {
			switch(day) {
				case 0: return "Monday";
				case 1: return "Tuesday";
				case 2: return "Wednesday";
				case 3: return "Thursday";
				case 4: return "Friday";
				case 5: return "Saturday";
				case 6: return "Sunday";
			}
		}

		const action = (val) => {
			switch(val) {
				case 0: return "Close";
				case 1: return "Open";
				case 2: return "Half closed";
				case 3: return "1/4 closed";
				case 4: return "3/4 closed";
			}
		}

		const deleteHorario = async () => {

			const response = await fetch(`http://${server}:3000/api/eliminarHorario`, {
				method: "PUT",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					idHorario: hr.idHorario
				})
			});

			horarios.splice(i, 1);
			setHorarios(horarios);
			setModalActive(false);
		}

		setModalInfo({
			title: 'Schedule Info',
			content: <>
				<p>{weekday(hr.diaSemana)}</p>
				<p>Start Time: {hr.horaInicio.substr(0,5)}</p>
				<p>End Time: {hr.horaFinal.substr(0,5)}</p>
				<p>Action: {action(hr.accion)}</p>
				<br />
				<div className="button-group">
					<button onClick={() => editSchedule(hr,i)}>Edit</button>
					<button onClick={deleteHorario} className="red">Delete</button>
				</div>
			</>
		})
		setModalActive(true);
	}

	const blockHora = (hr, i) => {
		let horaIni = Number(hr.horaInicio.substr(0,2));
		let minIni = Number(hr.horaInicio.substr(3,2));
		let minsIni = horaIni * 60 + minIni;

		let horaFin = Number(hr.horaFinal.substr(0,2));
		let minFin = Number(hr.horaFinal.substr(3,2));
		let minsFin = horaFin * 60 + minFin;

		const colors = [
			"#ff99b7",
			"#aec3ff",
			"#c6b9df",
			"#d0ffa1",
			"#F5AD8C",
		];

		const backgroundColor = colors[hr.accion] + "CC";

		if(minsFin >= minsIni) {
			return <div key={i} className="hora" style={{
					height: (15/60 * (minsFin - minsIni)) + 'px',
					marginTop: (15/60 * (minsIni)) + 'px',
					backgroundColor
				}}
				onClick={() => clickHora(hr, i)}
			></div>
		} else {
			return <>
				<div key={i} className="hora" style={{
					height: (15/60 * minsFin) + 'px',
					marginTop: '0px',
					backgroundColor,
					borderRadius: '0 0 5px 5px'
				}}
				onClick={() => clickHora(hr, i)}
				></div>
				<div key={i+'b'} className="hora" style={{
					height: (15/60 * (1440-minsIni)) + 'px',
					marginTop: ((minsIni) * 15/60) + 'px',
					backgroundColor,
					borderRadius: '5px 5px 0 0'
				}}
				onClick={() => clickHora(hr, i)}
				></div>
			</>
		}
	}

	return (
		
		<div className="home-container">
			<Navbar />
			<div className="content">
				{(disp == undefined || horarios == undefined)
					? "Loading..."	
					: <>
					<Link className="back" to={`/casa/${disp.idCasa}`}>&lt; Back</Link>
					<h2>Welcome, {user.nombre} {user.apellido}</h2>
	
					<div className="info-disp">
						<div className="info-left">
							<h3>{disp.nombreDisp}</h3>
							<br />
							<Registros idDisp={idDisp}/>
						</div>
						<div className="info-right">
							<div className="space-between">
								<h3>Schedule</h3>
								<button disabled={modalActive} className="small" onClick={() => newSchedule()}>+ Add Block</button>
							</div>
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
								</div>
								<div className="days">
									<div className="day">
										<h4>Monday</h4>
										{horarios.map((hr, i) => (
											hr.diaSemana == 0 && blockHora(hr, i)
										))}
									</div>
									<div className="day">
										<h4>Tuesday</h4>
										{horarios.map((hr, i) => (
											hr.diaSemana == 1 && blockHora(hr, i)
										))}
									</div>
									<div className="day">
										<h4>Wednesday</h4>
										{horarios.map((hr, i) => (
											hr.diaSemana == 2 && blockHora(hr, i)
										))}
									</div>
									<div className="day">
										<h4>Thursday</h4>
										{horarios.map((hr, i) => (
											hr.diaSemana == 3 && blockHora(hr, i)
										))}
									</div>
									<div className="day">
										<h4>Friday</h4>
										{horarios.map((hr, i) => (
											hr.diaSemana == 4 && blockHora(hr, i)
										))}
									</div>
									<div className="day">
										<h4>Saturday</h4>
										{horarios.map((hr, i) => (
											hr.diaSemana == 5 && blockHora(hr, i)
										))}
									</div>
									<div className="day">
										<h4>Sunday</h4>
										{horarios.map((hr, i) => (
											hr.diaSemana == 6 && blockHora(hr, i)
										))}
									</div>
								</div>
								<div className={`modal-background ${modalActive ? 'active' : ''}`}>
									<div className="modal">
										<div className="modal-header">
											<h3>{modalInfo.title}</h3>
											<span onClick={closeModal}>&times;</span>
										</div>
										<br />
										{modalInfo.content}
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