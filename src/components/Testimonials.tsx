
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

const testimonials = [
  {
    content: "I was able to find a home loan with an interest rate much lower than what my bank offered. The eligibility checker made the process smooth and hassle-free.",
    author: "Karthik Subramaniam",
    title: "Home Loan Customer",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    content: "EasyLends helped me compare multiple personal loan offers from different banks. I saved over ₹50,000 in interest payments by choosing the best option.",
    author: "Lakshmi Narayanan",
    title: "Personal Loan Customer",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
  },
  {
    content: "The business loan calculator was incredibly accurate. I received exactly the loan amount I was pre-approved for and the funding came through within 36 hours.",
    author: "Venugopal Iyer",
    title: "Business Owner",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
  },
  {
    content: "As a first-time homebuyer, the mortgage process seemed overwhelming. EasyLends made it simple with their eligibility checker and comparison tools.",
    author: "Meenakshi Sundaram",
    title: "Home Loan Customer",
    image: "https://randomuser.me/api/portraits/women/48.jpg",
  },
];

const Testimonials = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return (
    <div className="py-16 bg-brandblue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-gray-600">
            Join thousands of satisfied customers who found the perfect loan through EasyLends
          </p>
        </div>
        
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <Card className="border-none bg-white shadow-md h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="mb-4">
                      <svg className="h-8 w-8 text-brandblue-300" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                    </div>
                    <p className="text-gray-700 mb-6 flex-grow">{testimonial.content}</p>
                    <div className="flex items-center mt-4">
                      <div 
                        className="relative"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <Avatar className={`h-12 w-12 transition-all duration-300 ${hoveredIndex === index ? 'scale-110 ring-2 ring-brandblue-400' : ''}`}>
                          <AvatarImage 
                            src={testimonial.image} 
                            alt={testimonial.author}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-brandblue-100 text-brandblue-700">
                            {testimonial.author.split(' ').map(name => name[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {hoveredIndex === index && (
                          <span className="animate-fade-in absolute -bottom-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandblue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-brandblue-500"></span>
                          </span>
                        )}
                      </div>
                      <div className="ml-4">
                        <p className={`font-medium text-gray-900 transition-all duration-300 ${hoveredIndex === index ? 'text-brandblue-600' : ''}`}>
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-gray-500">{testimonial.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonials;
