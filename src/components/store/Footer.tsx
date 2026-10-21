import React from 'react';
import { Truck, RotateCcw, Headset } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-widget">
            <div className="footer-contact-item">
              <Truck className="footer-icon" />
              <div className="footer-contact-text">
                <h5>Envío y Devolución Gratis</h5>
                <p>Envío gratis en pedidos mayores a S/ 200.</p>
              </div>
            </div>
            <div className="footer-contact-item">
              <RotateCcw className="footer-icon" />
              <div className="footer-contact-text">
                <h5>Garantía de Devolución</h5>
                <p>100% de devolución de tu dinero.</p>
              </div>
            </div>
            <div className="footer-contact-item">
              <Headset className="footer-icon" />
              <div className="footer-contact-text">
                <h5>Soporte en línea</h5>
                <p>Estamos aquí para ayudarte.</p>
              </div>
            </div>
          </div>

          <div className="footer-widget">
            <h4>Cuenta</h4>
            <ul className="footer-links">
              <li><a href="#cuenta">Mi Cuenta</a></li>
              <li><a href="#pedidos">Rastrear mi pedido</a></li>
              <li><a href="#pagos">Métodos de Pago</a></li>
              <li><a href="#envio">Guía de Envío</a></li>
              <li><a href="#faq">Preguntas Frecuentes</a></li>
              <li><a href="#soporte">Soporte del Producto</a></li>
              <li><a href="#privacidad">Privacidad</a></li>
            </ul>
          </div>

          <div className="footer-widget">
            <h4>Nosotros</h4>
            <ul className="footer-links">
              <li><a href="#acerca">Acerca de Porto</a></li>
              <li><a href="#garantias">Nuestras Garantías</a></li>
              <li><a href="#terminos">Términos y Condiciones</a></li>
              <li><a href="#privacidad-politica">Política de Privacidad</a></li>
              <li><a href="#devoluciones">Política de Devolución</a></li>
              <li><a href="#propiedad">Reclamos de Propiedad Intelectual</a></li>
              <li><a href="#mapa">Mapa del Sitio</a></li>
            </ul>
          </div>

          <div className="footer-widget">
            <h4>Síguenos</h4>
            <div className="social-icons">
              <a href="#facebook" className="social-icon" aria-label="Facebook"><FaFacebook size={16} /></a>
              <a href="#twitter" className="social-icon" aria-label="Twitter"><FaTwitter size={16} /></a>
              <a href="#instagram" className="social-icon" aria-label="Instagram"><FaInstagram size={16} /></a>
              <a href="#linkedin" className="social-icon" aria-label="LinkedIn"><FaLinkedin size={16} /></a>
            </div>
            
            <h4 style={{ marginTop: '30px' }}>Métodos de Pago</h4>
            <div className="payment-methods">
              <div style={{ background: '#fff', color: '#000', padding: '2px 5px', fontSize: '10px', fontWeight: 'bold' }}>PayPal</div>
              <div style={{ background: '#fff', color: '#000', padding: '2px 5px', fontSize: '10px', fontWeight: 'bold' }}>VISA</div>
              <div style={{ background: '#fff', color: '#000', padding: '2px 5px', fontSize: '10px', fontWeight: 'bold' }}>MasterCard</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© copyright 2026. Todos los derechos reservados.</p>
          <div className="footer-bottom-links">
            <a href="#afiliados">Afiliados</a>
            <a href="#privacidad-footer">Política de Privacidad</a>
            <a href="#terminos-footer">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
