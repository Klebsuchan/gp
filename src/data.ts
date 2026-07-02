export interface Product {
  id: string;
  title: string;
  originalPrice: number;
  dealPrice: number;
  image: string;
  badge?: string;
  link: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    title: "Kindle Paperwhite 16GB",
    originalPrice: 499.00,
    dealPrice: 399.00,
    image: "https://images.unsplash.com/photo-1592496001020-d31bd830651f?auto=format&fit=crop&q=80&w=400&h=400",
    badge: "OFERTA ÉPICA!",
    link: "#",
    category: "eletronicos"
  },
  {
    id: "2",
    title: "Console PlayStation 5",
    originalPrice: 4499.00,
    dealPrice: 3899.00,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=400&h=400",
    badge: "KABOOM!",
    link: "#",
    category: "games"
  },
  {
    id: "3",
    title: "Box Harry Potter - Edição Castelo",
    originalPrice: 350.00,
    dealPrice: 199.90,
    image: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?auto=format&fit=crop&q=80&w=400&h=400",
    link: "#",
    category: "livros"
  },
  {
    id: "4",
    title: "Action Figure Homem-Aranha Colecionável",
    originalPrice: 220.00,
    dealPrice: 149.90,
    image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=400&h=400",
    badge: "POW!",
    link: "#",
    category: "games"
  },
  {
    id: "5",
    title: "Echo Dot (5ª Geração) com Alexa",
    originalPrice: 349.00,
    dealPrice: 249.00,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&q=80&w=400&h=400",
    link: "#",
    category: "eletronicos"
  },
  {
    id: "6",
    title: "Headset Gamer Sem Fio RGB",
    originalPrice: 599.00,
    dealPrice: 379.00,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400&h=400",
    badge: "NÍVEL MÁXIMO!",
    link: "#",
    category: "games"
  }
];
