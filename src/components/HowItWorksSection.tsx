import { motion } from 'framer-motion';
import { UserPlus, ClipboardCheck, Map, BookOpen } from 'lucide-react';

const steps = [
  {
    title: 'Sign Up',
    description: 'Create your account and get access to our platform.',
    icon: UserPlus,
  },
  {
    title: 'Take a Diagnostic Test',
    description: 'Assess your current skills and identify your strengths and weaknesses.',
    icon: ClipboardCheck,
  },
  {
    title: 'Personalized Learning Plan',
    description: 'Get a customized learning plan based on your diagnostic test results.',
    icon: Map,
  },
  {
    title: 'Start Learning',
    description: 'Access our extensive study materials, practice tests, and expert coaching.',
    icon: BookOpen,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our simple and effective process is designed to help you achieve your dream IELTS score.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}