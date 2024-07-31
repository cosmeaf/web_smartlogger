import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import LoadPage from "../components/LoadPage";
import Breadcrumb from "../components/Breadcrumb";
import api from "../services/api";

const EquipamentDetail = () => {
  const { id } = useParams();
  const [equipament, setEquipament] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipament = async () => {
      try {
        const response = await api.get(`/equipament/${id}/`);
        setEquipament(response.data);
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

  const breadcrumbItems = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Equipamentos", link: "/dashboard/equipament" },
    { name: "Detalhes do Equipamento" },
  ];

  return (
    <>
      {loading && <LoadPage />}
      <HeaderLoggedIn />
      <div className="container mx-auto my-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-gray-800">
            Detalhes do Equipamento
          </h2>
        </div>
        <Breadcrumb items={breadcrumbItems} />
        <div className="bg-white shadow-md rounded-lg p-6">
          {equipament ? (
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800">Detalhes</h3>
                <p className="text-gray-600">
                  Informações detalhadas sobre o equipamento.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Nome:</span>
                  <span className="ml-2 text-gray-900">{equipament.nome}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Dispositivo:
                  </span>
                  <span className="ml-2 text-gray-900">
                    {equipament.device.device_id}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Modelo:</span>
                  <span className="ml-2 text-gray-900">
                    {equipament.modelo}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Combustível:
                  </span>
                  <span className="ml-2 text-gray-900">
                    {equipament.combustivel}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Horas Iniciais Suntech:
                  </span>
                  <span className="ml-2 text-gray-900">
                    {equipament.horimetro_inicialSuntech}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Horas Iniciais da Máquina:
                  </span>
                  <span className="ml-2 text-gray-900">
                    {equipament.horimetro_inicialMaquina}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Horas Trabalhadas:
                  </span>
                  <span className="ml-2 text-gray-900">
                    {equipament.horas_trabalhadas}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Atualizado Em:
                  </span>
                  <span className="ml-2 text-gray-900">
                    {formatDate(equipament.updated_at)}
                  </span>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <span className="font-semibold text-gray-700">
                    Observações:
                  </span>
                  <span className="ml-2 text-gray-900">{equipament.obs}</span>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  to="/dashboard/equipament"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Voltar
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-gray-700">
              Nenhum detalhe disponível para este equipamento.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default EquipamentDetail;
