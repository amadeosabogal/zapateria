import React from 'react';

export const BrandsSection: React.FC = () => {
  return (
    <section className="brands" aria-label="Marcas asociadas">
      <div className="brand-logo">
        <h2 style={{ fontWeight: 800, fontSize: '24px', letterSpacing: '-1px' }}>
          DAVID<br />SMITH
        </h2>
      </div>
      <div className="brand-logo">
        <h2 style={{ fontWeight: 800, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ background: '#000', color: '#fff', padding: '2px 5px' }}>RJ</span> RON JONES
        </h2>
      </div>
      <div className="brand-logo">
        <h2 style={{ fontWeight: 800, fontSize: '20px' }}>
          GOLDEN<span style={{ fontWeight: 400 }}>GRID</span>
        </h2>
      </div>
      <div className="brand-logo">
        <h2 style={{ fontWeight: 800, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ background: '#000', color: '#fff', padding: '2px' }}>CTM</span> CLIMB THE<br />MOUNTAIN
        </h2>
      </div>
      <div className="brand-logo">
        <h2 style={{ fontWeight: 800, fontSize: '22px', textAlign: 'center', lineHeight: 1 }}>
          GOLDEN<br /><span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>GOLDEN</span>
        </h2>
      </div>
      <div className="brand-logo">
        <h2 style={{ fontWeight: 800, fontSize: '24px', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '40px', lineHeight: 1 }}>a</span>vant<br />garde
        </h2>
      </div>
    </section>
  );
};
