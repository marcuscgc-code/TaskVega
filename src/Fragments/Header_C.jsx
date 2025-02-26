export const Header_C = () => {
    return (
      <header className="bg-primary text-white p-3 fundo">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <button className="btn btn-light teste">
              <i className="bi bi-list"></i>
            </button>
            <span className="ms-2 opcao"></span>
          </div>
          {/* <button className="btn btn-light nome_custon">Add Tarefa</button> */}
        </div>
      </header>
    );
  };