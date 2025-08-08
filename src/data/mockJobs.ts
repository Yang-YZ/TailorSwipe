import { Job } from '../types'

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    description: 'We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining our web applications using React, TypeScript, and modern web technologies.',
    requirements: [
      '5+ years of experience with React/TypeScript',
      'Strong understanding of modern JavaScript',
      'Experience with state management (Redux, Zustand)',
      'Knowledge of CSS frameworks (Tailwind, Styled Components)',
      'Experience with testing frameworks (Jest, React Testing Library)'
    ],
    benefits: [
      'Competitive salary and equity',
      'Flexible work hours and remote options',
      'Health, dental, and vision insurance',
      '401(k) matching',
      'Professional development budget'
    ],
    postedDate: '2024-01-15',
    remote: true,
    fullTime: true,
    experience: '5+ years',
    education: 'Bachelor\'s degree in Computer Science or related field'
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'InnovateTech',
    location: 'New York, NY',
    salary: '$130,000 - $160,000',
    description: 'Join our product team to help shape the future of our platform. You will work closely with engineering, design, and business teams to define and execute product strategy.',
    requirements: [
      '3+ years of product management experience',
      'Strong analytical and problem-solving skills',
      'Experience with agile methodologies',
      'Excellent communication and collaboration skills',
      'Technical background or understanding preferred'
    ],
    benefits: [
      'Competitive salary and benefits',
      'Hybrid work model',
      'Comprehensive health coverage',
      'Annual bonus and equity',
      'Learning and development opportunities'
    ],
    postedDate: '2024-01-14',
    remote: false,
    fullTime: true,
    experience: '3+ years',
    education: 'Bachelor\'s degree required, MBA preferred'
  },
  {
    id: '3',
    title: 'Data Scientist',
    company: 'DataFlow Analytics',
    location: 'Austin, TX',
    salary: '$110,000 - $140,000',
    description: 'We are seeking a Data Scientist to help us extract insights from large datasets and build machine learning models that drive business decisions.',
    requirements: [
      'Master\'s degree in Statistics, Mathematics, or related field',
      '3+ years of experience in data science',
      'Proficiency in Python, R, or similar',
      'Experience with machine learning frameworks',
      'Strong statistical analysis skills'
    ],
    benefits: [
      'Competitive salary and equity',
      'Remote-first culture',
      'Health and wellness benefits',
      'Conference and training budget',
      'Flexible PTO'
    ],
    postedDate: '2024-01-13',
    remote: true,
    fullTime: true,
    experience: '3+ years',
    education: 'Master\'s degree in Statistics, Mathematics, or related field'
  },
  {
    id: '4',
    title: 'UX/UI Designer',
    company: 'Creative Studios',
    location: 'Los Angeles, CA',
    salary: '$90,000 - $120,000',
    description: 'Join our creative team to design beautiful and functional user experiences. You will work on a variety of projects from web applications to mobile apps.',
    requirements: [
      '3+ years of UX/UI design experience',
      'Proficiency in Figma, Sketch, or similar tools',
      'Strong portfolio showcasing web and mobile designs',
      'Understanding of user-centered design principles',
      'Experience with design systems'
    ],
    benefits: [
      'Competitive salary',
      'Creative and collaborative environment',
      'Health and dental insurance',
      'Professional development opportunities',
      'Flexible work arrangements'
    ],
    postedDate: '2024-01-12',
    remote: true,
    fullTime: true,
    experience: '3+ years',
    education: 'Bachelor\'s degree in Design or related field'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'CloudScale Systems',
    location: 'Seattle, WA',
    salary: '$130,000 - $160,000',
    description: 'We are looking for a DevOps Engineer to help us build and maintain our cloud infrastructure and deployment pipelines.',
    requirements: [
      '4+ years of DevOps experience',
      'Strong knowledge of AWS, Azure, or GCP',
      'Experience with Docker and Kubernetes',
      'Proficiency in scripting languages (Python, Bash)',
      'Experience with CI/CD pipelines'
    ],
    benefits: [
      'Competitive salary and equity',
      'Remote work options',
      'Comprehensive health benefits',
      'Professional development budget',
      'Flexible working hours'
    ],
    postedDate: '2024-01-11',
    remote: true,
    fullTime: true,
    experience: '4+ years',
    education: 'Bachelor\'s degree in Computer Science or related field'
  }
] 