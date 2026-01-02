export interface Product {
  id: string;
  name: string;
  description: string;
  price?: number;
  price_medium?: number;
  price_large?: number;
  category: string;
  image: string;
  isFeatured?: boolean;
  isTopProduct?: boolean;
  sizes?: Array<{ label: string; price: number }>;
  accompaniment?: string;
  options?: string[];
}

export const products: Product[] = [
  // 1. ENTRÉES
  {
    id: "e1",
    name: "Salade Crudités",
    description: "Salade fraîche de légumes croquants",
    price: 2500,
    category: "entrees",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
  },
  {
    id: "e2",
    name: "Salade Niçoise",
    description: "Thon, œufs, olives, anchois",
    price: 2500,
    category: "entrees",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    isFeatured: true,
  },
  {
    id: "e3",
    name: "Salade Exotique",
    description: "Mélange tropical fruité",
    price: 2500,
    category: "entrees",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
  },
  {
    id: "e4",
    name: "Salade Crevettes",
    description: "Crevettes fraîches sur lit de salade",
    price: 3000,
    category: "entrees",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
  },
  {
    id: "e5",
    name: "Salade César",
    description: "Poulet grillé, parmesan, croûtons",
    price: 3000,
    category: "entrees",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    isFeatured: true,
  },
  {
    id: "e6",
    name: "Assiette de Nems",
    description: "6 nems croustillants sauce aigre-douce",
    price: 2000,
    category: "entrees",
    image:
      "https://images.unsplash.com/photo-1535638066436-09fedd90ba28?w=400&h=300&fit=crop",
  },
  {
    id: "e7",
    name: "Beignets de Crevettes",
    description: "Crevettes enrobées et frites",
    price: 2500,
    category: "entrees",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
  },

  // 2. PLATS DU JOUR
  {
    id: "pj1",
    name: "Plat Sénégalais du Jour",
    description: "Thiéboudienne, Yassa ou Mafé selon le jour",
    price: 2500,
    category: "plats_jour",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    isFeatured: true,
    isTopProduct: true,
  },
  {
    id: "pj2",
    name: "Paella",
    description: "Riz au safran, fruits de mer, poulet",
    price: 3000,
    category: "plats_jour",
    image:
      "https://images.unsplash.com/photo-1534080564897-61794cd28547?w=400&h=300&fit=crop",
    isFeatured: true,
    isTopProduct: true,
  },
  {
    id: "pj3",
    name: "Yassa Crevettes",
    description: "Crevettes marinées sauce citron-oignon",
    price: 3000,
    category: "plats_jour",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    isFeatured: true,
  },

  // 3. PLATS GARNIS
  {
    id: "pg1",
    name: "Spaghetti Bolognaise",
    description: "Pâtes sauce viande maison, accompagnées de frites ou riz",
    price: 4000,
    category: "plats_garnis",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    accompaniment: "Frites ou Riz",
  },
  {
    id: "pg2",
    name: "Tagliatelle au Poulet",
    description: "Pâtes fraîches, émincés de poulet, sauce crème",
    price: 4000,
    category: "plats_garnis",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    accompaniment: "Frites ou Riz",
  },
  {
    id: "pg3",
    name: "Tagliatelle aux Fruits de Mer",
    description: "Pâtes fraîches, fruits de mer variés, sauce tomate basilic",
    price: 5000,
    category: "plats_garnis",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    accompaniment: "Frites ou Riz",
    isFeatured: true,
  },
  {
    id: "pg4",
    name: "Tagliatelle Carbonara",
    description: "Pâtes fraîches, lardons, crème, parmesan",
    price: 4000,
    category: "plats_garnis",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    accompaniment: "Frites ou Riz",
  },
  {
    id: "pg5",
    name: "Poulet Pané",
    description: "Escalope de poulet panée croustillante",
    price: 4000,
    category: "plats_garnis",
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",
    accompaniment: "Frites ou Riz",
  },
  {
    id: "pg6",
    name: "Cordon Bleu",
    description: "Escalope de poulet farcie jambon-fromage",
    price: 4500,
    category: "plats_garnis",
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",
    accompaniment: "Frites ou Riz",
    isFeatured: true,
  },
  {
    id: "pg7",
    name: "Filet au Poivre Vert",
    description: "Filet de bœuf tendre, sauce poivre vert maison",
    price: 5000,
    category: "plats_garnis",
    image:
      "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&h=300&fit=crop",
    accompaniment: "Frites ou Riz",
    isFeatured: true,
    isTopProduct: true,
  },
  {
    id: "pg8",
    name: "Émincés de Viande Filet",
    description: "Lamelles de filet de bœuf sautées",
    price: 5000,
    category: "plats_garnis",
    image:
      "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&h=300&fit=crop",
    accompaniment: "Frites ou Riz",
  },
  {
    id: "pg9",
    name: "Fricassée de Poulet",
    description: "Morceaux de poulet mijotés sauce champignons",
    price: 4500,
    category: "plats_garnis",
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",
    accompaniment: "Frites ou Riz",
  },
  {
    id: "pg10",
    name: "Pavé de Poisson au Citron",
    description: "Poisson frais grillé, beurre citronné",
    price: 4500,
    category: "plats_garnis",
    image:
      "https://images.unsplash.com/photo-1504674900152-b8b9e832046f?w=400&h=300&fit=crop",
    accompaniment: "Frites ou Riz",
  },
  {
    id: "pg11",
    name: "Filet de Poisson Pané",
    description: "Filet de poisson blanc croustillant",
    price: 4500,
    category: "plats_garnis",
    image:
      "https://images.unsplash.com/photo-1504674900152-b8b9e832046f?w=400&h=300&fit=crop",
    accompaniment: "Frites ou Riz",
  },
  {
    id: "pg12",
    name: "Seiche/Calamar Pané ou Grillé",
    description: "Au choix : pané croustillant ou grillé à l'ail",
    price: 5000,
    category: "plats_garnis",
    image:
      "https://images.unsplash.com/photo-1504674900152-b8b9e832046f?w=400&h=300&fit=crop",
    accompaniment: "Frites ou Riz",
  },
  {
    id: "pg13",
    name: "Crevettes Sautées à l'Ail",
    description: "Grosses crevettes sautées à l'ail et persil",
    price: 5000,
    category: "plats_garnis",
    image:
      "https://images.unsplash.com/photo-1504674900152-b8b9e832046f?w=400&h=300&fit=crop",
    accompaniment: "Frites ou Riz",
    isFeatured: true,
  },

  // 4. DIBI
  {
    id: "db1",
    name: "Dibi Mouton 500g",
    description: "Viande de mouton grillée façon sénégalaise",
    price: 4000,
    category: "dibi",
    image:
      "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&h=300&fit=crop",
    isFeatured: true,
  },
  {
    id: "db2",
    name: "1/2 Poulet Dibi",
    description: "Demi-poulet grillé mariné aux épices",
    price: 4000,
    category: "dibi",
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",
  },

  // 5. GRILLADES
  {
    id: "gr1",
    name: "1/2 Poulet Braisé",
    description: "Demi-poulet mariné grillé à la perfection",
    price: 4000,
    category: "grillades",
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",
    isFeatured: true,
  },
  {
    id: "gr2",
    name: "Brochettes Filet",
    description: "Brochettes de filet de bœuf tendres",
    price: 6000,
    category: "grillades",
    image:
      "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&h=300&fit=crop",
    isFeatured: true,
    isTopProduct: true,
  },
  {
    id: "gr3",
    name: "Brochettes Mix",
    description: "Mélange bœuf, poulet, merguez",
    price: 6000,
    category: "grillades",
    image:
      "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&h=300&fit=crop",
    isFeatured: true,
    isTopProduct: true,
  },
  {
    id: "gr4",
    name: "Brochettes Poulet",
    description: "Brochettes de poulet mariné",
    price: 5000,
    category: "grillades",
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",
  },
  {
    id: "gr5",
    name: "Brochettes de Lotte",
    description: "Brochettes de poisson lotte grillé",
    price: 4500,
    category: "grillades",
    image:
      "https://images.unsplash.com/photo-1504674900152-b8b9e832046f?w=400&h=300&fit=crop",
  },
  {
    id: "gr6",
    name: "Brochettes de Crevettes",
    description: "Grosses crevettes grillées",
    price: 6000,
    category: "grillades",
    image:
      "https://images.unsplash.com/photo-1504674900152-b8b9e832046f?w=400&h=300&fit=crop",
    isFeatured: true,
  },
  {
    id: "gr7",
    name: "Poisson Braisé",
    description: "Poisson entier grillé aux épices",
    price_medium: 5000,
    price_large: 6000,
    category: "grillades",
    image:
      "https://images.unsplash.com/photo-1504674900152-b8b9e832046f?w=400&h=300&fit=crop",
    sizes: [
      { label: "Petit", price: 5000 },
      { label: "Grand", price: 6000 },
    ],
  },
  {
    id: "gr8",
    name: "Thiof Braisé",
    description: "Mérou grillé, spécialité sénégalaise",
    price: 8000,
    category: "grillades",
    image:
      "https://images.unsplash.com/photo-1504674900152-b8b9e832046f?w=400&h=300&fit=crop",
    isFeatured: true,
    isTopProduct: true,
  },

  // 6. FAST-FOOD
  {
    id: "ff1",
    name: "Chawarma Viande",
    description: "Galette garnie viande grillée, sauce blanche",
    price: 1500,
    category: "fast_food",
    image:
      "https://images.unsplash.com/photo-1533473359331-0ac8cc627e82?w=400&h=300&fit=crop",
  },
  {
    id: "ff2",
    name: "Chawarma Poulet",
    description: "Galette garnie poulet grillé, sauce blanche",
    price: 1500,
    category: "fast_food",
    image:
      "https://images.unsplash.com/photo-1533473359331-0ac8cc627e82?w=400&h=300&fit=crop",
  },
  {
    id: "ff3",
    name: "Chawarma Royal",
    description: "Chawarma + œuf + fromage",
    price: 2000,
    category: "fast_food",
    image:
      "https://images.unsplash.com/photo-1533473359331-0ac8cc627e82?w=400&h=300&fit=crop",
    isFeatured: true,
  },
  {
    id: "ff4",
    name: "Pacha",
    description: "Chawarma Royal + Hot Dog",
    price: 2500,
    category: "fast_food",
    image:
      "https://images.unsplash.com/photo-1533473359331-0ac8cc627e82?w=400&h=300&fit=crop",
    isFeatured: true,
  },

  // 7. HAMBURGERS
  {
    id: "hb1",
    name: "Hamburger Viande",
    description: "Pain brioché, steak haché, crudités, sauce",
    price: 1500,
    category: "hamburgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
  },
  {
    id: "hb2",
    name: "Hamburger Poulet",
    description: "Pain brioché, filet poulet pané, crudités",
    price: 1500,
    category: "hamburgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
  },
  {
    id: "hb3",
    name: "Hamburger Royal",
    description: "Steak haché + œuf + fromage",
    price: 2000,
    category: "hamburgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    isFeatured: true,
  },
  {
    id: "hb4",
    name: "Hamburger Double",
    description: "Double steak, double fromage",
    price: 2500,
    category: "hamburgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
  },

  // 8. SANDWICHS
  {
    id: "sd1",
    name: "Sandwich Steak",
    description: "Baguette, steak grillé, frites, crudités",
    price: 1200,
    category: "sandwichs",
    image:
      "https://images.unsplash.com/photo-1553909764-5a6a6b5c5e6c?w=400&h=300&fit=crop",
  },
  {
    id: "sd2",
    name: "Sandwich Foie",
    description: "Baguette, foie grillé, frites, oignons",
    price: 1500,
    category: "sandwichs",
    image:
      "https://images.unsplash.com/photo-1553909764-5a6a6b5c5e6c?w=400&h=300&fit=crop",
  },
  {
    id: "sd3",
    name: "Sandwich Viande Hachée",
    description: "Baguette, viande hachée grillée, frites",
    price: 1500,
    category: "sandwichs",
    image:
      "https://images.unsplash.com/photo-1553909764-5a6a6b5c5e6c?w=400&h=300&fit=crop",
  },
  {
    id: "sd4",
    name: "Sandwich Hot Dog",
    description: "Baguette, saucisse, frites, ketchup",
    price: 1500,
    category: "sandwichs",
    image:
      "https://images.unsplash.com/photo-1553909764-5a6a6b5c5e6c?w=400&h=300&fit=crop",
  },
  {
    id: "sd5",
    name: "Sandwich Poulet",
    description: "Baguette, poulet grillé, frites, crudités",
    price: 2000,
    category: "sandwichs",
    image:
      "https://images.unsplash.com/photo-1553909764-5a6a6b5c5e6c?w=400&h=300&fit=crop",
  },
  {
    id: "sd6",
    name: "Hot Dog Norvégien",
    description: "Saucisse fumée norvégienne premium",
    price: 2500,
    category: "sandwichs",
    image:
      "https://images.unsplash.com/photo-1553909764-5a6a6b5c5e6c?w=400&h=300&fit=crop",
    isFeatured: true,
  },
  {
    id: "sd7",
    name: "Double Hot Dog Norvégien",
    description: "Deux saucisses norvégiennes",
    price: 2800,
    category: "sandwichs",
    image:
      "https://images.unsplash.com/photo-1553909764-5a6a6b5c5e6c?w=400&h=300&fit=crop",
  },
  {
    id: "sd8",
    name: "Sandwich Merguez",
    description: "Baguette, merguez épicée, frites, harissa",
    price: 3000,
    category: "sandwichs",
    image:
      "https://images.unsplash.com/photo-1553909764-5a6a6b5c5e6c?w=400&h=300&fit=crop",
  },

  // 9. TACOS
  {
    id: "tc1",
    name: "Tacos Simple",
    description: "Au choix : Steak, Poulet, Viande Hachée ou Hot Dog",
    price: 2500,
    category: "tacos",
    image:
      "https://images.unsplash.com/photo-1565702479325-3437984c9a8f?w=400&h=300&fit=crop",
    options: ["Steak", "Poulet", "Viande Hachée", "Hot Dog"],
  },
  {
    id: "tc2",
    name: "Tacos Chawarma",
    description: "Viande chawarma marinée dans galette tacos",
    price: 2500,
    category: "tacos",
    image:
      "https://images.unsplash.com/photo-1565702479325-3437984c9a8f?w=400&h=300&fit=crop",
    isFeatured: true,
  },
  {
    id: "tc3",
    name: "Tacos Mix",
    description: "Mélange de 2 viandes au choix",
    price: 2500,
    category: "tacos",
    image:
      "https://images.unsplash.com/photo-1565702479325-3437984c9a8f?w=400&h=300&fit=crop",
  },

  // 10. PIZZAS (7 products with sizes)
  {
    id: "pz1",
    name: "Pizza Margarita",
    description: "Tomate, mozzarella, basilic frais",
    price_medium: 3500,
    price_large: 4500,
    category: "pizzas",
    image:
      "https://images.unsplash.com/photo-1571407-4dbc9149333d?w=400&h=300&fit=crop",
    sizes: [
      { label: "Moyenne", price: 3500 },
      { label: "Grande", price: 4500 },
    ],
  },
  {
    id: "pz2",
    name: "Pizza Reine",
    description: "Tomate, mozzarella, jambon, champignons",
    price_medium: 3500,
    price_large: 4500,
    category: "pizzas",
    image:
      "https://images.unsplash.com/photo-1571407-4dbc9149333d?w=400&h=300&fit=crop",
    sizes: [
      { label: "Moyenne", price: 3500 },
      { label: "Grande", price: 4500 },
    ],
  },
  {
    id: "pz3",
    name: "Pizza Orientale",
    description: "Tomate, merguez épicée, poivrons, olives",
    price_medium: 3500,
    price_large: 4500,
    category: "pizzas",
    image:
      "https://images.unsplash.com/photo-1571407-4dbc9149333d?w=400&h=300&fit=crop",
    sizes: [
      { label: "Moyenne", price: 3500 },
      { label: "Grande", price: 4500 },
    ],
  },
  {
    id: "pz4",
    name: "Pizza Bolognaise",
    description: "Sauce bolognaise maison, mozzarella",
    price_medium: 3500,
    price_large: 4500,
    category: "pizzas",
    image:
      "https://images.unsplash.com/photo-1571407-4dbc9149333d?w=400&h=300&fit=crop",
    sizes: [
      { label: "Moyenne", price: 3500 },
      { label: "Grande", price: 4500 },
    ],
  },
  {
    id: "pz5",
    name: "Pizza Fermière",
    description: "Crème, mozzarella, lardons, oignons",
    price_medium: 4000,
    price_large: 5000,
    category: "pizzas",
    image:
      "https://images.unsplash.com/photo-1571407-4dbc9149333d?w=400&h=300&fit=crop",
    sizes: [
      { label: "Moyenne", price: 4000 },
      { label: "Grande", price: 5000 },
    ],
    isFeatured: true,
  },
  {
    id: "pz6",
    name: "Pizza Chawarma",
    description: "Base crème, viande chawarma, oignons",
    price_medium: 4000,
    price_large: 5000,
    category: "pizzas",
    image:
      "https://images.unsplash.com/photo-1571407-4dbc9149333d?w=400&h=300&fit=crop",
    sizes: [
      { label: "Moyenne", price: 4000 },
      { label: "Grande", price: 5000 },
    ],
    isFeatured: true,
  },
  {
    id: "pz7",
    name: "Pizza Océane",
    description: "Fruits de mer variés, tomate, ail",
    price_medium: 4000,
    price_large: 5000,
    category: "pizzas",
    image:
      "https://images.unsplash.com/photo-1571407-4dbc9149333d?w=400&h=300&fit=crop",
    sizes: [
      { label: "Moyenne", price: 4000 },
      { label: "Grande", price: 5000 },
    ],
    isFeatured: true,
    isTopProduct: true,
  },

  // 11. CRÊPES SUCRÉES
  {
    id: "cs1",
    name: "Crêpe Nutella",
    description: "Généreusement garnie de Nutella",
    price: 1500,
    category: "crepes_sucrees",
    image:
      "https://images.unsplash.com/photo-1567327613485-f436f6d1d0e2?w=400&h=300&fit=crop",
    isFeatured: true,
  },
  {
    id: "cs2",
    name: "Crêpe Nutella Banane",
    description: "Nutella et rondelles de banane fraîche",
    price: 2000,
    category: "crepes_sucrees",
    image:
      "https://images.unsplash.com/photo-1567327613485-f436f6d1d0e2?w=400&h=300&fit=crop",
    isFeatured: true,
  },
  {
    id: "cs3",
    name: "Crêpe Boule de Glace",
    description: "Crêpe sucrée + boule glace vanille",
    price: 2500,
    category: "crepes_sucrees",
    image:
      "https://images.unsplash.com/photo-1567327613485-f436f6d1d0e2?w=400&h=300&fit=crop",
  },
  {
    id: "cs4",
    name: "Crêpe à l'Orange",
    description: "Flambée au Grand Marnier",
    price: 2500,
    category: "crepes_sucrees",
    image:
      "https://images.unsplash.com/photo-1567327613485-f436f6d1d0e2?w=400&h=300&fit=crop",
  },
  {
    id: "cs5",
    name: "Crêpe au Miel",
    description: "Miel d'acacia et amandes effilées",
    price: 2500,
    category: "crepes_sucrees",
    image:
      "https://images.unsplash.com/photo-1567327613485-f436f6d1d0e2?w=400&h=300&fit=crop",
  },
  {
    id: "cs6",
    name: "Crêpe Pomme d'Api",
    description: "Compotée de pommes, cannelle",
    price: 3000,
    category: "crepes_sucrees",
    image:
      "https://images.unsplash.com/photo-1567327613485-f436f6d1d0e2?w=400&h=300&fit=crop",
  },

  // 12. CRÊPES SALÉES
  {
    id: "csal1",
    name: "Crêpe Flamande",
    description: "Béchamel, fromage, jambon",
    price: 3000,
    category: "crepes_salees",
    image:
      "https://images.unsplash.com/photo-1567327613485-f436f6d1d0e2?w=400&h=300&fit=crop",
  },
  {
    id: "csal2",
    name: "Crêpe Provençale",
    description: "Tomate, champignons, lardons, fromage",
    price: 3000,
    category: "crepes_salees",
    image:
      "https://images.unsplash.com/photo-1567327613485-f436f6d1d0e2?w=400&h=300&fit=crop",
  },
  {
    id: "csal3",
    name: "Crêpe Royale",
    description: "Viande hachée, fromage, tomate, œuf",
    price: 3500,
    category: "crepes_salees",
    image:
      "https://images.unsplash.com/photo-1567327613485-f436f6d1d0e2?w=400&h=300&fit=crop",
    isFeatured: true,
  },
  {
    id: "csal4",
    name: "Crêpe au Poulet",
    description: "Émincés de poulet, champignons, crème",
    price: 3500,
    category: "crepes_salees",
    image:
      "https://images.unsplash.com/photo-1567327613485-f436f6d1d0e2?w=400&h=300&fit=crop",
  },
  {
    id: "csal5",
    name: "Crêpe aux Fruits de Mer",
    description: "Crevettes, calamars, sauce crème",
    price: 4500,
    category: "crepes_salees",
    image:
      "https://images.unsplash.com/photo-1567327613485-f436f6d1d0e2?w=400&h=300&fit=crop",
    isFeatured: true,
  },
  {
    id: "csal6",
    name: "Grosse Bertha",
    description: "Champignons, fromage, lardons, oignons sautés",
    price: 4500,
    category: "crepes_salees",
    image:
      "https://images.unsplash.com/photo-1567327613485-f436f6d1d0e2?w=400&h=300&fit=crop",
  },

  // 13. CROQUES
  {
    id: "cr1",
    name: "Croque Monsieur",
    description: "Pain de mie, fromage, jambon gratiné",
    price: 1500,
    category: "croques",
    image:
      "https://images.unsplash.com/photo-1553909764-5a6a6b5c5e6c?w=400&h=300&fit=crop",
  },
  {
    id: "cr2",
    name: "Croque Madame",
    description: "Croque Monsieur + œuf au plat",
    price: 2000,
    category: "croques",
    image:
      "https://images.unsplash.com/photo-1553909764-5a6a6b5c5e6c?w=400&h=300&fit=crop",
    isFeatured: true,
  },
  {
    id: "cr3",
    name: "Croque Hawaïen",
    description: "Fromage, jambon, béchamel, ananas",
    price: 2000,
    category: "croques",
    image:
      "https://images.unsplash.com/photo-1553909764-5a6a6b5c5e6c?w=400&h=300&fit=crop",
  },
  {
    id: "cr4",
    name: "Croque Poulette",
    description: "Poulet, fromage, œuf",
    price: 2000,
    category: "croques",
    image:
      "https://images.unsplash.com/photo-1553909764-5a6a6b5c5e6c?w=400&h=300&fit=crop",
  },

  // 14. GLACES
  {
    id: "gl1",
    name: "Petit Pot",
    description: "1 boule au choix",
    price: 1000,
    category: "glaces",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e0a0?w=400&h=300&fit=crop",
  },
  {
    id: "gl2",
    name: "Moyen Pot",
    description: "2 boules au choix",
    price: 1500,
    category: "glaces",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e0a0?w=400&h=300&fit=crop",
  },
  {
    id: "gl3",
    name: "Grand Pot",
    description: "3 boules au choix",
    price: 2000,
    category: "glaces",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e0a0?w=400&h=300&fit=crop",
  },
  {
    id: "gl4",
    name: "Coupe Junior",
    description: "2 boules + chantilly + coulis",
    price: 2000,
    category: "glaces",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e0a0?w=400&h=300&fit=crop",
  },
  {
    id: "gl5",
    name: "Coupe Senior",
    description: "3 boules + chantilly + coulis + toppings",
    price: 3000,
    category: "glaces",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e0a0?w=400&h=300&fit=crop",
    isFeatured: true,
  },

  // 15. BOISSONS
  {
    id: "bv1",
    name: "Jus Locaux",
    description: "Bissap, Gingembre, Bouye, Ditax",
    price: 700,
    category: "boissons",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop",
  },
  {
    id: "bv2",
    name: "Canette",
    description: "Coca, Fanta, Sprite, Youki",
    price: 700,
    category: "boissons",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop",
  },
  {
    id: "bv3",
    name: "Cocktail",
    description: "Cocktail fruits frais maison",
    price: 1500,
    category: "boissons",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop",
  },
  {
    id: "bv4",
    name: "Eau Minérale PM",
    description: "Bouteille 50cl",
    price: 500,
    category: "boissons",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop",
  },
  {
    id: "bv5",
    name: "Eau Minérale GM",
    description: "Bouteille 1,5L",
    price: 1000,
    category: "boissons",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop",
  },
  {
    id: "bv6",
    name: "Boissons Chaudes",
    description: "Café, Café au Lait, Thé, Chocolat",
    price: 1000,
    category: "boissons",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop",
  },

  // 16. PÂTISSERIE
  {
    id: "pt1",
    name: "1 Portion Gâteau",
    description: "Part de gâteau maison du jour",
    price: 2000,
    category: "patisserie",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    isFeatured: true,
  },
  {
    id: "pt2",
    name: "Croissant",
    description: "Croissant pur beurre",
    price: 700,
    category: "patisserie",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
  },
  {
    id: "pt3",
    name: "Pain au Chocolat",
    description: "Viennoiserie au chocolat",
    price: 700,
    category: "patisserie",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
  },
  {
    id: "pt4",
    name: "Cake PM",
    description: "Part de cake aux fruits",
    price: 1000,
    category: "patisserie",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
  },
  {
    id: "pt5",
    name: "Croissant Jambon Fourré",
    description: "Croissant garni jambon-fromage",
    price: 1500,
    category: "patisserie",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
  },

  // 17. SUPPLÉMENTS
  {
    id: "sp1",
    name: "Frites",
    description: "Portion de frites maison",
    price: 1500,
    category: "supplements",
    image:
      "https://images.unsplash.com/photo-1585238341710-4b4e6784d0e2?w=400&h=300&fit=crop",
  },
  {
    id: "sp2",
    name: "Aloco",
    description: "Bananes plantain frites",
    price: 1500,
    category: "supplements",
    image:
      "https://images.unsplash.com/photo-1585238341710-4b4e6784d0e2?w=400&h=300&fit=crop",
  },
  {
    id: "sp3",
    name: "Attiéké",
    description: "Semoule de manioc",
    price: 1500,
    category: "supplements",
    image:
      "https://images.unsplash.com/photo-1585238341710-4b4e6784d0e2?w=400&h=300&fit=crop",
  },
  {
    id: "sp4",
    name: "Riz",
    description: "Portion de riz blanc ou wolof",
    price: 1500,
    category: "supplements",
    image:
      "https://images.unsplash.com/photo-1585238341710-4b4e6784d0e2?w=400&h=300&fit=crop",
  },
  {
    id: "sp5",
    name: "Couscous",
    description: "Portion de couscous",
    price: 1500,
    category: "supplements",
    image:
      "https://images.unsplash.com/photo-1585238341710-4b4e6784d0e2?w=400&h=300&fit=crop",
  },
];

export const categories = [
  { id: "entrees", label: "Entrées" },
  { id: "plats_jour", label: "Plats du Jour" },
  { id: "plats_garnis", label: "Plats Garnis" },
  { id: "dibi", label: "Dibi" },
  { id: "grillades", label: "Grillades" },
  { id: "fast_food", label: "Fast-Food" },
  { id: "hamburgers", label: "Hamburgers" },
  { id: "sandwichs", label: "Sandwichs" },
  { id: "tacos", label: "Tacos" },
  { id: "pizzas", label: "Pizzas" },
  { id: "crepes_sucrees", label: "Crêpes Sucrées" },
  { id: "crepes_salees", label: "Crêpes Salées" },
  { id: "croques", label: "Croques" },
  { id: "glaces", label: "Glaces" },
  { id: "boissons", label: "Boissons" },
  { id: "patisserie", label: "Pâtisserie" },
  { id: "supplements", label: "Suppléments" },
];

export const topProducts = products.filter((p) => p.isTopProduct);

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter((p) => p.category === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((p) => p.isFeatured).slice(0, 4);
};
