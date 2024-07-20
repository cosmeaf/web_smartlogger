import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import api from "../services/api";
import "../components/css/Devices.css";

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [maintenances, setMaintenances] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await api.get("/device/");
        setDevices(response.data);
      } catch (error) {
        console.error("Failed to fetch devices", error);
        setError(error);
      }
    };
    fetchDevices();
  }, []);

  useEffect(() => {
    const fetchEquipament = async () => {
      try {
        const response = await api.get("/equipament/");
        setEquipments(response.data);
      } catch (error) {
        console.error("Failed to fetch equipment", error);
      }
    };
    fetchEquipament();
  }, []);

  useEffect(() => {
    const fetchMaintenances = async () => {
      try {
        const response = await api.get("/maintenance/");
        setMaintenances(response.data);
      } catch (error) {
        console.error("Failed to fetch equipment", error);
      }
    };
    fetchMaintenances();
  }, []);

  // Get Equipamento Id
  const getEquipamentLink = (deviceId) => {
    const equipament = equipments.find((e) => e.device === deviceId);
    console.log("Device ID:", deviceId); // Log Device ID
    console.log("Equipament found:", equipament); // Log Equipament found
    if (equipament) {
      navigate(`/dashboard/maintenance/${equipament.id}`);
    } else {
      console.error("Equipament not found for deviceId:", deviceId);
    }
  };

  // Código para Tabela
  const getRowClass = (deviceId) => {
    const equipament = equipments.find((e) => e.device.device_id === deviceId);
    if (!equipament) return "";

    const maintenance = maintenances.find(
      (m) => m.equipament === equipament.id && m.os
    );
    if (!maintenance) return "";

    const remainingHours = maintenance.remaining_hours;
    if (remainingHours <= 0) return "bg-red-500";
    if (remainingHours <= 100) return "bg-yellow-500";
    return "bg-orange-500";
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = devices.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(devices.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="devices-page">
      <HeaderLoggedIn />
      <div className="container mx-auto my-5">
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-bold">Lista dos Horímetros</h1>
          <h6 className="text-md">Registros Encontrados: {devices.length}</h6>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="overflow-auto">
            <table className="min-w-full bg-white text-xs table-auto">
              <thead className="bg-gray-200">
                <tr className="text-center">
                  <th className="py-2 px-4 border-b">Id do Equipamento</th>
                  <th className="py-2 px-4 border-b">Horímetro</th>
                  <th className="py-2 px-4 border-b">
                    Velocidade de Pico (Km/h)
                  </th>
                  <th className="py-2 px-4 border-b">
                    Temperatura de Pico (°C)
                  </th>
                  <th className="py-2 px-4 border-b">Impacto Pico</th>
                  <th className="py-2 px-4 border-b">Horas Restantes</th>
                  <th className="py-2 px-4 border-b">Atualizado</th>
                  <th className="py-2 px-4 border-b">Ações</th>
                </tr>
              </thead>
              <tbody className="striped">
                {currentItems.map((device, index) => (
                  <tr
                    key={index}
                    className={`border-t hover:bg-gray-100 ${getRowClass(
                      device.device_id
                    )}`}
                  >
                    <td className="py-1 px-2 border-b">{device.device_id}</td>
                    <td className="py-1 px-2 border-b">{device.horimeter}</td>
                    <td className="py-1 px-2 border-b">
                      {device.velocidade_pico}
                    </td>
                    <td className="py-1 px-2 border-b">
                      {device.temperatura_pico}
                    </td>
                    <td className="py-1 px-2 border-b">
                      {device.impacto_pico}
                    </td>
                    <td className="py-1 px-2 border-b">
                      {device.horas_restantes}
                    </td>
                    <td className="py-1 px-2 border-b">{device.updated_at}</td>
                    <td className="py-1 px-2 border-b flex space-x-2 justify-center">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() =>
                          navigate(`/devices/edit/${device.device_id}`)
                        }
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <Link
                        to={`/dashboard/device/detail/${device.device_id}`}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <i className="fas fa-info-circle"></i>
                      </Link>
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => getEquipamentLink(device.device_id)}
                      >
                        <i className="fas fa-tools"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <label htmlFor="itemsPerPage" className="mr-2">
                Linhas por página:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="border rounded p-1"
              >
                <option value={10}>10</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <nav className="flex space-x-1">
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`px-2 py-1 rounded ${
                    currentPage === number
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {number}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devices;
