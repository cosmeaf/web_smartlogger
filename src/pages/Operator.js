import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import LoadPage from "../components/LoadPage";
import Breadcrumb from "../components/Breadcrumb";
import api from "../services/api";
import DeleteOperatorModal from "../components/DeleteOperatorModal";

const Operator = () => {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOperatorId, setSelectedOperatorId] = useState(null);

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const response = await api.get("/profile/");
        setOperators(response.data);
      } catch (error) {
        console.error("Failed to fetch operators", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOperators();
  }, []);

  const handleDelete = async () => {
    try {
      await api.delete(`/profile/${selectedOperatorId}/`);
      setOperators(
        operators.filter((operator) => operator.id !== selectedOperatorId)
      );
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete operator", error);
    }
  };

  const breadcrumbItems = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Operators" },
  ];

  return (
    <>
      {loading && <LoadPage />}
      <HeaderLoggedIn />
      <div className="container mx-auto my-2">
        <h1 className="text-xl font-bold mb-4">Operadores</h1>
        <div className="flex justify-between items-center mb-3">
          <Breadcrumb items={breadcrumbItems} />
          <Link
            to="/dashboard/operator/create"
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
                  <th className="py-2 px-4 border-b">Nome</th>
                  <th className="py-2 px-4 border-b">Sobrenome</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Telefone</th>
                  <th className="py-2 px-4 border-b">Departamento</th>
                  <th className="py-2 px-4 border-b">Cargo</th>
                  <th className="py-2 px-4 border-b">Ações</th>
                </tr>
              </thead>
              <tbody>
                {operators.map((operator) => (
                  <tr
                    key={operator.id}
                    className="border-t hover:bg-gray-100 text-center"
                  >
                    <td className="py-1 px-2 border-b">
                      {operator.first_name}
                    </td>
                    <td className="py-1 px-2 border-b">{operator.last_name}</td>
                    <td className="py-1 px-2 border-b">{operator.email}</td>
                    <td className="py-1 px-2 border-b">
                      {operator.phone_number}
                    </td>
                    <td className="py-1 px-2 border-b">
                      {operator.department}
                    </td>
                    <td className="py-1 px-2 border-b">{operator.position}</td>
                    <td className="py-2 px-2 flex space-x-2 justify-center">
                      <Link
                        to={`/dashboard/operator/edit/${operator.id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                      <Link
                        to={`/dashboard/operator/detail/${operator.id}`}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <i className="fas fa-info-circle"></i>
                      </Link>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          setSelectedOperatorId(operator.id);
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
        </div>
      </div>
      <DeleteOperatorModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Operator;
