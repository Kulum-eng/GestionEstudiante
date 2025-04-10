import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import "./ShinobiForm.css";

const ShinobiForm = observer(({ viewModel }) => {
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    viewModel.fetchShinobis();
  }, [viewModel]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await viewModel.doCreateShinobi();
  };

  return (
    <div className="shinobi-form-container">
      <h1 className="shinobi-title">Registro de Estudiantes</h1>

      {}
      <div className="toggle-button-container">
        <button className="shinobi-toggle-list" onClick={() => setShowList(true)}>
          Ver Lista de Estudiantes
        </button>
      </div>

      {}
      {showList && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowList(false)}>
              ✖ Cerrar
            </button>
            <h2 className="shinobi-subtitle">Estudiantes Registrados</h2>
            <div className="table-wrapper">
              <table className="shinobi-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Matrícula</th>
                    <th>Carrera</th>
                    <th>Correo</th>
                  </tr>
                </thead>
                <tbody>
                  {viewModel.shinobis.map((shinobi, index) => (
                    <tr key={index}>
                      <td>{shinobi.name || "Sin nombre"}</td>
                      <td>{shinobi.clan || "Sin edad"}</td>
                      <td>{shinobi.position || "Sin matrícula"}</td>
                      <td>{shinobi.village || "Sin carrera"}</td>
                      <td>{shinobi.special_hability || "Sin correo"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="shinobi-form">
        <input
          type="text"
          placeholder="Nombre"
          value={viewModel.name}
          onChange={(e) => viewModel.onChangeName(e.target.value)}
          className="shinobi-input"
        />
        <input
          type="number"
          placeholder="Edad"
          value={viewModel.clan}
          onChange={(e) => viewModel.onChangeClan(e.target.value)}
          className="shinobi-input"
        />
        <input
          type="text"
          placeholder="Matrícula"
          value={viewModel.position}
          onChange={(e) => viewModel.onChangePosition(e.target.value)}
          className="shinobi-input"
        />
        <input
          type="text"
          placeholder="Carrera"
          value={viewModel.village}
          onChange={(e) => viewModel.onChangeVillage(e.target.value)}
          className="shinobi-input"
        />
        <input
          type="email"
          placeholder="Correo"
          value={viewModel.specialHability}
          onChange={(e) => viewModel.onChangeSpecialHability(e.target.value)}
          className="shinobi-input"
        />
        <button type="submit" className="shinobi-submit">
          Guardar Estudiante
        </button>

        {viewModel.error && <p className="shinobi-error">{viewModel.error}</p>}
        {viewModel.isValid && (
          <p className="shinobi-success">¡Estudiante guardado exitosamente!</p>
        )}
      </form>
    </div>
  );
});

export default ShinobiForm;
