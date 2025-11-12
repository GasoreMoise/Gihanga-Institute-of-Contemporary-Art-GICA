export type Contributor = {
  name: string;
  role: string;
  links?: {
    linkedin?: string;
    portfolio?: string;
    email?: string;
  };
};

export const contributors: Contributor[] = [
  { name: 'KAMI GAHIGA', role: 'Co-Founding Director' },
  { name: 'KANEZA SCHAAL', role: 'Co-Founding Director' },
  { name: 'CHRISTIAN NYAMPETA', role: 'Library & Film Custodian' },
  { name: 'AMIN GAFARANGA', role: 'Architect' },
  { name: 'ERIC KACOU', role: 'Institute Advisor' },
  { name: 'LYDIE MURORUNKWERE', role: 'Institute Counsel' },
  { 
    name: 'MOISE NSHUTI GASORE', 
    role: 'Lead Website Designer & Developer',
    /*
    links: {
      linkedin: 'https://www.linkedin.com/in/moise-nshuti-gasore',
      portfolio: 'https://gnmoise.vercel.app/',
      email: 'mailto:gasorenm44@gmail.com'
    }
    */
  },
  { name: 'FANNY BOURDETTE-DONON', role: 'Lead Communications & Cultural Liaison' },
  { name: 'TEVIN MUKWENDE', role: 'Communications Officer' },
  { name: "NONTSIKELELO MUTITI", role: 'Design & Visual Consultant' },
  { name: 'ALVIN ASHIATEY', role: 'Design & Visual Consultant' }
];

export const foundingBenefactor = {
  heading: 'FOUNDING BENEFACTOR',
  body:
    'We are grateful for the generous support extended to us by the Mellon Foundation, our Founding Benefactor.'
};


