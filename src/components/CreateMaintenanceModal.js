import React, { useState, useEffect } from "react";
import api from "../services/api";

const CreateMaintenanceModal = ({ show, onHide, onCreate, equipamentId }) => {
  const [formData, setFormData] = useState({
    name: "",
    usage_hours: 0,
    alarm_hours: 0,
    obs: "",
    equipament: equipamentId,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (equipamentId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        equipament: equipamentId,
      }));
    }
  }, [equipamentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data being sent:", formData);
    try {
      const response = await api.post("/maintenance/", formData); // Usando api.post
      onCreate(response.data);
      onHide();
      setFormData({
        name: "",
        usage_hours: 0,
        alarm_hours: 0,
        obs: "",
        equipament: equipamentId,
      });
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.error("Failed to create maintenance", error);
      }
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2">
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Cadastrar Manutenção</h3>
          <button
            onClick={onHide}
            className="text-gray-600 hover:text-gray-800"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-4 py-3">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nome do Alarme
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                required
              />
              {errors.name && (
                <span className="text-red-600 text-sm">{errors.name[0]}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tempo para o próximo alarme
              </label>
              <input
                type="number"
                name="alarm_hours"
                value={formData.alarm_hours}
                onChange={handleChange}
                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                required
              />
              {errors.alarm_hours && (
                <span className="text-red-600 text-sm">
                  {errors.alarm_hours[0]}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tempo de uso (Peça)
              </label>
              <input
                type="number"
                name="usage_hours"
                value={formData.usage_hours}
                onChange={handleChange}
                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                required
              />
              {errors.usage_hours && (
                <span className="text-red-600 text-sm">
                  {errors.usage_hours[0]}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Obs
              </label>
              <textarea
                name="obs"
                value={formData.obs}
                onChange={handleChange}
                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
              />
              {errors.obs && (
                <span className="text-red-600 text-sm">{errors.obs[0]}</span>
              )}
            </div>
          </div>
          <div className="px-4 py-3 border-t border-gray-200 flex justify-end">
            <button
              type="button"
              onClick={onHide}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMaintenanceModal;
