import { useEffect, useState } from 'react';
import { server } from '../App';

const Registros = ({idDisp, actionValue, setClearing}) => {

	const [registros, setRegistros] = useState(undefined);

	const getRegistros = async () => {

		const response = await fetch(`http://${server}:3000/api/verRegistros/${idDisp}`);
		const registroData = await response.json();
		setRegistros(registroData);
		setClearing(false);

	}

	useEffect(() => {
		const interval = setInterval(() => {
			getRegistros();
		}, 1000);
		getRegistros();
		return () => clearInterval(interval);
	}, []);

	return (<>
		<div className="tabla-registros">
			<div className="registro-header">
				<div className="columna">Date</div>
				<div className="columna">Time</div>
				<div className="columna">Sensor reading</div>
				<div className="columna">Action</div>
			</div>
			{registros == undefined
				? <div className="registro">
					<div className="columna">Loading...</div>
				</div>
				: <> {registros.length > 0 
					? registros.map((registro, i) => (
						<div key={i} className="registro">
							<div className="columna">{registro.fecha.substr(0, 10)}</div>
							<div className="columna">{registro.hora}</div>
							<div className="columna">
								<div class="tooltip">{registro.lecturaSensor}
								<	span class="tooltiptext">Lumens</span>
								</div>
							</div>
							<div className="columna">{actionValue(registro.accionTomada)}</div>
						</div>
					))
					: <div className="registro">
							<div className="columna">No log entries found</div>
					</div>
				} </>
			}
		</div>
	</>);

}

export default Registros;