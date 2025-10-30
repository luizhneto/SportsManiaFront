import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bottom-0 left-0 w-full bg-black text-white p-4 mt-6">
      <div className="flex justify-center gap-6">
        {/* Facebook */}
        <a
          href="https://web.facebook.com/smsportsmania"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-yellow-500"
        >
          <FaFacebook />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/sm_sportsmania/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-yellow-500"
        >
          <FaInstagram />
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/5581991820455"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-yellow-500"
        >
          <FaWhatsapp />
        </a>
      </div>

      <div className="text-center mt-4">
        <p>Endereço: Rua Pedro Allain, 81 - Loja: 5 - Casa Amarela, Recife - PE, 52070-210</p>
        <p>&copy; 2025 SM_SportsMania. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
