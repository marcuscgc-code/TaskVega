import "../static/Controle.css"
export const Footer_C = () =>{
    return(
        <footer className="text-white p-2 inclusao fixed-bottom">
    <div className="d-flex justify-content-around">
        <button className="btn btn-light">Filtro<i className="bi bi-house"></i></button>
        <button className="btn btn-light">Trofeu<i className="bi bi-trophy"></i></button>
        <button className="btn btn-light">Dados<i className="bi bi-bar-chart"></i></button>
    </div>
</footer>
    );
};