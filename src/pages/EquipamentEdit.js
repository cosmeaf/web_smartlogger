import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import LoadPage from "../components/LoadPage";

const EquipamentEditPage = () => {
  const { id } = useParams();
  const [devices, setDevices] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    device: "",
    horimetro_inicialMaquina: 0,
    nome: "",
    numero_serie: "",
    ano: new Date().getFullYear(),
    modelo: "N/A",
    ponto_medicao: "N/A",
    combustivel: "DIESEL",
    numero_pulsos: 0,
    perimetro_pneu: 0.0,
    horas_disponiveis_mes: 0.0,
    consumo_medio: 0.0,
    alerta_velocidade: 0.0,
    alerta_temperatura: 0.0,
    alerta_shock: 0.0,
    horas_efetivas_hodometro: "HODOMETRO",
    hodometro: 0.0,
    obs: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipament = async () => {
      try {
        const response = await api.get(`/equipament/${id}/`);
        const equipamentData = response.data;
        setFormData({
          ...equipamentData,
        });
      } catch (error) {
        console.error("Failed to fetch equipament", error);
      }
    };

    const fetchDevices = async () => {
      try {
        const response = await api.get("/device/");
        setDevices(response.data);
      } catch (error) {
        console.error("Failed to fetch devices", error);
      }
    };

    fetchEquipament();
    fetchDevices();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/equipament/${id}/`, formData); // Note the trailing slash
      navigate("/dashboard/equipament");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.error("Failed to update equipament", error);
      }
    }
  };

  return (
    <>
      {!!(<LoadPage />)}

      <HeaderLoggedIn />
      <div className="container-fluid mx-auto my-3">
        <h1 className="mb-4 text-xl font-bold">Edit Equipament</h1>
        <div className="w-full bg-white shadow-lg rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={formData.id} />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-4">
                <label
                  htmlFor="formDevice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Device
                </label>
                <select
                  id="formDevice"
                  name="device"
                  value={formData.device}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.device && "border-red-500"
                  }`}
                  required
                >
                  <option value="">Select a device</option>
                  {devices &&
                    devices.map((device) => (
                      <option key={device.device_id} value={device.device_id}>
                        {device.device_id}
                      </option>
                    ))}
                </select>
                {errors.device && (
                  <p className="mt-2 text-sm text-red-600">{errors.device}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="formNome"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nome
                </label>
                <input
                  id="formNome"
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.nome && "border-red-500"
                  }`}
                  required
                />
                {errors.nome && (
                  <p className="mt-2 text-sm text-red-600">{errors.nome}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="formNumeroSerie"
                  className="block text-sm font-medium text-gray-700"
                >
                  Número de Série
                </label>
                <input
                  id="formNumeroSerie"
                  type="text"
                  name="numero_serie"
                  value={formData.numero_serie}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.numero_serie && "border-red-500"
                  }`}
                  required
                />
                {errors.numero_serie && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.numero_serie}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="formAno"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ano
                </label>
                <input
                  id="formAno"
                  type="number"
                  name="ano"
                  value={formData.ano}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.ano && "border-red-500"
                  }`}
                  required
                />
                {errors.ano && (
                  <p className="mt-2 text-sm text-red-600">{errors.ano}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="formHorimetroInicialMaquina"
                  className="block text-sm font-medium text-gray-700"
                >
                  Horímetro Inicial Máquina
                </label>
                <input
                  id="formHorimetroInicialMaquina"
                  type="number"
                  step="0.01"
                  name="horimetro_inicialMaquina"
                  value={formData.horimetro_inicialMaquina}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.horimetro_inicialMaquina && "border-red-500"
                  }`}
                  required
                />
                {errors.horimetro_inicialMaquina && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.horimetro_inicialMaquina}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="formModelo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Modelo
                </label>
                <input
                  id="formModelo"
                  type="text"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="formPontoMedicao"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ponto de Medição
                </label>
                <input
                  id="formPontoMedicao"
                  type="text"
                  name="ponto_medicao"
                  value={formData.ponto_medicao}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="formCombustivel"
                  className="block text-sm font-medium text-gray-700"
                >
                  Combustível
                </label>
                <select
                  id="formCombustivel"
                  name="combustivel"
                  value={formData.combustivel}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="GS">GS</option>
                  <option value="DIESEL">Diesel</option>
                  <option value="GASOLINA">Gasolina</option>
                  <option value="ELETRICA">Elétrica</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="formNumeroPulsos"
                  className="block text-sm font-medium text-gray-700"
                >
                  Número de Pulsos
                </label>
                <input
                  id="formNumeroPulsos"
                  type="number"
                  name="numero_pulsos"
                  value={formData.numero_pulsos}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="formPerimetroPneu"
                  className="block text-sm font-medium text-gray-700"
                >
                  Perímetro do Pneu (cm)
                </label>
                <input
                  id="formPerimetroPneu"
                  type="number"
                  step="0.01"
                  name="perimetro_pneu"
                  value={formData.perimetro_pneu}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="formHorasDisponiveisMes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Horas Disponíveis por Mês
                </label>
                <input
                  id="formHorasDisponiveisMes"
                  type="number"
                  step="0.01"
                  name="horas_disponiveis_mes"
                  value={formData.horas_disponiveis_mes}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="formConsumoMedio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Consumo Médio (m³/h - L/h - Kg/h)
                </label>
                <input
                  id="formConsumoMedio"
                  type="number"
                  step="0.01"
                  name="consumo_medio"
                  value={formData.consumo_medio}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="formAlertaVelocidade"
                  className="block text-sm font-medium text-gray-700"
                >
                  Alerta de Velocidade (km/h)
                </label>
                <input
                  id="formAlertaVelocidade"
                  type="number"
                  step="0.01"
                  name="alerta_velocidade"
                  value={formData.alerta_velocidade}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="formAlertaTemperatura"
                  className="block text-sm font-medium text-gray-700"
                >
                  Alerta de Temperatura (°C)
                </label>
                <input
                  id="formAlertaTemperatura"
                  type="number"
                  step="0.01"
                  name="alerta_temperatura"
                  value={formData.alerta_temperatura}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="formAlertaShock"
                  className="block text-sm font-medium text-gray-700"
                >
                  Alerta de Shock (km/h)
                </label>
                <input
                  id="formAlertaShock"
                  type="number"
                  step="0.01"
                  name="alerta_shock"
                  value={formData.alerta_shock}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="formHorasEfetivasHodometro"
                  className="block text-sm font-medium text-gray-700"
                >
                  Horas Efetivas ou Hodômetro
                </label>
                <select
                  id="formHorasEfetivasHodometro"
                  name="horas_efetivas_hodometro"
                  value={formData.horas_efetivas_hodometro}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="HODOMETRO">Hodômetro</option>
                  <option value="HORAS_EFETIVAS">Horas Efetivas</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="formHodometro"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hodômetro
                </label>
                <input
                  id="formHodometro"
                  type="number"
                  step="0.01"
                  name="hodometro"
                  value={formData.hodometro}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-4">
                <label
                  htmlFor="formObs"
                  className="block text-sm font-medium text-gray-700"
                >
                  Observações
                </label>
                <textarea
                  id="formObs"
                  name="obs"
                  value={formData.obs}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update
              </button>
              <Link
                to="/dashboard/equipament"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EquipamentEditPage;
