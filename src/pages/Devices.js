import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import api from "../services/api";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import ProgressBar from "../components/ProgressBar";
import Breadcrumb from "../components/Breadcrumb";
import "../components/css/Devices.css";

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const logoutUser = useCallback(() => {
    // Limpar dados do usuário e redirecionar para a página de login
    localStorage.clear();
    navigate("/login");
  }, [navigate]);

  const fetchData = useCallback(async () => {
    try {
      const [devicesResponse, equipmentsResponse] = await Promise.all([
        api.get("/device/"),
        api.get("/equipament/"),
      ]);
      setDevices(devicesResponse.data);
      setEquipments(equipmentsResponse.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
      if (error.response && error.response.status === 401) {
        logoutUser();
      } else {
        setError(error.message || "An unknown error occurred.");
      }
    }
  }, [logoutUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Formatar Horas
  const formatDateTime = (dateTime) => {
    return format(new Date(dateTime), "dd/MM/yyyy HH:mm:ss");
  };

  const breadcrumbItems = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Lista dos Horímetros" },
  ];

  // Get Equipamento Id
  const getEquipamentLink = (deviceId) => {
    const equipament = equipments.find((e) => e.device.device_id === deviceId);
    if (equipament) {
      navigate(`/dashboard/maintenance/${equipament.id}`);
    } else {
      console.error("Equipament not found for deviceId:", deviceId);
    }
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
      <ProgressBar
        color="#f39c12"
        size="2px"
        second={10}
        onComplete={fetchData}
      />
      <div className="container-fluid mx-auto my-2">
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
          <h2 className="text-xl font-bold">Lista dos Horímetros</h2>
          <h6 className="text-md">Registros Encontrados: {devices.length}</h6>
        </div>
        <Breadcrumb items={breadcrumbItems} />

        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="overflow-auto">
            <table className="min-w-full bg-white text-xs table-auto">
              <thead className="bg-gray-200 text-xs">
                <tr className="text-center">
                  <th className="py-2 px-4 border-b">ID do Equipamento</th>
                  <th className="py-2 px-4 border-b">Horímetro</th>
                  <th className="py-2 px-4 border-b">
                    Velocidade de Pico (Km/h)
                  </th>
                  <th className="py-2 px-4 border-b">
                    Temperatura de Pico (°C)
                  </th>
                  <th className="py-2 px-4 border-b">Impacto Pico</th>
                  <th className="py-2 px-4 border-b">Hodômetro GPS</th>
                  <th className="py-2 px-4 border-b">ID Condutor</th>
                  <th className="py-2 px-4 border-b">SoC Bateria</th>
                  <th className="py-2 px-4 border-b">Atualizado</th>
                  <th className="py-2 px-4 border-b">Ações</th>
                </tr>
              </thead>
              <tbody className="striped">
                {currentItems.map((device, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-100 text-center"
                  >
                    <td className="py-1 px-2 border-b">{device.device_id}</td>
                    <td className="py-1 px-2 border-b">{device.horimeter}</td>
                    <td className="py-1 px-2 border-b">
                      {device.velocidade_pico}
                    </td>
                    <td className="py-1 px-2 border-b">
                      {device.temperatura_pico}
                    </td>
                    <td className="py-1 px-2 border-b">{device.impact}</td>
                    <td className="py-1 px-2 border-b">
                      {device.GPS_odometer}
                    </td>
                    <td className="py-1 px-2 border-b">{device.RFID}</td>
                    <td className="py-1 px-2 border-b">
                      {device.SoC_battery_voltage}
                    </td>
                    <td className="py-1 px-2 border-b">
                      {formatDateTime(device.updated_at)}
                    </td>
                    <td className="py-2 px-2 flex space-x-2 justify-center">
                      <Link
                        to={`/dashboard/device/detail/${device.id}`}
                        className="text-green-500 hover:text-green-700"
                      >
                        <i className="fas fa-info-circle"></i>
                      </Link>
                      <button
                        className="text-red-500 hover:text-red-700"
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
