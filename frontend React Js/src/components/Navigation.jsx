import { useState } from "react";
import userInfo from "../assets/lucas.json";

function Navbar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary-subtle custom-navbar">
        <div className="container-fluid">
         
          <a className="navbar-brand" href="#">
            <img
              src="/logoAia.png"
              alt="Logo"
              width="100"
              height="40"
              className="d-inline-block align-text-top"
            />
          </a>

          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/*  */}
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item mx-3">
                <a className="nav-link fw-bold" href="/Dashboard">
                  Nueva Inversión
                </a>
              </li>
              <li className="nav-item mx-3 mb-lg-0">
                <a className="nav-link fw-bold" href="/MyInvestments">
                  Mis Inversiones
                </a>
              </li>
            </ul>
          </div>

          {/*  usuario */}
          <div
            className="dropdown d-flex align-items-center"
            style={{ marginRight: "1%" }}
          >
            <a
              href="#"
              className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="/user.png"
                alt="avatar"
                width="32"
                height="32"
                className="rounded-circle me-2"
              />
              <strong>{userInfo.name.split(" ")[0]}</strong>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow dropdown-menu-end">
              <li>
                <button className="dropdown-item" onClick={() => setShowModal(true)}>
                  Información
                </button>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Modal de Información */}
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Información Personal</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>ID:</strong> {userInfo.id}</p>
                <p><strong>Nombre:</strong> {userInfo.name}</p>
                <p><strong>Edad:</strong> {userInfo.age} años</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
