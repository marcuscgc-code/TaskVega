import { Footer } from "./Footer";
import { Header } from "./Header";

export const Login = () => {
  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center p-2"
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <div
          className="p-4 shadow-sm"
          style={{ width: "100%", height: "100%" }}
        >
          <Header/>

          <div className="form_container">
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Digite seu email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="senha" className="form-label">
                  Senha
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="senha"
                  placeholder="Digite sua senha"
                />
              </div>
              <a
                href="#"
                className="d-block mb-3 text-primary text-decoration-none"
              >
                Esqueceu a senha?
              </a>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
            <hr />
            <div className="text-center my-3">Ou</div>
            <button className="btn btn-custom w-100 mb-2">Google</button>
            <button className="btn btn-custom w-100">Facebook</button>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
