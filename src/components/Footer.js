// src/components/Footer.js
import React from "react";
import packageJson from "../../package.json";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const creationYear = 2023; // Substitua pelo ano de criação da aplicação
  const version = packageJson.version;

  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 px-4">
            <h5 className="font-bold mb-2">Política</h5>
            <ul className="list-none">
              <li>
                <a href="#privacy" className="text-white hover:underline">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#lgpd" className="text-white hover:underline">
                  LGPD
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 px-4">
            <h5 className="font-bold mb-2">Empresa</h5>
            <ul className="list-none">
              <li>Nome da Empresa</li>
              <li>Telefone: (xx) xxxx-xxxx</li>
              <li>Email: contato@empresa.com</li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 px-4">
            <h5 className="font-bold mb-2">Sites</h5>
            <ul className="list-none">
              <li>
                <a href="#site1" className="text-white hover:underline">
                  Site da Empresa 1
                </a>
              </li>
              <li>
                <a href="#site2" className="text-white hover:underline">
                  Site da Empresa 2
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 px-4">
            <h5 className="font-bold mb-2">Institucional</h5>
            <ul className="list-none">
              <li>
                <a href="#about" className="text-white hover:underline">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#careers" className="text-white hover:underline">
                  Carreiras
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="mb-0">
            &copy; {creationYear} - {currentYear} - versão {version} by{" "}
            <a
              href="https://lexlam.com.br"
              className="text-white hover:underline"
            >
              Lexlam Electronics Of Brazil
            </a>
            . Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
