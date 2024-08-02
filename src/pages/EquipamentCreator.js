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
    begin_hour_machine: 0,
    name: "",
    year: new Date().getFullYear(),
    model: "N/A",
    measuring_point: "N/A",
    fuel: "DIESEL",
    pulse_number: 0,
    tire_perimeter: 0.0,
    available_hours_per_month: 0.0,
    average_consumption: 0.0,
    speed_alert: 0.0,
    temperature_alert: 0.0,
    shock_alert: 0.0,
    effective_hours_odometer: "HODOMETRO",
    odometer: 0.0,
    notes: "",
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
      // eslint-disable-next-line no-unused-vars
      const response = await api.post("/equipament/", dataToSubmit);
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
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control text-sm"
                  required
                />
                {errors.name && (
                  <div className="text-red-500 text-sm">{errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <label className="text-sm">Ano</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="form-control text-sm"
                  required
                />
                {errors.year && (
                  <div className="text-red-500 text-sm">{errors.year}</div>
                )}
              </div>
              <div className="form-group">
                <label className="text-sm">Horímetro Inicial Máquina</label>
                <input
                  type="number"
                  step="0.01"
                  name="begin_hour_machine"
                  value={formData.begin_hour_machine}
                  onChange={handleChange}
                  className="form-control text-sm"
                  required
                />
                {errors.begin_hour_machine && (
                  <div className="text-red-500 text-sm">
                    {errors.begin_hour_machine}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label className="text-sm">Modelo</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="form-control text-sm"
                />
              </div>
              <div className="form-group">
                <label className="text-sm">Ponto de Medição</label>
                <input
                  type="text"
                  name="measuring_point"
                  value={formData.measuring_point}
                  onChange={handleChange}
                  className="form-control text-sm"
                />
              </div>
              <div className="form-group">
                <label className="text-sm">Combustível</label>
                <select
                  name="fuel"
                  value={formData.fuel}
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
                  name="pulse_number"
                  value={formData.pulse_number}
                  onChange={handleChange}
                  className="form-control text-sm"
                />
              </div>
              <div className="form-group">
                <label className="text-sm">Perímetro do Pneu (cm)</label>
                <input
                  type="number"
                  step="0.01"
                  name="tire_perimeter"
                  value={formData.tire_perimeter}
                  onChange={handleChange}
                  className="form-control text-sm"
                />
              </div>
              <div className="form-group">
                <label className="text-sm">Horas Disponíveis por Mês</label>
                <input
                  type="number"
                  step="0.01"
                  name="available_hours_per_month"
                  value={formData.available_hours_per_month}
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
                  name="average_consumption"
                  value={formData.average_consumption}
                  onChange={handleChange}
                  className="form-control text-sm"
                />
              </div>
              <div className="form-group">
                <label className="text-sm">Alerta de Velocidade (km/h)</label>
                <input
                  type="number"
                  step="0.01"
                  name="speed_alert"
                  value={formData.speed_alert}
                  onChange={handleChange}
                  className="form-control text-sm"
                />
              </div>
              <div className="form-group">
                <label className="text-sm">Alerta de Temperatura (°C)</label>
                <input
                  type="number"
                  step="0.01"
                  name="temperature_alert"
                  value={formData.temperature_alert}
                  onChange={handleChange}
                  className="form-control text-sm"
                />
              </div>
              <div className="form-group">
                <label className="text-sm">Alerta de Shock (km/h)</label>
                <input
                  type="number"
                  step="0.01"
                  name="shock_alert"
                  value={formData.shock_alert}
                  onChange={handleChange}
                  className="form-control text-sm"
                />
              </div>
              <div className="form-group">
                <label className="text-sm">Horas Efetivas ou Hodômetro</label>
                <select
                  name="effective_hours_odometer"
                  value={formData.effective_hours_odometer}
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
                  name="odometer"
                  value={formData.odometer}
                  onChange={handleChange}
                  className="form-control text-sm"
                />
              </div>
              <div className="form-group col-span-3">
                <label className="text-sm">Observações</label>
                <textarea
                  name="notes"
                  value={formData.notes}
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
