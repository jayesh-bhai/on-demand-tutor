import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, Award } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

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

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{
        background: `linear-gradient(135deg, hsl(250 84% 54% / 0.9), hsl(270 84% 64% / 0.8)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/5 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/5 rounded-full animate-bounce delay-700"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* Trust Indicators */}
        <div className="fade-in-up flex items-center justify-center space-x-6 mb-8">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">4.9/5 Rating</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">10k+ Students</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Award className="h-4 w-4" />
            <span className="text-sm font-medium">500+ Mentors</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="fade-in-up text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Connect with
          <span className="block bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Senior Mentors
          </span>
          Accelerate Your Growth
        </h1>

        {/* Subheadline */}
        <p className="fade-in-up text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-white/90">
          Join thousands of students who've transformed their careers with personalized guidance from experienced professionals and senior students.
        </p>

        {/* CTA Buttons */}
        <div className="fade-in-up flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
          <Link to="/signup">
            <Button variant="hero-outline" size="xl" className="group">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="#how-it-works">
            <Button variant="ghost" size="xl" className="text-white hover:bg-white/10">
              How It Works
            </Button>
          </Link>
        </div>

        {/* Social Proof */}
        <div className="fade-in-up grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">95%</div>
            <div className="text-white/80 text-sm">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">2.5x</div>
            <div className="text-white/80 text-sm">Faster Learning</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">48hrs</div>
            <div className="text-white/80 text-sm">Avg. Response</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
            <div className="text-white/80 text-sm">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;