import { useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineering Student",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "My mentor helped me land my dream internship at Google. The personalized guidance and industry insights were invaluable. I couldn't have done it without SeniorWise!",
      rating: 5,
      company: "Stanford University"
    },
    {
      name: "Marcus Johnson",
      role: "Business Student",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "The networking opportunities and career advice I received through SeniorWise were game-changing. My mentor introduced me to key industry professionals.",
      rating: 5,
      company: "Harvard Business School"
    },
    {
      name: "Emily Rodriguez",
      role: "Data Science Graduate",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "From resume reviews to mock interviews, my mentor covered everything. I felt confident and prepared for every step of my job search journey.",
      rating: 5,
      company: "MIT"
    },
    {
      name: "David Kim",
      role: "UX Design Student",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "The design feedback and portfolio guidance I received helped me create work that stands out. My mentor's experience in the industry was exactly what I needed.",
      rating: 5,
      company: "Carnegie Mellon"
    },
    {
      name: "Priya Patel",
      role: "Pre-Med Student",
      avatar: "https://images.unsplash.com/photo-1559113202-c916b8e44373?w=150&h=150&fit=crop&crop=face",
      content: "Having a mentor who had already gone through medical school was incredibly helpful. They guided me through the MCAT prep and application process.",
      rating: 5,
      company: "Johns Hopkins"
    },
    {
      name: "Alex Thompson",
      role: "Marketing Graduate",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content: "My mentor helped me understand the marketing industry landscape and connected me with opportunities I never would have found on my own.",
      rating: 5,
      company: "Northwestern"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in-up').forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate');
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="section-padding bg-gradient-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="fade-in-up text-3xl md:text-5xl font-bold mb-6">
            What Our <span className="gradient-text">Students Say</span>
          </h2>
          <p className="fade-in-up text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Hear from students who've transformed their careers and achieved their goals with SeniorWise mentorship.
          </p>
        </div>

        {/* Stats Row */}
        <div className="fade-in-up grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">98%</div>
            <div className="text-muted-foreground">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">4.9</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">85%</div>
            <div className="text-muted-foreground">Career Advancement</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">10k+</div>
            <div className="text-muted-foreground">Success Stories</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="fade-in-up glass-card rounded-xl p-6 hover:scale-105 transition-transform duration-300"
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-primary mb-4" />
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-xs text-primary font-medium">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="fade-in-up text-center mt-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Write Your Success Story?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of successful students and start your mentorship journey today.
          </p>
          <button className="btn-hero">
            Start Your Journey Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;