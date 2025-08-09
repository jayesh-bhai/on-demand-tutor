import { useEffect, useRef } from "react";
import { UserPlus, Search, MessageSquare, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up & Create Profile",
      description: "Tell us about your goals, interests, and what you're looking to achieve. This helps us match you with the perfect mentor.",
      step: "01"
    },
    {
      icon: Search,
      title: "Get Matched with Mentors",
      description: "Our smart algorithm connects you with experienced mentors in your field who align with your goals and learning style.",
      step: "02"
    },
    {
      icon: MessageSquare,
      title: "Start Learning Together",
      description: "Begin your mentorship journey with structured sessions, regular check-ins, and continuous support from your mentor.",
      step: "03"
    },
    {
      icon: TrendingUp,
      title: "Track Your Progress",
      description: "Monitor your growth, celebrate milestones, and see how far you've come with our built-in progress tracking tools.",
      step: "04"
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
              }, index * 200);
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
    <section id="how-it-works" ref={sectionRef} className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="fade-in-up text-3xl md:text-5xl font-bold mb-6">
            How <span className="gradient-text">SeniorWise</span> Works
          </h2>
          <p className="fade-in-up text-xl text-muted-foreground max-w-3xl mx-auto">
            Getting started with your mentorship journey is simple. Follow these four easy steps to begin transforming your career and personal growth.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-primary transform -translate-y-1/2 z-0"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="fade-in-up text-center">
                {/* Step Number */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-medium">
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>

                {/* Content */}
                <div className="glass-card rounded-xl p-6 h-full">
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="fade-in-up text-center mt-16">
          <div className="glass-card rounded-2xl p-8 md:p-12 bg-gradient-secondary">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students who have already transformed their careers with the help of our expert mentors.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="btn-hero">
                Get Started for Free
              </button>
              <button className="bg-secondary text-secondary-foreground font-semibold px-8 py-4 rounded-xl hover:bg-secondary/80 transition-all duration-300">
                Browse Mentors
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;