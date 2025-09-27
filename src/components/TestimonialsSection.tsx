import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Ananya Sharma",
      avatar: "/avatars/ananya.jpg",
      bandScore: 8.0,
      rating: 5,
      testimonial:
        "The coaching and personalized guidance helped me achieve my target band score on the first attempt!",
    },
    {
      id: 2,
      name: "Rohan Patel",
      avatar: "/avatars/rohan.jpg",
      bandScore: 7.5,
      rating: 4,
      testimonial:
        "Mock tests felt just like the real exam. That practice made all the difference.",
    },
    {
      id: 3,
      name: "Priya Verma",
      avatar: "/avatars/priya.jpg",
      bandScore: 8.5,
      rating: 5,
      testimonial:
        "The one-on-one speaking sessions really boosted my confidence. Highly recommended!",
    },
    {
      id: 4,
      name: "Amit Singh",
      avatar: "/avatars/amit.jpg",
      bandScore: 8.0,
      rating: 5,
      testimonial: "The AI-powered feedback was a game-changer for my writing skills. I'm so grateful for the support.",
    },
    {
      id: 5,
      name: "Sneha Reddy",
      avatar: "/avatars/sneha.jpg",
      bandScore: 7.5,
      rating: 5,
      testimonial: "I loved the community aspect. It was great to connect with other students and share our experiences.",
    },
  ];

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Success Stories from Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Students
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our successful
            students have to say about their IELTS journey with us.
          </p>
        </div>

        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <div className="p-1">
                  <Card
                    className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-blue-100 hover:border-blue-200"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Avatar className="h-12 w-12 mr-4 ring-2 ring-blue-100">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                          <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {testimonial.name}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Band Score:</span>
                            <span className="font-bold text-blue-600">
                              {testimonial.bandScore}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center mb-4">
                        {renderStars(testimonial.rating)}
                      </div>

                      <div className="relative">
                        <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-200" />
                        <p className="text-gray-700 leading-relaxed pl-6 italic">
                          &quot;{testimonial.testimonial}&quot;
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}