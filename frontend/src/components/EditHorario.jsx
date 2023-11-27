import { useState } from 'react';
import { server } from '../App';

const EditHorario = ({hr, i, back, horarios, setHorarios, mode, idDisp}) => {

	const [editHorario, setEditHorario] = useState(hr);
	const [error, setError] = useState(false);

	const updateValue = (e) => {
		setEditHorario({
			...editHorario,
			[e.target.name]: e.target.value
		});
	};

	const updateValueNumber = (e) => {
		setEditHorario({
			...editHorario,
			[e.target.name]: Number(e.target.value)
		});
		if(e.target.name == "accion") {
			setError(false);
		}
	}

	const save = async () => {

		if(editHorario.accion == -1) {
			setError(true);
			return;
		}

		
		if(mode == "NEW") {
			
			const response = await fetch(`http://${server}:3000/api/agregarHorario`, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					idDisp,
					diaSemana: editHorario.diaSemana,
					horaInicio: editHorario.horaInicio,
					horaFinal: editHorario.horaFinal,
					accion: editHorario.accion
				})
			});

			editHorario.idHorario = await response.json().idHorario;
			
		} else if (mode == "EDIT") {
			
			const response = await fetch(`http://${server}:3000/api/modificarHorario`, {
				method: "PUT",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					idHorario: editHorario.idHorario,
					diaSemana: editHorario.diaSemana,
					horaInicio: editHorario.horaInicio,
					horaFinal: editHorario.horaFinal,
					accion: editHorario.accion
				})
			});
			
		}

		horarios[i] = editHorario;
		setHorarios(horarios);
		
		back(editHorario, i);
	}

	return (<>
		<div className="input-group inline">
			<label htmlFor="weekday">Weekday: </label>
			<select name="diaSemana" id="weekday" value={editHorario.diaSemana} onChange={updateValueNumber}>
				<option value={0}>Monday</option>
				<option value={1}>Tuesday</option>
				<option value={2}>Wednesday</option>
				<option value={3}>Thursday</option>
				<option value={4}>Friday</option>
				<option value={5}>Saturday</option>
				<option value={6}>Sunday</option>
			</select>
		</div>

		<div className="input-group inline">
			<label htmlFor="startTime">Start Time: </label>
			<input onChange={updateValue} value={editHorario.horaInicio} type="time" name="horaInicio" id="startTime" step="60"/>
		</div>

		<div className="input-group inline">
			<label htmlFor="startTime">End Time: </label>
			<input onChange={updateValue} value={editHorario.horaFinal} type="time" name="horaFinal" id="startTime" />
		</div>

		<div className="input-group inline">
			<label htmlFor="accion">Action: </label>
			<select className={error ? 'error' : ''} name="accion" id="accion" value={editHorario.accion} onChange={updateValueNumber}>
				<option value={-1} disabled defaultChecked style={{color:"red"}}>Choose an option</option>
				<option value={0}>Close</option>
				<option value={1}>Open</option>
				<option value={2}>Half closed</option>
				<option value={3}>1/4 closed</option>
				<option value={4}>3/4 closed</option>
			</select>
		</div>

		<div className="button-group">
			<button className="white" onClick={() => back(hr, i)}>Cancel</button>
			<button onClick={save}>Save</button>
		</div>
	</>)

}

export default EditHorario;