import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Video, 
  Calendar,
  BookOpen,
  Users,
  Star,
  Clock,
  Shield
} from "lucide-react";

const Features = () => {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const tabs = [
    {
      id: 0,
      name: "Mentorship",
      icon: Users,
      title: "1-on-1 Personalized Mentorship",
      description: "Get paired with senior students and professionals who've walked your path. Receive personalized guidance, career advice, and support tailored to your goals.",
      features: [
        "Matched based on your field and goals",
        "Regular scheduled sessions",
        "Progress tracking and feedback",
        "Industry-specific insights"
      ]
    },
    {
      id: 1,
      name: "Communication",
      icon: MessageSquare,
      title: "Seamless Communication",
      description: "Multiple ways to connect with your mentor through our integrated platform. From quick messages to detailed video sessions.",
      features: [
        "Real-time messaging",
        "Video calls integration",
        "File sharing and resources",
        "Mobile-first design"
      ]
    },
    {
      id: 2,
      name: "Learning",
      icon: BookOpen,
      title: "Structured Learning Path",
      description: "Follow curated learning paths designed by industry experts. Track your progress and celebrate milestones along the way.",
      features: [
        "Personalized curricula",
        "Progress tracking",
        "Milestone celebrations",
        "Resource library access"
      ]
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Save Time",
      description: "Learn from those who've already made the mistakes so you don't have to."
    },
    {
      icon: Star,
      title: "Quality Mentors",
      description: "All mentors are vetted and have proven track records in their fields."
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "Secure platform with privacy protection and community guidelines."
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Schedule sessions that work for both you and your mentor."
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
              }, index * 150);
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
    <section id="features" ref={sectionRef} className="section-padding bg-gradient-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="fade-in-up text-3xl md:text-5xl font-bold mb-6">
            Everything You Need to
            <span className="gradient-text block">Succeed</span>
          </h2>
          <p className="fade-in-up text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform connects you with the right mentors and provides all the tools you need for effective learning and growth.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="fade-in-up flex flex-wrap justify-center mb-12">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "hero" : "ghost"}
              size="lg"
              onClick={() => setActiveTab(tab.id)}
              className="mx-2 mb-4"
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.name}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="fade-in-up glass-card rounded-2xl p-8 md:p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">{tabs[activeTab].title}</h3>
              <p className="text-lg text-muted-foreground mb-8">
                {tabs[activeTab].description}
              </p>
              <ul className="space-y-4">
                {tabs[activeTab].features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Star className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-primary rounded-2xl flex items-center justify-center">
                {React.createElement(tabs[activeTab].icon, {
                  className: "h-32 w-32 text-white"
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="fade-in-up glass-card rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3">{benefit.title}</h4>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;