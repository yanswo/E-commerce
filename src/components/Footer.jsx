import { useState } from "react";
import styles from "./Footer.module.css";
import Modal from "./Modal";

const Footer = () => {
  const [isPurposeModalOpen, setIsPurposeModalOpen] = useState(false);
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h4>Sobre o Projeto</h4>
          <ul>
            <li onClick={() => setIsPurposeModalOpen(true)}>
              Propósito do Projeto
            </li>
            <li onClick={() => setIsTechModalOpen(true)}>Tecnologias Usadas</li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h4>Suporte</h4>
          <ul>
            <li>
              <a
                href="https://github.com/yanswo/e-commerce"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentação
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/yan-lucas-03128021a/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contato
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2025 Yan Lucas. Todos os direitos reservados.</p>
      </div>

      {isPurposeModalOpen && (
        <Modal
          title="Propósito do Projeto"
          onClose={() => setIsPurposeModalOpen(false)}
        >
          <p>
            O propósito deste projeto foi desenvolver um e-commerce como parte
            de meus estudos, visando aprimorar minhas habilidades em
            desenvolvimento front-end. O foco está na simulação de um ambiente
            real de e-commerce, com funcionalidades como consumo de API,
            filtragem de produtos, carrinho de compras, histórico de pedidos,
            além de sistemas de cadastro e login de usuários. O objetivo foi
            treinar essas habilidades e criar uma experiência completa para o
            usuário em um ambiente de loja virtual.
          </p>
        </Modal>
      )}

      {isTechModalOpen && (
        <Modal
          title="Tecnologias Usadas"
          onClose={() => setIsTechModalOpen(false)}
        >
          <ul>
            <li>React</li>
            <li>CSS (Módulos)</li>
            <li>JavaScript</li>
            <li>Context API</li>
            <li>JSON Server</li>
            <li>Consumo de API</li>
            <li>React Routes</li>
          </ul>
        </Modal>
      )}
    </footer>
  );
};

export default Footer;
