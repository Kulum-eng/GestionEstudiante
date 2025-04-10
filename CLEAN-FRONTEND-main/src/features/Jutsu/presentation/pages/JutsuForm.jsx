import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import "./JutsuForm.css";

const JutsuForm = observer(({ viewModel }) => {
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    viewModel.fetchJutsus().then(() => {
      console.log("Materias cargadas:", viewModel.jutsus); // Verifica los datos
    });
  }, [viewModel]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await viewModel.doCreateJutsu();
    await viewModel.fetchJutsus(); // Refresca lista después de guardar
  };

  return (
    <div className="jutsu-form-container">
      <h1 className="jutsu-title">Registro de Materias</h1>

      <div className="toggle-button-container">
        <button className="jutsu-toggle-list" onClick={() => setShowList(true)}>
          Ver Lista de Materias
        </button>
      </div>

      {showList && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowList(false)}>
              ✖ Cerrar
            </button>
            <h2 className="jutsu-subtitle">Materias Registradas</h2>
            <div className="table-wrapper">
              <table className="jutsu-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Área</th>
                    <th>Dificultad</th>
                    <th>Docente</th>
                  </tr>
                </thead>
                <tbody>
                  {viewModel.jutsus.map((materia, index) => (
                    <tr key={index}>
                      <td>{materia.name || "Sin nombre"}</td>
                      <td>{materia.jutsu_type || "Sin tipo"}</td>
                      <td>{materia.nature || "Sin área"}</td>
                      <td>{materia.difficulty_level || "Sin dificultad"}</td>
                      <td>{materia.created_by || "Sin docente"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="jutsu-form">
        <input
          type="text"
          placeholder="Nombre de la materia"
          value={viewModel.name}
          onChange={(e) => viewModel.onChangeName(e.target.value)}
          className="jutsu-input"
        />
        <input
          type="text"
          placeholder="Tipo de materia (Obligatoria/Electiva)"
          value={viewModel.jutsuType}
          onChange={(e) => viewModel.onChangeJutsuType(e.target.value)}
          className="jutsu-input"
        />
        <input
          type="text"
          placeholder="Área (Ciencias, Humanidades...)"
          value={viewModel.nature}
          onChange={(e) => viewModel.onChangeNature(e.target.value)}
          className="jutsu-input"
        />
        <input
          type="text"
          placeholder="Nivel de dificultad"
          value={viewModel.difficultyLevel}
          onChange={(e) => viewModel.onChangeDifficultyLevel(e.target.value)}
          className="jutsu-input"
        />
        <input
          type="text"
          placeholder="Docente a cargo"
          value={viewModel.createdBy}
          onChange={(e) => viewModel.onChangeCreatedBy(e.target.value)}
          className="jutsu-input"
        />
        <button type="submit" className="jutsu-submit">Guardar Materia</button>

        {viewModel.error && <p className="jutsu-error">{viewModel.error}</p>}
        {viewModel.isValid && <p className="jutsu-success">¡Materia guardada exitosamente!</p>}
      </form>
    </div>
  );
});

export default JutsuForm;
