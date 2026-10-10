import { 
  Search, 
  User, 
  Heart, 
  ShoppingCart,
  Truck,
  RotateCcw,
  Headset,
  CreditCard
} from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function App() {
  const featuredProducts = [
    {
      id: 1,
      name: "Oxford Negro Clásico",
      category: "HOMBRE, FORMAL",
      price: "S/ 250.00",
      oldPrice: "S/ 320.00",
      image: "/shoes/1.png",
      badge: "-20%"
    },
    {
      id: 2,
      name: "Brogue Marrón de Cuero",
      category: "HOMBRE, FORMAL",
      price: "S/ 320.00",
      image: "/shoes/2.png",
    },
    {
      id: 3,
      name: "Monk Strap Burdeos",
      category: "MODA, HOMBRE",
      price: "S/ 280.00",
      oldPrice: "S/ 350.00",
      image: "/shoes/3.png",
      badge: "OFERTA",
      countdown: "LA OFERTA TERMINA EN 2 DÍAS"
    },
    {
      id: 4,
      name: "Derby Color Canela",
      category: "HOMBRE, FORMAL",
      price: "S/ 300.00",
      image: "/shoes/4.png",
    }
  ];

  const bestSellers = [
    {
      id: 5,
      name: "Oxford Formal Premium",
      category: "MODA, HOMBRE, VENTA",
      price: "S/ 220.00",
      image: "/shoes/5.png",
    },
    {
      id: 6,
      name: "Zapato de Vestir Marrón",
      category: "HOMBRE",
      price: "S/ 240.00 - S/ 260.00",
      image: "/shoes/6.png",
    },
    {
      id: 7,
      name: "Derby Elegante",
      category: "HOMBRE, FORMAL",
      price: "S/ 310.00",
      image: "/shoes/7.png",
    }
  ];

  return (
    <div>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-left">
            <span>Obtén 10% de DCTO en la Colección Femenina Porto - <strong>¡Compra Ahora!</strong></span>
          </div>
          <div className="top-bar-right">
            <a href="#">Mi Cuenta</a>
            <a href="#">Mi Lista de Deseos</a>
            <a href="#">Carrito</a>
            <a href="#">Iniciar Sesión</a>
            <select>
              <option>PEN</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
            <select>
              <option>Esp</option>
              <option>Eng</option>
            </select>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <h1>PORTO</h1>
            <span>eCommerce</span>
          </div>
          <div className="header-icons">
            <button className="icon-btn"><Search size={24} /></button>
            <button className="icon-btn"><User size={24} /></button>
            <button className="icon-btn"><Heart size={24} /></button>
            <button className="icon-btn">
              <ShoppingCart size={24} />
              <span className="cart-count">0</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area with Sidebar */}
      <div className="main-wrapper">
        <aside className="sidebar-menu">
          <ul>
            <li><a href="#">Inicio <span>&gt;</span></a></li>
            <li><a href="#">Categorías <span>&gt;</span></a></li>
            <li><a href="#">Productos <span>&gt;</span></a></li>
            <li><a href="#">Características <span>&gt;</span></a></li>
            <li><a href="#">Elementos <span>&gt;</span></a></li>
            <li><a href="#">¡Comprar Porto!</a></li>
          </ul>
        </aside>

        <main className="hero">
          <div className="hero-content">
            <div className="hero-subtitle">Nueva Colección Marrón</div>
            <h2 className="hero-title">Venta de Verano<br/>30% DCTO</h2>
            <div className="hero-price">
              DESDE <span>S/ 140<sup>00</sup></span>
            </div>
            <a href="#" className="btn-primary">¡Lleva el tuyo!</a>
          </div>
          <img 
            src="/shoes/hero.png" 
            alt="Zapatos Marrones Elegantes" 
            className="hero-image"
          />
        </main>
      </div>

      {/* Features Bar */}
      <div className="features-bar">
        <div className="container features-grid">
          <div className="feature-item">
            <Truck className="feature-icon" />
            <div className="feature-text">
              <h4>Envío y Devolución Gratis</h4>
              <p>Envío gratis en pedidos mayores a S/ 200.</p>
            </div>
          </div>
          <div className="feature-item">
            <RotateCcw className="feature-icon" />
            <div className="feature-text">
              <h4>Garantía de Devolución</h4>
              <p>100% de devolución de tu dinero.</p>
            </div>
          </div>
          <div className="feature-item">
            <Headset className="feature-icon" />
            <div className="feature-text">
              <h4>Soporte en línea 24/7</h4>
              <p>Estamos aquí para ayudarte siempre.</p>
            </div>
          </div>
          <div className="feature-item">
            <CreditCard className="feature-icon" />
            <div className="feature-text">
              <h4>Pago Seguro</h4>
              <p>Tus datos están protegidos.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Featured Products */}
        <div className="section-title">
          <h2>Productos<span>Destacados</span></h2>
          <div className="section-subtitle">Increíbles productos añadidos recientemente a nuestro catálogo</div>
        </div>

        <div className="product-grid">
          {featuredProducts.map(product => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                {product.badge && <span className="product-badge">{product.badge}</span>}
                {product.countdown && <span className="product-badge countdown">{product.countdown}</span>}
                <div className="product-actions">
                  <button className="action-btn"><Heart size={16} /></button>
                </div>
              </div>
              <div className="product-category">{product.category}</div>
              <h3 className="product-title">{product.name}</h3>
              <div className="product-rating">★★★★★</div>
              <div className="product-price">
                {product.oldPrice && <del>{product.oldPrice}</del>}
                {product.price}
              </div>
            </div>
          ))}
        </div>

        {/* Summer Collection */}
        <div className="section-title">
          <h2>Colección<span>de Verano</span></h2>
          <div className="section-subtitle">Increíbles productos añadidos recientemente a nuestro catálogo</div>
        </div>

        <div className="summer-collection">
          <div className="banner banner-large">
            <img src="/shoes/collection.jpg" alt="Zapatos Elegantes" />
            <div className="banner-text banner-text-large">
              <h3>Zapatos</h3>
              <h4>Elegantes</h4>
            </div>
          </div>
          <div className="banner bg-dark">
            <div className="banner-text banner-text-small">
              <h4>Para Ella</h4>
            </div>
          </div>
          <div className="banner bg-dark">
            <div className="banner-text banner-text-small">
              <h4>Para Él</h4>
            </div>
          </div>
        </div>

        {/* Best Seller Products */}
        <div className="section-title">
          <h2>Productos<span>Más Vendidos</span></h2>
          <div className="section-subtitle">Solo los productos más vendidos añadidos recientemente a nuestro catálogo</div>
        </div>

        <div className="product-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {bestSellers.map(product => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-actions">
                  <button className="action-btn"><Heart size={16} /></button>
                </div>
              </div>
              <div className="product-category">{product.category}</div>
              <h3 className="product-title">{product.name}</h3>
              <div className="product-rating">★★★★★</div>
              <div className="product-price">{product.price}</div>
            </div>
          ))}
        </div>

        {/* Brands */}
        <div className="brands">
          <div className="brand-logo"><h2 style={{fontWeight: 800, fontSize: '24px', letterSpacing: '-1px'}}>DAVID<br/>SMITH</h2></div>
          <div className="brand-logo"><h2 style={{fontWeight: 800, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '5px'}}><span style={{background: '#000', color: '#fff', padding: '2px 5px'}}>RJ</span> RON JONES</h2></div>
          <div className="brand-logo"><h2 style={{fontWeight: 800, fontSize: '20px'}}>GOLDEN<span style={{fontWeight: 400}}>GRID</span></h2></div>
          <div className="brand-logo"><h2 style={{fontWeight: 800, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '5px'}}><span style={{background: '#000', color: '#fff', padding: '2px'}}>CTM</span> CLIMB THE<br/>MOUNTAIN</h2></div>
          <div className="brand-logo"><h2 style={{fontWeight: 800, fontSize: '22px', textAlign: 'center', lineHeight: 1}}>GOLDEN<br/><span style={{transform: 'rotate(180deg)', display: 'inline-block'}}>GOLDEN</span></h2></div>
          <div className="brand-logo"><h2 style={{fontWeight: 800, fontSize: '24px', display: 'flex', alignItems: 'center'}}><span style={{fontSize: '40px', lineHeight: 1}}>a</span>vant<br/>garde</h2></div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="newsletter-section">
        <div className="container newsletter-container">
          <div className="newsletter-text">
            <h3>Suscríbete al Boletín</h3>
            <p>Entérate de toda la información más reciente</p>
          </div>
          <div className="newsletter-form">
            <input type="email" placeholder="Ingresa tu correo electrónico" />
            <button>Suscribirse</button>
          </div>
        </div>
      </div>

      {/* Footer */}
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
                <li><a href="#">Mi Cuenta</a></li>
                <li><a href="#">Rastrear mi pedido</a></li>
                <li><a href="#">Métodos de Pago</a></li>
                <li><a href="#">Guía de Envío</a></li>
                <li><a href="#">Preguntas Frecuentes</a></li>
                <li><a href="#">Soporte del Producto</a></li>
                <li><a href="#">Privacidad</a></li>
              </ul>
            </div>

            <div className="footer-widget">
              <h4>Nosotros</h4>
              <ul className="footer-links">
                <li><a href="#">Acerca de Porto</a></li>
                <li><a href="#">Nuestras Garantías</a></li>
                <li><a href="#">Términos y Condiciones</a></li>
                <li><a href="#">Política de Privacidad</a></li>
                <li><a href="#">Política de Devolución</a></li>
                <li><a href="#">Reclamos de Propiedad Intelectual</a></li>
                <li><a href="#">Mapa del Sitio</a></li>
              </ul>
            </div>

            <div className="footer-widget">
              <h4>Síguenos</h4>
              <div className="social-icons">
                <a href="#" className="social-icon"><FaFacebook size={16} /></a>
                <a href="#" className="social-icon"><FaTwitter size={16} /></a>
                <a href="#" className="social-icon"><FaInstagram size={16} /></a>
                <a href="#" className="social-icon"><FaLinkedin size={16} /></a>
              </div>
              
              <h4 style={{marginTop: '30px'}}>Métodos de Pago</h4>
              <div className="payment-methods">
                <div style={{background: '#fff', color: '#000', padding: '2px 5px', fontSize: '10px', fontWeight: 'bold'}}>PayPal</div>
                <div style={{background: '#fff', color: '#000', padding: '2px 5px', fontSize: '10px', fontWeight: 'bold'}}>VISA</div>
                <div style={{background: '#fff', color: '#000', padding: '2px 5px', fontSize: '10px', fontWeight: 'bold'}}>MasterCard</div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© copyright 2026. Todos los derechos reservados.</p>
            <div className="footer-bottom-links">
              <a href="#">Afiliados</a>
              <a href="#">Política de Privacidad</a>
              <a href="#">Términos y Condiciones</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
