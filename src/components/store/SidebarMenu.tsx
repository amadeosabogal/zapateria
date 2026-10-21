import React from 'react';

export const SidebarMenu: React.FC = () => {
  return (
    <aside className="sidebar-menu">
      <ul>
        <li><a href="#inicio">Inicio <span>&gt;</span></a></li>
        <li><a href="#categorias">Categorías <span>&gt;</span></a></li>
        <li><a href="#productos">Productos <span>&gt;</span></a></li>
        <li><a href="#caracteristicas">Características <span>&gt;</span></a></li>
        <li><a href="#elementos">Elementos <span>&gt;</span></a></li>
        <li><a href="#comprar">¡Comprar Porto!</a></li>
      </ul>
    </aside>
  );
};
