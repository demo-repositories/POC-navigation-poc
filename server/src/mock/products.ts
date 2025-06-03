export interface Product {
  id: string;
  name: string;
  description: string;
  category: string; // References category ID
  images: {
    main: string;
    gallery?: string[];
  };
  features?: string[];
  specifications?: {
    [key: string]: string;
  };
  price?: {
    amount: number;
    currency: string;
  };
}

export const mockProducts: Product[] = [
  {
    id: "ventral-air-spin",
    name: "Ventral Air Spin",
    description:
      "The POC Ventral Air Spin is our most ventilated road cycling helmet, offering exceptional cooling performance while maintaining the highest levels of safety. The Spin technology provides additional protection against rotational impacts.",
    category: "cycling/road/road-helmets",
    images: {
      main: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
      gallery: [
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
      ],
    },
    features: [
      "SPIN (Shearing Pad Inside) technology",
      "EPS liner with multi-directional impact protection system",
      "Optimized ventilation with 14 large vents",
      "Adjustable visor",
      "Removable and washable padding",
    ],
    specifications: {
      Weight: "290g (size M)",
      Certification: "CE EN1078, CPSC, AS/NZS",
      Construction: "In-mold polycarbonate shell with EPS liner",
    },
    price: {
      amount: 249.99,
      currency: "USD",
    },
  },
  {
    id: "omne-air-spin",
    name: "Omne Air Spin",
    description:
      "The POC Omne Air Spin is a versatile helmet that combines style, comfort, and safety. Perfect for urban commuting and recreational cycling, it features our innovative SPIN technology for enhanced protection.",
    category: "cycling/urban/urban-helmets",
    images: {
      main: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    },
    features: [
      "SPIN technology for rotational impact protection",
      "Optimized ventilation",
      "Urban styling with modern design",
      "Removable visor",
      "Reflective elements for visibility",
    ],
    specifications: {
      Weight: "280g (size M)",
      Certification: "CE EN1078, CPSC",
      Construction: "In-mold polycarbonate shell with EPS liner",
    },
    price: {
      amount: 199.99,
      currency: "USD",
    },
  },
  {
    id: "cerebral-spin",
    name: "Cerebral Spin",
    description:
      "The POC Cerebral Spin is our premium road cycling helmet, offering the highest level of protection and comfort. The innovative SPIN technology and advanced ventilation system make it the perfect choice for serious cyclists.",
    category: "cycling/road/road-helmets",
    images: {
      main: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
      gallery: [
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
      ],
    },
    features: [
      "Advanced SPIN technology",
      "Aerodynamic design",
      "Superior ventilation system",
      "Adjustable retention system",
      "Removable and washable padding",
    ],
    specifications: {
      Weight: "275g (size M)",
      Certification: "CE EN1078, CPSC, AS/NZS",
      Construction: "Advanced polycarbonate shell with multi-density EPS",
    },
    price: {
      amount: 299.99,
      currency: "USD",
    },
  },
  {
    id: "tectal-race-spin",
    name: "Tectal Race Spin",
    description:
      "The POC Tectal Race Spin is our high-performance mountain bike helmet, designed for aggressive trail riding and enduro racing. It combines maximum protection with excellent ventilation and comfort.",
    category: "cycling/mountain-bike/mountain-bike-helmets",
    images: {
      main: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
      gallery: [
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
      ],
    },
    features: [
      "SPIN technology for rotational impact protection",
      "Extended coverage for enhanced protection",
      "Optimized ventilation for trail riding",
      "Adjustable visor",
      "Removable and washable padding",
    ],
    specifications: {
      Weight: "350g (size M)",
      Certification: "CE EN1078, CPSC",
      Construction: "Reinforced polycarbonate shell with EPS liner",
    },
    price: {
      amount: 279.99,
      currency: "USD",
    },
  },
  {
    id: "do-blade-race",
    name: "Do Blade Race",
    description:
      "The POC Do Blade Race is our premium cycling eyewear, offering exceptional clarity, protection, and style. Perfect for road cycling and racing, it features advanced lens technology and a lightweight frame.",
    category: "cycling/road/road-eyewear",
    images: {
      main: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    },
    features: [
      "Carl Zeiss Vision lenses",
      "Lightweight and durable frame",
      "Adjustable nose pads",
      "100% UV protection",
      "Sweat and fog resistant",
    ],
    specifications: {
      "Lens Width": "58mm",
      "Bridge Width": "18mm",
      "Temple Length": "135mm",
      "Frame Material": "Grilamid TR-90",
    },
    price: {
      amount: 199.99,
      currency: "USD",
    },
  },
];
