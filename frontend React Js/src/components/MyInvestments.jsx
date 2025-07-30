import { useState, useEffect } from "react";
import axios from "axios";

function MyInvestments() {
  const [investments, setInvestments] = useState([]);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const res = await axios.get("https://investments-react-express.onrender.com/api/investment");
      setInvestments(res.data); 
    } catch (err) {
      alert("Error al cargar inversiones: " + (err?.response?.data?.error || err.message));
    }
  };


  const handleSelect = async (inv) => {
    setSelectedInvestment(inv);
    setResult(null);
    setLoading(true);

    try {

      const res = await axios.post("https://investments-react-express.onrender.com/api/investment/calculate", {
        amount: Number(inv.amount),
        annualInterestRate: Number(inv.annualInterestRate),
        termMonths: Number(inv.termMonths),
      });

      setResult({
        monthlyReturn: Number(res.data.monthlyReturn),
        returnAfter12Months: Number(res.data.returnAfter12Months),
        totalReturn: Number(res.data.totalReturn),
        totalAfterTerm: Number(res.data.totalAfterTerm),
      });
    } catch (err) {
      alert("Error al calcular: " + (err?.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold">Mis Inversiones</h2>

      <div className="row">
        {/*  lista de inversiones */}
        <div className="col-md-5">
          <div className="list-group shadow-sm">
            {investments.length === 0 && (
              <div className="text-center p-3 text-muted">No hay inversiones guardadas</div>
            )}
            {investments.map((inv) => (
              <button
                key={inv._id}
                className={`list-group-item list-group-item-action ${
                  selectedInvestment?._id === inv._id ? "active" : ""
                }`}
                onClick={() => handleSelect(inv)}
                disabled={loading}
              >
                <strong>{inv.name || `Inversión #${inv._id.substring(0, 5)}`}</strong>
                <br />
                Monto: ${inv.amount}
                <br />
                Tasa de interés: {inv.annualInterestRate}%
                <br />
                Plazo: {inv.termMonths} meses
              </button>
            ))}
          </div>
        </div>

        {/* detalles de la inversión y resultados */}
        <div className="col-md-7">
          {selectedInvestment ? (
            <>
              <div className="border p-4 rounded bg-light shadow-sm">
                <h4 className="fw-bold mb-3">Detalles de la Inversión</h4>

                <p><strong>Monto:</strong> ${selectedInvestment.amount}</p>
                <p><strong>Tasa de interés anual:</strong> {selectedInvestment.annualInterestRate}%</p>
                <p><strong>Plazo:</strong> {selectedInvestment.termMonths} meses</p>

                {loading && <p>Cargando cálculo...</p>}

                {result && !loading && (
                  <div className="mt-4 p-4 bg-white rounded shadow-sm border">
                    <h5 className="fw-bold mb-3">Resultados de la Inversión</h5>
                    <ul className="list-group">
                      <li className="list-group-item">
                        <strong>Rendimiento mensual:</strong> ${result.monthlyReturn.toFixed(2)}
                      </li>
                      <li className="list-group-item">
                        <strong>Rendimiento después de 12 meses:</strong> ${result.returnAfter12Months.toFixed(2)}
                      </li>
                      <li className="list-group-item">
                        <strong>Rendimiento total:</strong> ${result.totalReturn.toFixed(2)}
                      </li>
                      <li className="list-group-item">
                        <strong>Saldo final:</strong> ${result.totalAfterTerm.toFixed(2)}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center text-muted">Selecciona una inversión para ver detalles</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyInvestments;
