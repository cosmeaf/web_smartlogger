import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import Breadcrumb from "../components/Breadcrumb";
import api from "../services/api";

const EquipamentCreator = () => {
  const [devices, setDevices] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [formData, setFormData] = useState({
    device_id: "",
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
    const fetchDevices = async () => {
      try {
        const response = await api.get("/device/");
        setDevices(response.data);
      } catch (error) {
        console.error("Failed to fetch devices", error);
      }
    };

    const fetchEquipments = async () => {
      try {
        const response = await api.get("/equipament/");
        setEquipments(response.data);
      } catch (error) {
        console.error("Failed to fetch equipments", error);
      }
    };

    fetchDevices();
    fetchEquipments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      device_id: formData.device,
    };

    console.log("Submitting form with data:", dataToSubmit);
    try {
      const response = await api.post("/equipament/", dataToSubmit);
      console.log("Response from server:", response);
      navigate("/dashboard/equipament");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
        console.error("Error response from server:", error.response.data);
      } else {
        setErrors({
          general: "Failed to create equipament. Please try again.",
        });
        console.error("Failed to create equipament", error);
      }
    }
  };

  const breadcrumbItems = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Equipamentos", link: "/dashboard/equipament" },
    { name: "Criar Equipamento" },
  ];

  // Filtra dispositivos sem equipamentos relacionados
  const availableDevices = devices.filter(
    (device) =>
      !equipments.some((equip) => equip.device.device_id === device.device_id)
  );

  return (
    <>
      <HeaderLoggedIn />
      <div className="container mx-auto my-2">
        <h1 className="text-xl font-bold mb-4">Criar Novo Equipamento</h1>

        <Breadcrumb items={breadcrumbItems} />
        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-group">
                <label className="text-sm">Device</label>
                <select
                  name="device"
                  value={formData.device}
                  onChange={handleChange}
                  className="form-control text-sm"
                  required
                >
                  <option value="">Selecione um dispositivo</option>
                  {availableDevices.map((device) => (
                    <option key={device.device_id} value={device.device_id}>
                      {device.device_id}
                    </option>
                  ))}
                </select>
                {errors.device && (
                  <div className="text-red-500 text-sm">{errors.device}</div>
                )}
              </div>
              <div className="form-group">
                <label className="text-sm">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="form-control text-sm"
                  required
                />
                {errors.nome && (
                  <div className="text-red-500 text-sm">{errors.nome}</div>
                )}
              </div>
              <div className="form-group">
                <label className="text-sm">Número de Série</label>
                <input
                  type="text"
                  name="numero_serie"
                  value={formData.numero_serie}
                  onChange={handleChange}
                  className="form-control text-sm"
                  required
                />
                {errors.numero_serie && (
                  <div className="text-red-500 text-sm">
                    {errors.numero_serie}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label className="text-sm">Ano</label>
                <input
                  type="number"
                  name="ano"
                  value={formData.ano}
                  onChange={handleChange}
                  className="form-control text-sm"
                  required
                />
                {errors.ano && (
                  <div className="text-red-500 text-sm">{errors.ano}</div>
                )}
              </div>
              <div className="form-group">
                <label className="text-sm">Horímetro Inicial Máquina</label>
                <input
                  type="number"
                  step="0.01"
                  name="horimetro_inicialMaquina"
                  value={formData.horimetro_inicialMaquina}
                  onChange={handleChange}
                  className="form-control text-sm"
                  required
                />
                {errors.horimetro_inicialMaquina && (
                  <div className="text-red-500 text-sm">
                    {errors.horimetro_inicialMaquina}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label className="text-sm">Modelo</label>
                <input
                  type="text"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  className="form-control text-sm"
                />
              </div>
              <div className="form-group">
                <label className="text-sm">Ponto de Medição</label>
                <input
                  type="text"
                  name="ponto_medicao"
                  value={formData.ponto_medicao}
                  onChange={handleChange}
                  className="form-control text-sm"
                />
              </div>
              <div className="form-group">
                <label className="text-sm">Combustível</label>
                <select
                  name="combustivel"
                  value={formData.combustivel}
                  onChange={handleChange}
                  className="form-control text-sm"
                >
                  <option value="GS">GS</option>
                  <option value="DIESEL">Diesel</option>
                  <option value="GASOLINA">Gasolina</option>
                  <option value="ELETRICA">Elétrica</option>
                </select>
              </div>
              <div className="form-group">
                <label className="text-sm">Número de Pulsos</label>
                <input
                  type="number"
                  name="numero_pulsos"
                  value={formData.numero_pulsos}
                  onChange={handleChange}
                  className="form-control text-sm"
                />
              </div>
              <div className="form-group">
                <label className="text-sm">Perímetro do Pneu (cm)</label>
                <input
                  type="number"
                  step="0.01"
                  name="perimetro_pneu"
                  value={formData.perimetro_pneu}
                  onChange={handleChange}
                  className="form-control text-sm"
                />
              </div>
              <div className="form-group">
                <label className="text-sm">Horas Disponíveis por Mês</label>
                <input
                  type="number"
                  step="0.01"
                  name="horas_disponiveis_mes"
                  value={formData.horas_disponiveis_mes}
                  onChange={handleChange}
                  className="form-control text-sm"
                />
              </div>
              <div className="form-group">
                <label className="text-sm">
                  Consumo Médio (m³/h - L/h - Kg/h)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="consumo_medio"
                  value={formData.consumo_medio}
                  onChange={handleChange}
                  className="form-control text-sm"
                />
              </div>
              <div className="form-group">
                <label className="text-sm">Alerta de Velocidade (km/h)</label>
                <input
                  type="number"
                  step="0.01"
                  name="alerta_velocidade"
                  value={formData.alerta_velocidade}
                  onChange={handleChange}
                  className="form-control text-sm"
                />
              </div>
              <div className="form-group">
                <label className="text-sm">Alerta de Temperatura (°C)</label>
                <input
                  type="number"
                  step="0.01"
                  name="alerta_temperatura"
                  value={formData.alerta_temperatura}
                  onChange={handleChange}
                  className="form-control text-sm"
                />
              </div>
              <div className="form-group">
                <label className="text-sm">Alerta de Shock (km/h)</label>
                <input
                  type="number"
                  step="0.01"
                  name="alerta_shock"
                  value={formData.alerta_shock}
                  onChange={handleChange}
                  className="form-control text-sm"
                />
              </div>
              <div className="form-group">
                <label className="text-sm">Horas Efetivas ou Hodômetro</label>
                <select
                  name="horas_efetivas_hodometro"
                  value={formData.horas_efetivas_hodometro}
                  onChange={handleChange}
                  className="form-control text-sm"
                >
                  <option value="HODOMETRO">Hodômetro</option>
                  <option value="HORAS_EFETIVAS">Horas Efetivas</option>
                </select>
              </div>
              <div className="form-group">
                <label className="text-sm">Hodômetro</label>
                <input
                  type="number"
                  step="0.01"
                  name="hodometro"
                  value={formData.hodometro}
                  onChange={handleChange}
                  className="form-control text-sm"
                />
              </div>
              <div className="form-group col-span-3">
                <label className="text-sm">Observações</label>
                <textarea
                  name="obs"
                  value={formData.obs}
                  onChange={handleChange}
                  className="form-control text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
            >
              Criar Equipamento
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EquipamentCreator;
