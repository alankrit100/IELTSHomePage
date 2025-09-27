import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, FileText, Brain, Users } from 'lucide-react';

const features = [
  {
    icon: MessageCircle,
    title: "Personalized Coaching",
    description: "Tailored lessons to address your unique strengths and weaknesses.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
  },
  {
    icon: FileText,
    title: "Extensive Study Material",
    description: "Access a wide range of curated practice tests and resources.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Smart feedback to accelerate your learning process.",
    image: "https://images.unsplash.com/photo-1581092446347-a84c03b2b1b3?w=800&q=80",
  },
  {
    icon: Users,
    title: "Expert Community",
    description: "Collaborate and learn with peers and certified instructors.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
  },
];

export function FeaturesSection() {
  const [selectedTab, setSelectedTab] = useState(features[0]);

  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              IELTS Excellence?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive approach combines cutting-edge technology with expert instruction
            to deliver exceptional results for every student.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-4">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ scale: 1.05, z: 10 }}
                whileTap={{ scale: 0.95 }}
                className={`p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedTab.title === feature.title
                    ? 'bg-blue-100 shadow-lg'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedTab(feature)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            key={selectedTab.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-96 rounded-lg overflow-hidden"
          >
            <img
              src={selectedTab.image}
              alt={selectedTab.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}