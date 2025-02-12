export const Footer_D = () =>{
    return (
        <footer className="bg-light py-3 mt-auto">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-auto">
              <button className="btn btn-primary">
                <i className="fas fa-home me-2"></i> Home
              </button>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary">
                <i className="fas fa-search me-2"></i> Pesquisar
              </button>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary">
                <i className="fas fa-plus-circle me-2"></i> Novo
              </button>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary">
                <i className="fas fa-cog me-2"></i> Configurações
              </button>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary">
                <i className="fas fa-user me-2"></i> Perfil
              </button>
            </div>
          </div>
        </div>
      </footer>
    );
};