export interface Project {
  slug: string
  number: string
  title: string
  discipline: string
  year: string
  location: string
  image: string
  tall: boolean
  description: string
  challenge: string
  approach: string
  result: string
  gallery: string[]
}

export const projects: Project[] = [
  {
    slug: 'concrete-sanctuary',
    number: '01',
    title: 'Concrete Sanctuary',
    discipline: 'Interior Architecture',
    year: '2024',
    location: 'Casablanca, Morocco',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85',
    tall: true,
    description: 'A residential space designed as an architectural haven of raw concrete and filtered light. Our goal was to create a quiet sanctuary from the bustling city outside.',
    challenge: 'Balancing the inherent coldness of structural raw concrete with warm, inviting residential living spaces while maintaining a strict minimalist layout.',
    approach: 'We introduced hand-crafted warm cedar wood panels and strategic light wells that cast moving shadows throughout the day, altering the spatial mood dynamically.',
    result: 'A light-filled, 450-square-meter sanctuary that feels both monolithic and intimate, celebrating local Moroccan textures with a modern architectural syntax.',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=80',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=900&q=80'
    ]
  },
  {
    slug: 'brutalist-forms',
    number: '02',
    title: 'Brutalist Forms',
    discipline: '3D Design',
    year: '2024',
    location: 'Virtual Exhibit',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&q=85',
    tall: false,
    description: 'An exploration of CGI and digital art looking at raw material behaviors in simulated zero-gravity environments.',
    challenge: 'Translating the sensory weight, rough texture, and visual density of concrete and heavy stone into a digital space.',
    approach: 'We built high-fidelity custom ray-traced materials with micro-imperfections, rendering them floating in light-filled gallery rooms.',
    result: 'An interactive virtual exhibition visited by over 50,000 digital attendees, blurring the lines between structural sculpture and digital execution.',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=900&q=80'
    ]
  },
  {
    slug: 'still-objects',
    number: '03',
    title: 'Still Objects',
    discipline: 'Product Design',
    year: '2023',
    location: 'Milan, Italy',
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1600&q=85',
    tall: false,
    description: 'A collection of tabletop items designed to invite mindfulness and tactile presence into daily life.',
    challenge: 'Designing functional objects that maintain an artistic, silent presence when not in active use.',
    approach: 'Using sand-cast aluminum, raw volcanic stone, and mouth-blown glass, we crafted simple geometric shapes that emphasize weight and texture.',
    result: 'A series of 5 core pieces presented at Milan Design Week, receiving critical acclaim for tactile materiality and honest geometry.',
    gallery: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=900&q=80'
    ]
  },
  {
    slug: 'digital-surface',
    number: '04',
    title: 'Digital Surface',
    discipline: 'UI/UX',
    year: '2023',
    location: 'Stockholm, Sweden',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=85',
    tall: true,
    description: 'An interactive e-commerce platform for an architectural publisher, designed like an editorial book layout.',
    challenge: 'Creating a highly functional digital shopping experience that doesn\'t lose the quiet, high-end editorial feel of physical print.',
    approach: 'We developed an asymmetric grid layout, large editorial serif typography, and custom micro-interactions that feel like page turns.',
    result: 'A 45% increase in session duration and a 30% boost in conversion rates, demonstrating that design aesthetic drives user action.',
    gallery: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80'
    ]
  },
  {
    slug: 'neural-systems',
    number: '05',
    title: 'Neural Systems',
    discipline: 'Software',
    year: '2024',
    location: 'Casablanca / SF',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1600&q=85',
    tall: true,
    description: 'A generative layout engine built to automatically design editorial layouts from raw text content.',
    challenge: 'Structuring abstract machine learning models to respect classical grid layouts and golden ratio guidelines.',
    approach: 'We trained custom heuristics on dynamic design systems, allowing a Next.js React frontend to dynamically compile grids.',
    result: 'An open-source layout package with over 10k stars on GitHub, bridging the gap between raw data and professional editorial design.',
    gallery: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80'
    ]
  }
]
