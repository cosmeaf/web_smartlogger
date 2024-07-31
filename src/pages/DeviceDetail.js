import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import LoadPage from "../components/LoadPage";
import Breadcrumb from "../components/Breadcrumb";
import api from "../services/api";

const DeviceDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [device, setDevice] = useState(null);
  const [error, setError] = useState(null);

  const fetchDevice = useCallback(async () => {
    try {
      const response = await api.get(`/device/${id}/`);
      setDevice(response.data);
    } catch (error) {
      console.error("Error fetching device data", error);
      setError(error.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDevice();
  }, [fetchDevice]);

  const breadcrumbItems = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Devices", link: "/dashboard/devices" },
    { name: "Lista dos Horímetros" },
  ];

  return (
    <>
      {loading && <LoadPage />}
      <HeaderLoggedIn />
      <div className="container mx-auto my-2">
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Detalhes do Dispositivo</h2>
        </div>
        {device && (
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <form>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      HDR:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">{device.HDR}</p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Identificador:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.device_id}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Report Map:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.report_map}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Modelo:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.model}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Versão do Software:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.software_version}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Tipo de Mensagem:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.message_type}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Data:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">{device.data}</p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Hora:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">{device.hora}</p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Latitude:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.latitude}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Longitude:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.longitude}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Velocidade GPS:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.speed_gps}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Curso:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.course}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Satélites:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.satellites}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Status de Fix:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.fix_status}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Estado de Entrada:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.in_state}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Estado de Saída:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.out_state}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Modo:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">{device.mode}</p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Tipo de Relatório:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.report_type}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Número da Mensagem:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.message_number}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Reservado:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.reserved}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Mapa Atribuído:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.assign_map}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Voltagem de Energia:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.power_voltage}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Bateria Suntech:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.bateria_suntech}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Conexão RAT:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.connection_rat}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Aceleração X:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.acceleration_x}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Aceleração Y:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.acceleration_y}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Aceleração Z:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.acceleration_z}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      ADC:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">{device.adc}</p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-700">
                      Relatório Acumulado:
                    </label>
                    <p className="w-2/3 text-sm text-gray-900">
                      {device.accumulated_report}
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DeviceDetail;
