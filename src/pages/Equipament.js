import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import LoadPage from "../components/LoadPage";
import Breadcrumb from "../components/Breadcrumb";
import DeleteEquipamentModal from "../components/DeleteEquipamentModal";
import ProgressBar from "../components/ProgressBar";
import api from "../services/api";

const Equipament = () => {
  const [equipament, setEquipament] = useState([]);
  const [maintenanceColors, setMaintenanceColors] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEquipamentId, setSelectedEquipamentId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const breadcrumbItems = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Equipamentos" },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy HH:mm:ss");
  };

  const fetchEquipament = useCallback(async () => {
    try {
      const response = await api.get("/equipament/");
      console.log("Contagem de página:", new Date().toLocaleString());
      setEquipament(response.data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch equipment", error);
      setError("Não foi possível carregar os dados dos equipamentos.");
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const fetchMaintenance = async () => {
    try {
      const response = await api.get("/maintenance/");
      // Lógica de cor
      const colors = {};
      response.data.forEach((maintenance) => {
        if (maintenance.os) {
          let color = "bg-yellow-100"; // Amarelo claro para manutenção ativa
          const remainingHours = maintenance.remaining_hours;
          if (remainingHours >= 0) {
            color = "bg-yellow-100";
          } else if (remainingHours >= -50) {
            color = "bg-yellow-300"; // Amarelo
          } else if (remainingHours >= -100) {
            color = "bg-orange-300"; // Laranja claro
          } else {
            color = "bg-red-300"; // Vermelho
          }
          colors[maintenance.equipament] = color;
        }
      });

      setMaintenanceColors(colors);
    } catch (error) {
      console.error("Failed to fetch Maintenance", error);
    }
  };

  useEffect(() => {
    fetchEquipament();
    fetchMaintenance();

    const intervalId = setInterval(() => {
      fetchEquipament();
      fetchMaintenance();
    }, 60000); // Atualiza a cada 60 segundos

    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
  }, [fetchEquipament]);

  // Lógica para itens da página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(equipament)
    ? equipament.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  // Lógica para números de página
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(equipament.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      {loading && <LoadPage />}
      {error && <div className="error-message">{error}</div>}
      <HeaderLoggedIn />
      <ProgressBar
        color="#f39c12"
        size="2px"
        second={10}
        onComplete={fetchEquipament}
      />
      <div className="container-fluid mx-auto my-2">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-bold">
            Equipamentos | Total: {equipament.length}
          </h1>
          <Link
            to="/dashboard/equipament/create"
            className="inline-flex items-center px-3 py-2 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-700"
          >
            <i className="fas fa-plus mr-1"></i> Cadastrar
          </Link>
        </div>

        <Breadcrumb items={breadcrumbItems} />

        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="overflow-auto">
            <table className="min-w-full bg-white text-xs table-auto">
              <thead className="bg-gray-200 text-center">
                <tr className="text-center">
                  <th className="py-2 px-4 border-b">ID Dispositivo</th>
                  <th className="py-2 px-4 border-b">Nome</th>
                  <th className="py-2 px-4 border-b">Modelo</th>
                  <th className="py-2 px-4 border-b">
                    Velocidade de Pico (Km/h)
                  </th>
                  <th className="py-2 px-4 border-b">
                    Temperatura de Pico (°C)
                  </th>
                  <th className="py-2 px-4 border-b">Impacto Pico</th>
                  <th className="py-2 px-4 border-b">SoC Bateria</th>
                  <th className="py-2 px-4 border-b">ID Condutor</th>
                  <th className="py-2 px-4 border-b">Horas Restantes</th>
                  <th className="py-2 px-4 border-b">Horas Trabalhadas</th>
                  <th className="py-2 px-4 border-b">Atualizado</th>
                  <th className="py-2 px-4 border-b">Ações</th>
                </tr>
              </thead>
              <tbody className="striped">
                {currentItems.map((equip, index) => {
                  const backgroundColor = maintenanceColors[equip.id] || "";

                  return (
                    <tr
                      key={index}
                      className={`border-t hover:bg-gray-100 text-center ${backgroundColor}`}
                    >
                      <td className="py-1 px-2 border-b">
                        {equip.device?.device_id}
                      </td>
                      <td className="py-1 px-2 border-b">{equip.name}</td>
                      <td className="py-1 px-2 border-b">{equip.model}</td>
                      <td className="py-1 px-2 border-b">
                        {equip.device?.velocidade_pico || "N/A"}
                      </td>
                      <td className="py-1 px-2 border-b">
                        {equip.device?.temperatura_pico || "N/A"}
                      </td>
                      <td className="py-1 px-2 border-b">
                        {equip.device?.impact || "N/A"}
                      </td>
                      <td className="py-1 px-2 border-b">
                        {equip.device?.SoC_battery_voltage || "N/A"}
                      </td>
                      <td className="py-1 px-2 border-b">
                        {equip.device?.RFID || "N/A"}
                      </td>
                      <td className="py-1 px-2 border-b">
                        {equip.available_hours_per_month || "N/A"}
                      </td>
                      <td className="py-1 px-2 border-b">{equip.work_hour}</td>
                      <td className="py-1 px-2 border-b">
                        {formatDate(equip.updated_at)}
                      </td>
                      <td className="py-2 px-2 flex justify-center space-x-2">
                        <Link
                          to={`/dashboard/equipament/edit/${equip.id}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <Link
                          to={`/dashboard/equipament/detail/${equip.id}`}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <i className="fas fa-info-circle"></i>
                        </Link>
                        <Link
                          to={`/dashboard/maintenance/${equip.id}`}
                          className="text-green-500 hover:text-green-700"
                        >
                          <i className="fas fa-tools"></i>
                        </Link>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => {
                            setSelectedEquipamentId(equip.id);
                            setShowDeleteModal(true);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
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
                className="border rounded px-2 py-1"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div>
              <nav>
                <ul className="pagination">
                  {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                      <button
                        onClick={() => paginate(number)}
                        className={`page-link ${
                          number === currentPage ? "bg-blue-500 text-white" : ""
                        }`}
                      >
                        {number}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
        {showDeleteModal && (
          <DeleteEquipamentModal
            id={selectedEquipamentId}
            onClose={() => setShowDeleteModal(false)}
            onDelete={() => {
              fetchEquipament();
              fetchMaintenance();
              setShowDeleteModal(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default Equipament;
