import { MessageCircle, FileText, Brain, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const iconMap = {
  MessageCircle,
  FileText,
  Brain,
  Users,
};

const staticFeatures = [
  {
    _id: "1",
    icon: "MessageCircle",
    title: "Personalized Coaching",
    description: "Tailored lessons to address your unique strengths and weaknesses.",
  },
  {
    _id: "2",
    icon: "FileText",
    title: "Extensive Study Material",
    description: "Access a wide range of curated practice tests and resources.",
  },
  {
    _id: "3",
    icon: "Brain",
    title: "AI-Powered Insights",
    description: "Smart feedback to accelerate your learning process.",
  },
  {
    _id: "4",
    icon: "Users",
    title: "Expert Community",
    description: "Collaborate and learn with peers and certified instructors.",
  },
];

export function FeaturesSection() {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {staticFeatures.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || MessageCircle;
            
            return (
              <Card 
                key={feature._id} 
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-blue-100 hover:border-blue-200 bg-gradient-to-br from-white to-blue-50/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
