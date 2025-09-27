import { ArrowRight, Star, Users, Award, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { icon: Users, value: '5000+', label: 'Students Trained' },
    { icon: Award, value: '95%', label: 'Success Rate' },
    { icon: TrendingUp, value: '8.5', label: 'Average Band Score' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 font-sans">
      {/* 1. ANIMATED BACKGROUND: Subtle Shimmer Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Custom shimmer effect added here */}
        <div className="absolute inset-0 opacity-20 animate-shimmer" />
      </div>

      {/* 2. Floating Animated Background Blobs with Parallax */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ transform: `translateY(${offsetY * 0.1}px)` }} />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000" style={{ transform: `translateY(${offsetY * 0.05}px)` }} />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-4000" style={{ transform: `translateY(${offsetY * 0.15}px)` }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT - Staggered Fade-In */}
          <div className="text-center lg:text-left">

            {/* Tagline - Fade in 1 */}
            <div className="flex items-center justify-center lg:justify-start mb-6 animate-fade-in-up-1">
              <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-blue-300 transform hover:scale-[1.02] transition-transform">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold text-gray-800">Rated #1 IELTS Institute</span>
              </div>
            </div>

            {/* Title - Fade in 2 */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight animate-fade-in-up-2">
              Achieve Your Dream{' '}
              <span className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                IELTS Score
              </span>
            </h1>

            {/* Subtext - Fade in 3 */}
            <p className="text-xl text-gray-600 mb-10 leading-relaxed animate-fade-in-up-3">
              Join thousands of successful students who achieved their target IELTS band scores with our
              expert guidance, AI-powered practice tests, and personalized coaching programs.
            </p>

            {/* Buttons - Fade in 4 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-14 animate-fade-in-up-4">
              <Button
                onClick={scrollToContact}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-indigo-400/50"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 animate-pulse-slow" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-full transition-all duration-300"
              >
                Book Free Consultation
              </Button>
            </div>

            {/* Stats - Fade in 5 with Pop Out Effect */}
            <div className="grid grid-cols-3 gap-6 animate-fade-in-up-5">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="p-6 bg-white/95 backdrop-blur-md border border-blue-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer hover:scale-105"
                >
                  <div className="text-center">
                    <stat.icon className="h-7 w-7 text-blue-600 mx-auto mb-3" />
                    <div className="text-3xl font-extrabold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT - Image and Floating Cards */}
          <div className="relative hidden lg:block animate-fade-in-up-3 group">
            <div className="relative z-10 p-4 bg-white rounded-3xl shadow-3xl animate-pop-in transition-transform duration-500 group-hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="Students studying for IELTS"
                className="rounded-2xl shadow-inner w-full h-[550px] object-cover animate-breathing"
              />

              {/* Floating Cards with subtle animation */}
              <Card className="absolute -top-10 -left-10 p-5 bg-white/95 backdrop-blur-lg shadow-2xl animate-float-1 border border-gray-100 transition-transform duration-1500 group-hover:scale-110">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-gray-900">Band 8.5</div>
                    <div className="text-sm text-gray-600">Average Score</div>
                  </div>
                </div>
              </Card>

              <Card className="absolute -bottom-10 -right-10 p-5 bg-white/95 backdrop-blur-lg shadow-2xl animate-float-2 border border-gray-100 transition-transform duration-1500 group-hover:scale-110">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-gray-900">5000+</div>
                    <div className="text-sm text-gray-600">Success Stories</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}