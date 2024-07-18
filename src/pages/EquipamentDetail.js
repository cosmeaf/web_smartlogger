import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import LoadPage from "../components/LoadPage";
import "../components/css/Equipament.css";
import api from "../services/api";

const EquipamentDetail = () => {
  const { id } = useParams();
  const [equipament, setEquipament] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipament = async () => {
      try {
        const response = await api.get(`/equipament/${id}/`);
        setEquipament(response);
      } catch (error) {
        console.error("Failed to fetch equipament details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEquipament();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy HH:mm:ss");
  };

  return (
    <>
      {loading && <LoadPage />}
      <HeaderLoggedIn />
      <div className="container-fluid mx-auto my-4">
        <h6 className="text-lg font-bold text-gray-800 mb-4">
          Equipment Details
        </h6>
        <div className="w-full h-1/2 bg-white shadow-lg rounded-lg p-6 overflow-auto">
          {equipament ? (
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Detail
                </h2>
                <p className="text-gray-600">
                  Detailed information about the equipment.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold text-gray-700">Name:</span>
                  <span className="ml-2 text-gray-900">{equipament.nome}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Device:</span>
                  <span className="ml-2 text-gray-900">
                    {equipament.device}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Model:</span>
                  <span className="ml-2 text-gray-900">
                    {equipament.modelo}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Fuel:</span>
                  <span className="ml-2 text-gray-900">
                    {equipament.combustivel}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Initial Suntech Hours:
                  </span>
                  <span className="ml-2 text-gray-900">
                    {equipament.horimetro_inicialSuntech}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Initial Machine Hours:
                  </span>
                  <span className="ml-2 text-gray-900">
                    {equipament.horimetro_inicialMaquina}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Worked Hours:
                  </span>
                  <span className="ml-2 text-gray-900">
                    {equipament.horas_trabalhadas}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Updated At:
                  </span>
                  <span className="ml-2 text-gray-900">
                    {formatDate(equipament.updated_at)}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="font-semibold text-gray-700">
                    Observations:
                  </span>
                  <span className="ml-2 text-gray-900">{equipament.obs}</span>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  to="/dashboard/equipament"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Back
                </Link>
              </div>
            </div>
          ) : (
            <p>No details available for this equipment.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default EquipamentDetail;
