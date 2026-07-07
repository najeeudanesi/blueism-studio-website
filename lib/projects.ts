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
    image: 'https://i.ibb.co/HfTQvR59/Whats-App-Image-2025-05-26-at-20-52-54-1.jpg',
    tall: true,
    description: 'A residential space designed as an architectural haven of raw concrete and filtered light. — مساحة سكنية مصممة كملاذ معماري من الخرسانة الخام والضوء المصفى.',
    challenge: 'Balancing the inherent coldness of structural raw concrete with warm, inviting residential living spaces while maintaining a strict minimalist layout. — موازنة البرودة الكامنة في الخرسانة الخام مع مساحات معيشة دافئة وجذابة مع الحفاظ على تصميم مبسط وصارم.',
    approach: 'We introduced hand-crafted warm cedar wood panels and strategic light wells that cast moving shadows throughout the day, altering the spatial mood dynamically. — قمنا بدمج ألواح خشب الأرز الدافئة المصنوعة يدويًا ومناور استراتيجية تلقي بظلال متحركة طوال اليوم، مما يغير الحالة المزاجية للمكان ديناميكيًا.',
    result: 'A light-filled, 450-square-meter sanctuary that feels both monolithic and intimate, celebrating local Moroccan textures with a modern architectural syntax. — ملاذ مليء بالضوء بمساحة ٤٥٠ مترًا مربعًا يجمع بين الطابع المترابط والحميمي، ويحتفي بالأسطح المغربية المحلية بلغة معمارية حديثة.',
    gallery: [
      'https://i.ibb.co/HfTQvR59/Whats-App-Image-2025-05-26-at-20-52-54-1.jpg',
      'https://i.ibb.co/BDGqPjv/Whats-App-Image-2025-05-26-at-20-52-54-4.jpg',
      'https://i.ibb.co/6cFdz86Q/Whats-App-Image-2025-05-26-at-20-52-54-2.jpg',
      'https://i.ibb.co/QvPXyQ38/Whats-App-Image-2025-05-26-at-20-52-53.jpg'
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
  },
  {
    slug: 'suits',
    number: '06',
    title: 'SUITS',
    discipline: 'Product Design',
    year: '2025',
    location: 'Paris, France',
    image: 'https://i.ibb.co/Q3LDPmk6/Whats-App-Image-2025-05-26-at-20-48-02.jpg',
    tall: true,
    description: 'An olfactory extension of modern tailoring. SUITS translates the structural precision, material weight, and clean lines of bespoke sartorial craft into a high-end conceptual fragrance.',
    challenge: 'Expressing the physical presence, wool texture, and sharp geometry of custom suits in a liquid fragrance bottle design.',
    approach: 'We developed a monolithic glass bottle featuring sharp 90-degree corners, wrapped in a tactile textured sleeve resembling premium suit fabric, capped with a heavy brushed-metal lid.',
    result: 'A highly acclaimed concept showcase that redefines fashion-fragrance crossover, featuring minimalist editorial typography and raw product presentation.',
    gallery: [
      'https://i.ibb.co/Q3LDPmk6/Whats-App-Image-2025-05-26-at-20-48-02.jpg',
      'https://i.ibb.co/qYPswHNs/Whats-App-Image-2025-05-26-at-20-48-02-1.jpg',
      'https://i.ibb.co/vCvqP9q2/01-Whats-App-Image-2025-05-26-at-20-48-01-2.jpg',
      'https://i.ibb.co/j92YyzPk/Whats-App-Image-2025-05-26-at-20-48-01-3.jpg'
    ]
  },
  {
    slug: 'manarah',
    number: '07',
    title: 'MANARAH',
    discipline: 'Product Design',
    year: '2025',
    location: 'Dubai, UAE',
    image: 'https://i.ibb.co/7NS8fV9x/Whats-App-Image-2025-05-26-at-20-48-01.jpg',
    tall: true,
    description: 'An exploration in product design focused on minimalist forms, warm textures, and illuminating modern spaces.',
    challenge: 'Designing a physical product that balances bold aesthetic presence with functional simplicity and ergonomic comfort.',
    approach: 'We utilized sleek, timeless materials and geometric precision to craft an object that feels both grounded and weightless.',
    result: 'A versatile and tactile product that seamlessly integrates into contemporary environments, celebrating the essence of pure design.',
    gallery: [
      'https://i.ibb.co/7NS8fV9x/Whats-App-Image-2025-05-26-at-20-48-01.jpg',
      'https://i.ibb.co/7NS8fV9x/Whats-App-Image-2025-05-26-at-20-48-01.jpg',
      'https://i.ibb.co/7NS8fV9x/Whats-App-Image-2025-05-26-at-20-48-01.jpg',
      'https://i.ibb.co/7NS8fV9x/Whats-App-Image-2025-05-26-at-20-48-01.jpg'
    ]
  }
]

