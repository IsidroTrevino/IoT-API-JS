import { useEffect, useState } from 'react';
import { server } from '../App';

const Registros = ({idDisp}) => {

	const [registros, setRegistros] = useState(undefined);

	const getRegistros = async () => {

		const response = await fetch(`http://${server}:3000/api/verRegistros/${idDisp}`);
		const registroData = await response.json();
		setRegistros(registroData);

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
				<div className="columna">Fecha</div>
				<div className="columna">Hora</div>
				<div className="columna">Lectura</div>
				<div className="columna">Acción</div>
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
							<div className="columna">{registro.lecturaSensor}</div>
							<div className="columna">{registro.accionTomada}</div>
						</div>
					))
					: <div className="registro">
							<div className="columna">No hay ningun registro</div>
					</div>
				} </>
			}
		</div>
	</>);

}

export default Registros;