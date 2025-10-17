import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Rocket, 
  Satellite, 
  Cpu, 
  Radio, 
  Target, 
  Trophy, 
  Users, 
  Lightbulb,
  Code,
  TestTube,
  MapPin,
  CheckCircle
} from 'lucide-react';

interface Milestone {
  id: number;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  icon: React.ComponentType<{ className?: string }>;
  category: 'design' | 'development' | 'testing' | 'launch';
}

const milestones: Milestone[] = [
  {
    id: 1,
    title: 'Project Initiation',
    description: 'CanSat project team formation and initial planning phase',
    date: 'January 2024',
    status: 'completed',
    icon: Users,
    category: 'design'
  },
  {
    id: 2,
    title: 'Mission Requirements',
    description: 'Defined mission objectives, payload specifications, and system requirements',
    date: 'February 2024',
    status: 'completed',
    icon: Target,
    category: 'design'
  },
  {
    id: 3,
    title: 'System Design',
    description: 'Completed preliminary design review and system architecture',
    date: 'March 2024',
    status: 'completed',
    icon: Lightbulb,
    category: 'design'
  },
  {
    id: 4,
    title: 'Hardware Development',
    description: 'Sensor integration, PCB design, and hardware assembly',
    date: 'April 2024',
    status: 'completed',
    icon: Cpu,
    category: 'development'
  },
  {
    id: 5,
    title: 'Software Development',
    description: 'Flight control software, telemetry systems, and ground station development',
    date: 'May 2024',
    status: 'completed',
    icon: Code,
    category: 'development'
  },
  {
    id: 6,
    title: 'Communication Systems',
    description: 'Radio telemetry implementation and data transmission protocols',
    date: 'June 2024',
    status: 'completed',
    icon: Radio,
    category: 'development'
  },
  {
    id: 7,
    title: 'Ground Testing',
    description: 'Laboratory testing, calibration, and system validation',
    date: 'July 2024',
    status: 'completed',
    icon: TestTube,
    category: 'testing'
  },
  {
    id: 8,
    title: 'Integration Testing',
    description: 'Full system integration and pre-flight testing procedures',
    date: 'August 2024',
    status: 'completed',
    icon: CheckCircle,
    category: 'testing'
  },
  {
    id: 9,
    title: 'Dashboard Development',
    description: 'Real-time monitoring dashboard and data visualization systems',
    date: 'September 2024',
    status: 'in-progress',
    icon: Satellite,
    category: 'development'
  },
  {
    id: 10,
    title: 'Final Testing',
    description: 'Drop tests, environmental testing, and mission simulation',
    date: 'October 2024',
    status: 'in-progress',
    icon: TestTube,
    category: 'testing'
  },
  {
    id: 11,
    title: 'Launch Preparation',
    description: 'Final system checks, launch site preparation, and team coordination',
    date: 'November 2024',
    status: 'upcoming',
    icon: MapPin,
    category: 'launch'
  },
  {
    id: 12,
    title: 'Mission Launch',
    description: 'CanSat deployment, data collection, and mission execution',
    date: 'December 2024',
    status: 'upcoming',
    icon: Rocket,
    category: 'launch'
  },
  {
    id: 13,
    title: 'Mission Success',
    description: 'Data analysis, mission report, and competition submission',
    date: 'January 2025',
    status: 'upcoming',
    icon: Trophy,
    category: 'launch'
  }
];

const categoryColors = {
  design: 'from-red-700 to-red-800',
  development: 'from-blue-700 to-blue-800',
  testing: 'from-red-600 to-red-700',
  launch: 'from-blue-800 to-red-700'
};

const statusColors = {
  completed: 'bg-green-500/20 border-green-400/30 text-green-400',
  'in-progress': 'bg-yellow-500/20 border-yellow-400/30 text-yellow-400',
  upcoming: 'bg-gray-500/20 border-gray-400/30 text-gray-400'
};

// Motion Timeline Element Component with Intersection Observer
const MotionTimelineElement: React.FC<{
  milestone: Milestone;
  index: number;
}> = ({ milestone, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Allows multiple triggers
    threshold: 0.2,
    rootMargin: '-10% 0px -10% 0px' // Trigger when 20% visible
  });

  const Icon = milestone.icon;
  
  // Alternating red and blue colors with darker shades
  const alternatingColors = [
    'from-red-700 to-red-800',    // Red for indices 0, 2, 4, ...
    'from-blue-700 to-blue-800'   // Blue for indices 1, 3, 5, ...
  ];
  
  const iconColor = alternatingColors[index % 2];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ 
        duration: 0.8, 
        delay: inView ? 0.1 : 0,
        ease: "easeOut"
      }}
      className="relative flex items-start ml-16"
    >
      {/* Icon circle */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
        transition={{ 
          duration: 0.6, 
          delay: inView ? 0.2 : 0,
          type: "spring",
          stiffness: 200
        }}
        className={`absolute -left-12 w-16 h-16 rounded-full bg-gradient-to-r ${iconColor} 
                   flex items-center justify-center shadow-lg border-2 border-white/20 z-10`}
      >
        <Icon className="w-8 h-8 text-white drop-shadow-lg" />
      </motion.div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={inView ? 
          { opacity: 1, y: 0, scale: 1 } : 
          { opacity: 0, y: 20, scale: 0.95 }
        }
        transition={{ 
          duration: 0.6, 
          delay: inView ? 0.3 : 0,
          ease: "easeOut"
        }}
        whileHover={{ 
          scale: 1.02, 
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)" 
        }}
        className="flex-1 bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-xl p-6 
                  border border-white/20 dark:border-gray-700/50 shadow-xl hover:bg-white/15 
                  dark:hover:bg-black/30 transition-all duration-300"
      >
        <div className="flex justify-between items-start mb-3">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: inView ? 0.5 : 0 }}
            className="text-xl font-bold text-white"
          >
            {milestone.title}
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: inView ? 0.4 : 0 }}
            className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[milestone.status]}`}
          >
            {milestone.status.replace('-', ' ').toUpperCase()}
          </motion.div>
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: inView ? 0.6 : 0 }}
          className="text-gray-300 mb-3 leading-relaxed"
        >
          {milestone.description}
        </motion.p>
        
        <div className="flex justify-between items-center">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: inView ? 0.7 : 0 }}
            className="text-sm font-medium text-gray-400"
          >
            {milestone.date}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
            transition={{ delay: inView ? 0.8 : 0 }}
            className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryColors[milestone.category]} text-white`}
          >
            {milestone.category.toUpperCase()}
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Mission Stats Section with Intersection Observer
const MissionStatsSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
    rootMargin: '-10% 0px -10% 0px'
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
    >
      {[
        { label: 'Total Milestones', value: milestones.length, icon: Target },
        { label: 'Completed', value: milestones.filter(m => m.status === 'completed').length, icon: CheckCircle },
        { label: 'In Progress', value: milestones.filter(m => m.status === 'in-progress').length, icon: Radio },
        { label: 'Days to Launch', value: '45', icon: Rocket }
      ].map((stat, index) => {
        const StatIcon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={inView ? 
              { opacity: 1, scale: 1, y: 0 } : 
              { opacity: 0, scale: 0.8, y: 30 }
            }
            transition={{ 
              duration: 0.5, 
              delay: inView ? index * 0.1 + 0.2 : 0,
              ease: "easeOut"
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-xl p-6 text-center 
                      border border-white/20 dark:border-gray-700/50 shadow-xl hover:shadow-2xl
                      transition-all duration-300"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ 
                duration: 0.6, 
                delay: inView ? index * 0.1 + 0.4 : 0,
                type: "spring",
                stiffness: 200
              }}
            >
              <StatIcon className="w-8 h-8 mx-auto mb-3 text-red-600" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: inView ? index * 0.1 + 0.6 : 0 }}
              className="text-2xl font-bold text-white mb-1"
            >
              {stat.value}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: inView ? index * 0.1 + 0.7 : 0 }}
              className="text-sm text-gray-400"
            >
              {stat.label}
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen p-6 text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center items-center mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="mr-4"
          >
            
          </motion.div>
          <h1 className="text-5xl font-bold text-white">
            CanSat Mission Timeline
          </h1>
        </div>
        <p className="text-xl text-gray-300 mb-2">Team ID: 2024-ASI-CANSAT-038</p>
        <p className="text-gray-400">Journey to Space • Innovation • Excellence</p>
      </motion.div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl font-bold text-center mb-12 text-white"
        >
          
        </motion.h2>

        <div className="relative">
          {/* Main timeline line */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute left-8 top-0 w-1 bg-gradient-to-b from-red-700 via-red-600 to-blue-700 opacity-80"
          />

          {/* Timeline items with smooth re-trigger animation */}
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <MotionTimelineElement
                key={milestone.id}
                milestone={milestone}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Mission stats with intersection observer */}
        <MissionStatsSection />
      </div>
    </div>
  );
};

export default HomePage;