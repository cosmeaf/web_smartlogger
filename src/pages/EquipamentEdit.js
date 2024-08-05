import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import LoadPage from "../components/LoadPage";

const EquipamentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipament, setEquipament] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    device: "",
    begin_hour_machine: "",
    name: "",
    year: "",
    model: "",
    measuring_point: "",
    fuel: "",
    pulse_number: "",
    tire_perimeter: "",
    available_hours_per_month: "",
    average_consumption: "",
    speed_alert: "",
    temperature_alert: "",
    shock_alert: "",
    effective_hours_odometer: "",
    odometer: "",
    notes: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipament = async () => {
      try {
        const response = await api.get(`/equipament/${id}/`);
        setEquipament(response.data);
        setFormData({
          id: response.data.id,
          device: response.data.device.id,
          begin_hour_machine: response.data.begin_hour_machine,
          name: response.data.name,
          year: response.data.year,
          model: response.data.model,
          measuring_point: response.data.measuring_point,
          fuel: response.data.fuel,
          pulse_number: response.data.pulse_number,
          tire_perimeter: response.data.tire_perimeter,
          available_hours_per_month: response.data.available_hours_per_month,
          average_consumption: response.data.average_consumption,
          speed_alert: response.data.speed_alert,
          temperature_alert: response.data.temperature_alert,
          shock_alert: response.data.shock_alert,
          effective_hours_odometer: response.data.effective_hours_odometer,
          odometer: response.data.odometer,
          notes: response.data.notes,
        });
      } catch (error) {
        console.error("Erro ao buscar equipamento:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipament();
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
    setError(null);
    try {
      const response = await api.patch(`/equipament/${id}/`, formData);
      console.log("Equipamento atualizado:", response.data);
      navigate("/dashboard/equipament");
    } catch (error) {
      console.error("Erro ao atualizar equipamento:", error);
      setError("Erro ao atualizar equipamento.");
    }
  };

  if (loading) {
    return <LoadPage />;
  }

  return (
    <>
      <HeaderLoggedIn />
      <div className="container-fluid mx-auto my-3">
        <h1 className="mb-4 text-xl font-bold">Edit Equipament</h1>
        <div className="w-full bg-white shadow-lg rounded-lg p-6">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <label className="block">
              Nome:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </label>
            <label className="block">
              Ano:
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </label>
            <label className="block">
              Modelo:
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </label>
            <label className="block">
              Ponto de Medição:
              <input
                type="text"
                name="measuring_point"
                value={formData.measuring_point}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </label>
            <label className="block">
              Combustível:
              <input
                type="text"
                name="fuel"
                value={formData.fuel}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </label>
            <label className="block">
              Número de Pulsos:
              <input
                type="number"
                name="pulse_number"
                value={formData.pulse_number}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </label>
            <label className="block">
              Perímetro do Pneu:
              <input
                type="text"
                name="tire_perimeter"
                value={formData.tire_perimeter}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </label>
            <label className="block">
              Horas Disponíveis por Mês:
              <input
                type="text"
                name="available_hours_per_month"
                value={formData.available_hours_per_month}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </label>
            <label className="block">
              Consumo Médio:
              <input
                type="text"
                name="average_consumption"
                value={formData.average_consumption}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </label>
            <label className="block">
              Alerta de Velocidade:
              <input
                type="text"
                name="speed_alert"
                value={formData.speed_alert}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </label>
            <label className="block">
              Alerta de Temperatura:
              <input
                type="text"
                name="temperature_alert"
                value={formData.temperature_alert}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </label>
            <label className="block">
              Alerta de Choque:
              <input
                type="text"
                name="shock_alert"
                value={formData.shock_alert}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </label>
            <label className="block">
              Horas Efetivas do Odômetro:
              <input
                type="text"
                name="effective_hours_odometer"
                value={formData.effective_hours_odometer}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </label>
            <label className="block">
              Odômetro:
              <input
                type="text"
                name="odometer"
                value={formData.odometer}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </label>
            <label className="block">
              Notas:
              <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </label>
            <div className="col-span-4 flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Atualizar
              </button>
              <Link
                to="/dashboard/equipament"
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Voltar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EquipamentEdit;
