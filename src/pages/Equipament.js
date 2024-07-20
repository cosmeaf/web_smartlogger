import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import LoadPage from "../components/LoadPage";
import DeleteEquipamentModal from "../components/DeleteEquipamentModal";
import api from "../services/api";

const Equipament = () => {
  const [equipament, setEquipament] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEquipamentId, setSelectedEquipamentId] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy HH:mm:ss");
  };

  useEffect(() => {
    const fetchEquipament = async () => {
      try {
        const response = await api.get("/equipament/");
        setEquipament(response.data);
      } catch (error) {
        console.error("Failed to fetch equipment", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEquipament();
  }, []);

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
      <HeaderLoggedIn />
      <div className="container mx-auto my-5">
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
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="overflow-auto">
            <table className="min-w-full bg-white text-xs table-auto">
              <thead className="bg-gray-200">
                <tr className="text-center">
                  <th className="py-2 px-4 border-b">Identificação GPS</th>
                  <th className="py-2 px-4 border-b">Nome</th>
                  <th className="py-2 px-4 border-b">Modelo</th>
                  <th className="py-2 px-4 border-b">Combustível</th>
                  <th className="py-2 px-4 border-b">
                    Horímetro Inicial Suntech
                  </th>
                  <th className="py-2 px-4 border-b">
                    Horímetro Inicial Máquina
                  </th>
                  <th className="py-2 px-4 border-b">Hora Trabalhada</th>
                  <th className="py-2 px-4 border-b">Atualizado</th>
                  <th className="py-2 px-4 border-b">Ações</th>
                </tr>
              </thead>
              <tbody className="striped">
                {currentItems.map((equip, index) => (
                  <tr key={index} className="border-t hover:bg-gray-100">
                    <td className="py-1 px-2 border-b">{equip.device}</td>
                    <td className="py-1 px-2 border-b">{equip.nome}</td>
                    <td className="py-1 px-2 border-b">{equip.modelo}</td>
                    <td className="py-1 px-2 border-b">{equip.combustivel}</td>
                    <td className="py-1 px-2 border-b">
                      {equip.horimetro_inicialSuntech}
                    </td>
                    <td className="py-1 px-2 border-b">
                      {equip.horimetro_inicialMaquina}
                    </td>
                    <td className="py-1 px-2 border-b">
                      {equip.horas_trabalhadas}
                    </td>
                    <td className="py-1 px-2 border-b">
                      {formatDate(equip.updated_at)}
                    </td>
                    <td className="py-1 px-2 border-b flex justify-center space-x-2">
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
                  onClick={() => paginate(number)}
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

      <DeleteEquipamentModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onDelete={async () => {
          await api.delete(`/equipament/${selectedEquipamentId}/`);
          setEquipament(
            equipament.filter((item) => item.id !== selectedEquipamentId)
          );
          setShowDeleteModal(false);
        }}
      />
    </>
  );
};

export default Equipament;
