export const HeaderControle = () => {
  return (
    <header className="bg-primary text-white p-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <button className="btn btn-light">
            <i className="bi bi-list"></i>
          </button>
          <span className="ms-2">Controle</span>
        </div>
        <button className="btn btn-light">Tarefa</button>
      </div>
    </header>
  );
};
