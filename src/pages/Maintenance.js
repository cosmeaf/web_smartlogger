import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import LoadPage from "../components/LoadPage";
import CreateMaintenanceModal from "../components/CreateMaintenanceModal";
import api from "../services/api";

const Maintenance = () => {
  const { id } = useParams(); // 'id' é o equipamento_id passado pela URL
  const [maintenances, setMaintenances] = useState([]);
  const [equipament, setEquipament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchEquipament = async () => {
      try {
        const response = await api.get(`/equipament/${id}`);
        setEquipament(response);
      } catch (error) {
        console.error("Failed to fetch equipament", error);
      }
    };

    const fetchMaintenances = async () => {
      try {
        const response = await api.get(`/maintenance/?equipament_id=${id}`);
        setMaintenances(response);
      } catch (error) {
        console.error("Failed to fetch maintenances", error);
        setMaintenances([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEquipament();
      fetchMaintenances();
    }
  }, [id]);

  const handleCreateMaintenance = (newMaintenance) => {
    setMaintenances((prevMaintenances) => [
      ...prevMaintenances,
      newMaintenance,
    ]);
  };

  const handleUpdateField = async (maintenanceId, field, value) => {
    try {
      setMaintenances((prevMaintenances) =>
        prevMaintenances.map((maintenance) =>
          maintenance.id === maintenanceId
            ? { ...maintenance, [field]: value }
            : maintenance
        )
      );

      await api.patch(`/maintenance/${maintenanceId}/`, { [field]: value });
    } catch (error) {
      console.error("Failed to update maintenance", error);
    }
  };

  const handleResetField = async (maintenanceId) => {
    try {
      await api.post(`/maintenance/${maintenanceId}/reset_usage_hours/`);
      const updatedMaintenances = maintenances.map((maintenance) =>
        maintenance.id === maintenanceId
          ? { ...maintenance, usage_hours: 0 }
          : maintenance
      );
      setMaintenances(updatedMaintenances);
    } catch (error) {
      console.error("Failed to reset maintenance", error);
    }
  };

  const handleDeleteMaintenance = async (maintenanceId) => {
    try {
      await api.delete(`/maintenance/${maintenanceId}/`);
      setMaintenances((prevMaintenances) =>
        prevMaintenances.filter(
          (maintenance) => maintenance.id !== maintenanceId
        )
      );
    } catch (error) {
      console.error("Failed to delete maintenance", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = maintenances.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(maintenances.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {loading && <LoadPage />}
      <HeaderLoggedIn />
      <div className="container-fluid mx-auto my-4">
        <div className="flex justify-between items-center mb-3">
          <h6 className="text-lg font-bold">
            Manutenções | Equipamento:{" "}
            {equipament ? equipament.device : "Carregando..."}
          </h6>
          <button
            className="inline-flex items-center px-3 py-2 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-700"
            onClick={() => setShowCreateModal(true)}
          >
            <i className="fas fa-plus mr-1"></i> Cadastrar Manutenção
          </button>
        </div>

        <div className="w-full bg-white shadow-lg rounded-lg p-4 overflow-auto">
          <div className="flex justify-center">
            <table className="min-w-full bg-white text-xs">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Nome do Alarme</th>
                  <th className="py-2 px-4 border-b">Relatórios</th>
                  <th className="py-2 px-4 border-b">Horas de uso Peça</th>
                  <th className="py-2 px-4 border-b">Horas para Alarme</th>
                  <th className="py-2 px-4 border-b">Horas Restantes</th>
                  <th className="py-2 px-4 border-b">Ações</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((maintenance, index) => {
                  if (!maintenance.name) {
                    console.error(
                      "Maintenance data is missing properties:",
                      maintenance
                    );
                    return (
                      <tr key={index} className="border-t hover:bg-gray-100">
                        <td className="py-1 px-2 border-b" colSpan="6">
                          Invalid Maintenance Data
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={index} className="border-t hover:bg-gray-100">
                      <td className="py-1 px-2 border-b">{maintenance.name}</td>
                      <td className="py-1 px-2 border-b">
                        <button className="text-blue-500 hover:text-blue-700">
                          Relatório
                        </button>
                      </td>
                      <td className="py-1 px-2 border-b">
                        <input
                          type="number"
                          value={maintenance.usage_hours}
                          onChange={(e) =>
                            handleUpdateField(
                              maintenance.id,
                              "usage_hours",
                              e.target.value
                            )
                          }
                          className="border rounded p-1"
                        />
                        <button
                          className="text-red-500 hover:text-red-700 ml-2"
                          onClick={() => handleResetField(maintenance.id)}
                        >
                          Zerar
                        </button>
                      </td>
                      <td className="py-1 px-2 border-b">
                        <input
                          type="number"
                          value={maintenance.alarm_hours}
                          onChange={(e) =>
                            handleUpdateField(
                              maintenance.id,
                              "alarm_hours",
                              e.target.value
                            )
                          }
                          className="border rounded p-1"
                        />
                      </td>
                      <td className="py-1 px-2 border-b">
                        {maintenance.remaining_hours}
                      </td>
                      <td className="py-1 px-2 border-b flex justify-center space-x-2">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() =>
                            handleDeleteMaintenance(maintenance.id)
                          }
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
        </div>

        <nav className="flex justify-center mt-3">
          <ul className="pagination">
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <button
                  onClick={() => paginate(number)}
                  className="page-link text-xs"
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <CreateMaintenanceModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onCreate={handleCreateMaintenance}
        equipamentId={id} // Passando equipamentId aqui
      />
    </>
  );
};

export default Maintenance;
