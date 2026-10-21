import type { Product, SaleOrder, Customer } from '../types';

export const initialFeaturedProducts: Product[] = [
  {
    id: 1,
    sku: "OXF-NEG-01",
    name: "Oxford Negro Clásico",
    category: "HOMBRE, FORMAL",
    price: "S/ 250.00",
    numericPrice: 250.00,
    oldPrice: "S/ 320.00",
    image: "/shoes/1.png",
    badge: "-20%",
    rating: 5,
    stock: 16,
    material: "Cuero vacuno flor entera box calf",
    sole: "Neolite antideslizante con cerco cosido",
    isFeatured: true,
    sizes: [
      { size: 38, stock: 2 },
      { size: 39, stock: 3 },
      { size: 40, stock: 5 },
      { size: 41, stock: 4 },
      { size: 42, stock: 2 },
      { size: 43, stock: 0 }
    ]
  },
  {
    id: 2,
    sku: "BRG-MAR-02",
    name: "Brogue Marrón de Cuero",
    category: "HOMBRE, FORMAL",
    price: "S/ 320.00",
    numericPrice: 320.00,
    image: "/shoes/2.png",
    rating: 5,
    stock: 8,
    material: "Cuero curtido vegetal pátina marrón",
    sole: "Suela de cuero natural cosido Blake",
    isFeatured: true,
    sizes: [
      { size: 39, stock: 1 },
      { size: 40, stock: 2 },
      { size: 41, stock: 3 },
      { size: 42, stock: 2 },
      { size: 43, stock: 0 }
    ]
  },
  {
    id: 3,
    sku: "MNK-BUR-03",
    name: "Monk Strap Burdeos",
    category: "MODA, HOMBRE",
    price: "S/ 280.00",
    numericPrice: 280.00,
    oldPrice: "S/ 350.00",
    image: "/shoes/3.png",
    badge: "OFERTA",
    countdown: "LA OFERTA TERMINA EN 2 DÍAS",
    rating: 5,
    stock: 6,
    material: "Cuero lustrado color borgoña con doble hebilla",
    sole: "Neolite de alta densidad",
    isFeatured: true,
    sizes: [
      { size: 38, stock: 1 },
      { size: 39, stock: 2 },
      { size: 40, stock: 0 },
      { size: 41, stock: 2 },
      { size: 42, stock: 1 }
    ]
  },
  {
    id: 4,
    sku: "DRB-CAN-04",
    name: "Derby Color Canela",
    category: "HOMBRE, FORMAL",
    price: "S/ 300.00",
    numericPrice: 300.00,
    image: "/shoes/4.png",
    rating: 5,
    stock: 19,
    material: "Cuero engrasado color miel / canela",
    sole: "Goma confort antideslizante",
    isFeatured: true,
    sizes: [
      { size: 39, stock: 3 },
      { size: 40, stock: 6 },
      { size: 41, stock: 5 },
      { size: 42, stock: 3 },
      { size: 43, stock: 2 }
    ]
  }
];

export const initialBestSellers: Product[] = [
  {
    id: 5,
    sku: "OXF-PRM-05",
    name: "Oxford Formal Premium",
    category: "MODA, HOMBRE, VENTA",
    price: "S/ 220.00",
    numericPrice: 220.00,
    image: "/shoes/5.png",
    rating: 5,
    stock: 11,
    material: "Cuero napa de grano fino suave",
    sole: "Caucho flexible ultra liviano",
    isBestSeller: true,
    sizes: [
      { size: 38, stock: 2 },
      { size: 39, stock: 3 },
      { size: 40, stock: 3 },
      { size: 41, stock: 2 },
      { size: 42, stock: 1 }
    ]
  },
  {
    id: 6,
    sku: "ZAP-MAR-06",
    name: "Zapato de Vestir Marrón",
    category: "HOMBRE",
    price: "S/ 250.00",
    numericPrice: 250.00,
    image: "/shoes/6.png",
    rating: 5,
    stock: 15,
    material: "Cuero pull-up con acabado encerado",
    sole: "Neolite resistente al desgaste",
    isBestSeller: true,
    sizes: [
      { size: 39, stock: 2 },
      { size: 40, stock: 4 },
      { size: 41, stock: 5 },
      { size: 42, stock: 3 },
      { size: 43, stock: 1 }
    ]
  },
  {
    id: 7,
    sku: "DRB-ELG-07",
    name: "Derby Elegante",
    category: "HOMBRE, FORMAL",
    price: "S/ 310.00",
    numericPrice: 310.00,
    image: "/shoes/7.png",
    rating: 5,
    stock: 9,
    material: "Cuero box calf negro premium",
    sole: "Suela mixta cuero y goma en talón",
    isBestSeller: true,
    sizes: [
      { size: 39, stock: 2 },
      { size: 40, stock: 3 },
      { size: 41, stock: 2 },
      { size: 42, stock: 2 },
      { size: 43, stock: 0 }
    ]
  }
];

export const initialAllProducts: Product[] = [
  ...initialFeaturedProducts,
  ...initialBestSellers
];


export const initialCustomers: Customer[] = [
  {
    id: "cust-1",
    name: "Carlos Mendoza Rivas",
    email: "carlos.mendoza@gmail.com",
    phone: "+51 987 654 321",
    city: "Lima",
    address: "Av. Larco 852, Dpto 401, Miraflores",
    ordersCount: 4,
    totalSpent: 1120.00,
    lastOrderDate: "2026-10-18",
    status: "VIP",
    avatarColor: "#222529",
    createdAt: "2025-11-12"
  },
  {
    id: "cust-2",
    name: "Valeria Ramos Prado",
    email: "valeria.ramos@outlook.com",
    phone: "+51 976 543 210",
    city: "Arequipa",
    address: "Calle Mercaderes 214, Yanahuara",
    ordersCount: 2,
    totalSpent: 570.00,
    lastOrderDate: "2026-10-19",
    status: "Activo",
    avatarColor: "#8b5e3c",
    createdAt: "2026-02-04"
  },
  {
    id: "cust-3",
    name: "Diego Salazar Torres",
    email: "diego.salazar@corporativo.pe",
    phone: "+51 991 234 567",
    city: "Lima",
    address: "Jr. Monterrey 341, Santiago de Surco",
    ordersCount: 5,
    totalSpent: 1480.00,
    lastOrderDate: "2026-10-20",
    status: "VIP",
    avatarColor: "#1b4d3e",
    createdAt: "2025-08-20"
  },
  {
    id: "cust-4",
    name: "Mariana Castro Vega",
    email: "mariana.castro@hotmail.com",
    phone: "+51 945 678 901",
    city: "Trujillo",
    address: "Av. España 1120, Víctor Larco Herrera",
    ordersCount: 1,
    totalSpent: 280.00,
    lastOrderDate: "2026-10-15",
    status: "Activo",
    avatarColor: "#7c3aed",
    createdAt: "2026-06-18"
  },
  {
    id: "cust-5",
    name: "Jorge Alarcón Morales",
    email: "jorge.alarcon@gmail.com",
    phone: "+51 963 852 741",
    city: "Cusco",
    address: "Av. Sol 540, Wanchaq",
    ordersCount: 3,
    totalSpent: 870.00,
    lastOrderDate: "2026-10-12",
    status: "Activo",
    avatarColor: "#0284c7",
    createdAt: "2026-01-10"
  },
  {
    id: "cust-6",
    name: "Claudia Benavides Wong",
    email: "claudia.bw@gmail.com",
    phone: "+51 952 147 369",
    city: "Lima",
    address: "Av. Javier Prado Este 4200, San Borja",
    ordersCount: 1,
    totalSpent: 300.00,
    lastOrderDate: "2026-09-28",
    status: "Inactivo",
    avatarColor: "#b91c1c",
    createdAt: "2026-04-14"
  },
  {
    id: "cust-7",
    name: "Fernando Quispe Huamán",
    email: "f.quispe@empresa.com",
    phone: "+51 912 345 678",
    city: "Chiclayo",
    address: "Calle San José 745, Urb. Santa Victoria",
    ordersCount: 3,
    totalSpent: 820.00,
    lastOrderDate: "2026-10-21",
    status: "Activo",
    avatarColor: "#d97706",
    createdAt: "2026-03-22"
  }
];

export const initialSales: SaleOrder[] = [
  {
    id: "ord-1082",
    orderNumber: "PRT-1082",
    customerId: "cust-7",
    customerName: "Fernando Quispe Huamán",
    customerEmail: "f.quispe@empresa.com",
    customerPhone: "+51 912 345 678",
    customerCity: "Chiclayo",
    customerAddress: "Calle San José 745, Urb. Santa Victoria",
    date: "2026-10-21 09:15",
    total: 570.00,
    status: "Pendiente",
    paymentMethod: "Yape / Plin",
    items: [
      {
        productId: 1,
        productName: "Oxford Negro Clásico",
        productImage: "/shoes/1.png",
        size: 41,
        quantity: 1,
        unitPrice: 250.00,
        subtotal: 250.00
      },
      {
        productId: 2,
        productName: "Brogue Marrón de Cuero",
        productImage: "/shoes/2.png",
        size: 42,
        quantity: 1,
        unitPrice: 320.00,
        subtotal: 320.00
      }
    ],
    notes: "Cliente solicita entrega antes de las 5pm."
  },
  {
    id: "ord-1081",
    orderNumber: "PRT-1081",
    customerId: "cust-3",
    customerName: "Diego Salazar Torres",
    customerEmail: "diego.salazar@corporativo.pe",
    customerPhone: "+51 991 234 567",
    customerCity: "Lima",
    customerAddress: "Jr. Monterrey 341, Santiago de Surco",
    date: "2026-10-20 16:40",
    total: 300.00,
    status: "Enviado",
    paymentMethod: "Tarjeta de Crédito",
    items: [
      {
        productId: 4,
        productName: "Derby Color Canela",
        productImage: "/shoes/4.png",
        size: 40,
        quantity: 1,
        unitPrice: 300.00,
        subtotal: 300.00
      }
    ],
    notes: "Paquete despachado con Olva Courier con código de tracking OLV-9941."
  },
  {
    id: "ord-1080",
    orderNumber: "PRT-1080",
    customerId: "cust-2",
    customerName: "Valeria Ramos Prado",
    customerEmail: "valeria.ramos@outlook.com",
    customerPhone: "+51 976 543 210",
    customerCity: "Arequipa",
    customerAddress: "Calle Mercaderes 214, Yanahuara",
    date: "2026-10-19 11:22",
    total: 570.00,
    status: "Completado",
    paymentMethod: "Transferencia Bancaria",
    items: [
      {
        productId: 3,
        productName: "Monk Strap Burdeos",
        productImage: "/shoes/3.png",
        size: 38,
        quantity: 1,
        unitPrice: 280.00,
        subtotal: 280.00
      },
      {
        productId: 7,
        productName: "Derby Elegante",
        productImage: "/shoes/7.png",
        size: 39,
        quantity: 1,
        unitPrice: 290.00,
        subtotal: 290.00
      }
    ],
    notes: "Entrega realizada conforme y recepcionada por el cliente."
  },
  {
    id: "ord-1079",
    orderNumber: "PRT-1079",
    customerId: "cust-1",
    customerName: "Carlos Mendoza Rivas",
    customerEmail: "carlos.mendoza@gmail.com",
    customerPhone: "+51 987 654 321",
    customerCity: "Lima",
    customerAddress: "Av. Larco 852, Dpto 401, Miraflores",
    date: "2026-10-18 14:05",
    total: 540.00,
    status: "Completado",
    paymentMethod: "Tarjeta de Crédito",
    items: [
      {
        productId: 5,
        productName: "Oxford Formal Premium",
        productImage: "/shoes/5.png",
        size: 42,
        quantity: 1,
        unitPrice: 220.00,
        subtotal: 220.00
      },
      {
        productId: 2,
        productName: "Brogue Marrón de Cuero",
        productImage: "/shoes/2.png",
        size: 42,
        quantity: 1,
        unitPrice: 320.00,
        subtotal: 320.00
      }
    ]
  },
  {
    id: "ord-1078",
    orderNumber: "PRT-1078",
    customerId: "cust-4",
    customerName: "Mariana Castro Vega",
    customerEmail: "mariana.castro@hotmail.com",
    customerPhone: "+51 945 678 901",
    customerCity: "Trujillo",
    customerAddress: "Av. España 1120, Víctor Larco Herrera",
    date: "2026-10-15 18:30",
    total: 280.00,
    status: "Completado",
    paymentMethod: "PayPal",
    items: [
      {
        productId: 3,
        productName: "Monk Strap Burdeos",
        productImage: "/shoes/3.png",
        size: 37,
        quantity: 1,
        unitPrice: 280.00,
        subtotal: 280.00
      }
    ]
  },
  {
    id: "ord-1077",
    orderNumber: "PRT-1077",
    customerId: "cust-5",
    customerName: "Jorge Alarcón Morales",
    customerEmail: "jorge.alarcon@gmail.com",
    customerPhone: "+51 963 852 741",
    customerCity: "Cusco",
    customerAddress: "Av. Sol 540, Wanchaq",
    date: "2026-10-12 10:15",
    total: 500.00,
    status: "Cancelado",
    paymentMethod: "Efectivo contra entrega",
    items: [
      {
        productId: 1,
        productName: "Oxford Negro Clásico",
        productImage: "/shoes/1.png",
        size: 43,
        quantity: 2,
        unitPrice: 250.00,
        subtotal: 500.00
      }
    ],
    notes: "Cancelado por el cliente por cambio de talla no disponible inmediatamente."
  }
];
