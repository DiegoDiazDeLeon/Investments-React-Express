import { useState } from "react";
import axios from "axios";

function Dashboard() {
  const [amount, setAmount] = useState(30000);
  const [rate, setRate] = useState(13);
  const [months, setMonths] = useState(18);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const predefinedInvestments = [
    { name: "Inversión 1", annualInterestRate: 15, termMonths: 24 },
    { name: "Inversión 2", annualInterestRate: 13, termMonths: 18 },
    { name: "Inversión 3", annualInterestRate: 10, termMonths: 12 },
    { name: "Inversión 4", annualInterestRate: 8, termMonths: 6 },
    { name: "Inversión 5", annualInterestRate: 12, termMonths: 36 },
  ];

  const handleSelect = (inv) => {
    setRate(inv.annualInterestRate);
    setMonths(inv.termMonths);
    setResult(null);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await axios.post("https://investments-react-express.onrender.com/api/investment", {
        amount,
        annualInterestRate: rate,
        termMonths: months,
        startDate: today,
      });
      alert("Inversión realizada con exito");
    } catch (err) {
      alert(
        "Error al guardar: " + (err?.response?.data?.error || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(
        "https://investments-react-express.onrender.com/api/investment/calculate",
        {
          amount: Number(amount),
          annualInterestRate: Number(rate),
          termMonths: Number(months),
        }
      );

      setResult({
        monthlyReturn: Number(res.data.monthlyReturn),
        returnAfter12Months: Number(res.data.returnAfter12Months),
        totalReturn: Number(res.data.totalReturn),
        totalAfterTerm: Number(res.data.totalAfterTerm),
      });
    } catch (err) {
      alert("Error: " + (err?.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold">Nuevas Inversiones</h2>

      <div className="row">
        {/* Inversiones predefinidas */}
        <div className="col-md-5">
          <div className="list-group shadow-sm">
            {predefinedInvestments.map((inv, index) => (
              <button
                key={index}
                className="list-group-item list-group-item-action"
                onClick={() => handleSelect(inv)}
              >
                <strong>{inv.name}</strong>
                <br />
                Tasa de interés: {inv.annualInterestRate}%
                <br />
                Plazo: {inv.termMonths} meses
              </button>
            ))}
          </div>
        </div>

        {/* Formulario y resultados */}
        <div className="col-md-7">
          <form
            onSubmit={handleCalculate}
            className="border p-4 rounded bg-light shadow-sm"
          >
            <div className="mb-3">
              <label className="form-label fw-bold">
                Monto de inversión (MXN)
              </label>
              <input
                type="number"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">
                Tasa de interés anual (%)
              </label>
              <input
                type="number"
                className="form-control"
                value={rate}
                disabled
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">Plazo (meses)</label>
              <input
                type="number"
                className="form-control"
                value={months}
                disabled
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mb-2"
              disabled={loading}
            >
              {loading ? "Calculando..." : "Calcular inversión"}
            </button>
          </form>

          {/* Mostrar resultados */}
          {result && (
            <>
              <div className="mt-4 p-4 bg-white rounded shadow-sm border">
                <h4 className="fw-bold mb-3">Resultados de la Inversión</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Rendimiento mensual:</strong> $
                    {result.monthlyReturn}
                  </li>
                  <li className="list-group-item">
                    <strong>Rendimiento después de 12 meses:</strong> $
                    {result.returnAfter12Months}
                  </li>
                  <li className="list-group-item">
                    <strong>Rendimiento total:</strong> ${result.totalReturn}
                  </li>
                  <li className="list-group-item">
                    <strong>Saldo final:</strong> ${result.totalAfterTerm}
                  </li>
                </ul>
              </div>

              {/* Botón para hacer la inversión */}
              <button
                type="button"
                className="btn btn-success w-100 fw-bold mt-3"
                onClick={handleSave}
                disabled={loading}
              >
                Hacer inversión
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
