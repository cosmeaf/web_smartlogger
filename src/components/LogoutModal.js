import React from "react";
import useAuth from "../context/UseAuth";

const LogoutModal = ({ show, onHide }) => {
  const { logoutUser } = useAuth();

  if (!show) return null;

  const handleLogout = async () => {
    onHide();
    await logoutUser();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-2xl font-bold text-center w-full">
            Sair do Sistema
          </h3>
          <button className="text-black focus:outline-none" onClick={onHide}>
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="M14.53 4.47a.75.75 0 00-1.06-1.06L9 7.94 4.53 3.47A.75.75 0 103.47 4.53L7.94 9l-4.47 4.47a.75.75 0 001.06 1.06L9 10.06l4.47 4.47a.75.75 0 001.06-1.06L10.06 9l4.47-4.47z"></path>
            </svg>
          </button>
        </div>
        <div className="text-center mb-4">
          <p>Tem certeza que deseja se desconectar?</p>
          <p>Confirme sua decisão para continuar.</p>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="focus:outline-none px-4 py-2 bg-gray-200 rounded-lg text-black hover:bg-gray-300"
            onClick={onHide}
          >
            Cancelar
          </button>
          <button
            className="focus:outline-none px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-400"
            onClick={handleLogout}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
