import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, Heart, X } from 'lucide-react';

function App() {
  const [isVisible, setIsVisible] = useState({
    about: false,
    projects: false,
    contact: false
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showWebModal, setShowWebModal] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = ['about', 'projects', 'contact'];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleWebProjectClick = () => {
    setShowWebModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeWebModal = () => {
    setShowWebModal(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#451e1a' }}>
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-orange-400 to-red-500 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Web Projects Modal */}
      {showWebModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="text-2xl font-serif text-gray-900">Web Development Projects</h3>
              <button 
                onClick={closeWebModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-8">
              {webProjects.map((project, index) => (
                <div 
                  key={index}
                  className="border border-blue-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-6 text-white">
                        <h4 className="text-xl font-serif mb-2">{project.title}</h4>
                        <p className="text-sm text-gray-200">{project.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, i) => (
                        <span 
                          key={i}
                          className="px-2 py-1 bg-blue-50 text-sm rounded-full text-blue-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Visit Website <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section with Video Background */}
      <section className="min-h-screen relative flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#451e1a]/70 via-[#5a2922]/70 to-[#6a3329]/70 backdrop-blur-sm z-10"></div>
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover scale-105"
          >
            <source src="/background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="relative z-20 text-center px-4 animate-fade-in">
          <div className="mb-8 relative">
            <h1 className="text-5xl md:text-7xl font-serif mb-6 drop-shadow-lg hover:scale-105 transition-transform duration-300">
              Welcome to my portfolio!
            </h1>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-amber-400 to-red-400"></div>
          </div>
          <p className="text-xl md:text-2xl font-light mb-8 drop-shadow hover:text-amber-100 transition-colors">
            Nanotechnology Engineering Student at University of Waterloo
          </p>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/EGichuhi" className="social-link group">
              <Github size={24} className="group-hover:text-amber-300 transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/eunicegichuhi/" className="social-link group">
              <Linkedin size={24} className="group-hover:text-orange-300 transition-colors" />
            </a>
            <a href="emailto:eunice.gwanja@gmail.com" className="social-link group">
              <Mail size={24} className="group-hover:text-red-300 transition-colors" />
            </a>
          </div>
        </div>
        <a 
          href="#about"
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 animate-bounce nav-indicator group"
        >
          <ChevronDown size={32} className="drop-shadow-lg group-hover:text-amber-200 transition-colors" />
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#451e1a]/90 to-[#5a2922]/90"></div>
        <div className={`max-w-4xl mx-auto relative ${isVisible.about ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="flex justify-center mb-12">
            <h2 className="text-3xl font-serif text-center section-title group text-white">
              About Me
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 group-hover:scale-125 transition-transform">
                <Heart size={20} className="text-amber-500 fill-amber-500 group-hover:text-red-500 group-hover:fill-red-500 transition-colors" />
              </span>
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <img
              src="/portme.png"
              alt="Profile"
              className={`w-48 h-48 rounded-full object-cover ring-4 ring-amber-100 ${isVisible.about ? 'animate-slide-in-left' : 'opacity-0'}`}
            />
            <div className={`flex-1 ${isVisible.about ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <p className="text-lg text-amber-100 leading-relaxed mb-4">
              I'm an aspiring engineer pursuing a Bachelor's degree in Nanotechnology at the University of Waterloo, with a strong passion for data-driven problem-solving and innovation. My multidisciplinary background bridges engineering, programming, and data analysis, allowing me to tackle complex challenges from multiple perspectives.              </p>
              <p className="text-lg text-amber-100 leading-relaxed mb-4">
              I have solid experience in data analysis and computational modeling, working with Python, SQL, and tools like Pandas, NumPy, Matplotlib, and Seaborn. While I'm still growing my expertise in machine learning, I have a strong foundation in data-driven problem-solving. Additionally, my technical background includes exposure to engineering software such as COMSOL, AutoCAD, and MATLAB, alongside proficiency in Python, HTML, and CSS.              </p>
              <p className="text-lg text-amber-100 leading-relaxed">
              I'm currently seeking internship opportunities in data, where I can apply and expand my analytical skills while gaining hands-on experience with real-world datasets and data-driven solutions. I'm eager to learn from experienced professionals, deepen my technical expertise, and contribute to innovative projects as I grow into a data-focused role.              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20" style={{ backgroundColor: '#5a2922' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center mb-12">
            <h2 className="text-3xl font-serif text-center section-title text-white">
              Work Experience
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                <Heart size={20} className="text-amber-500 fill-amber-500" />
              </span>
            </h2>
          </div>
          <div className="space-y-12">
            {/* Operations Engineer Position */}
            <div className="bg-[#451e1a] rounded-lg shadow-lg p-8 border border-amber-900/30 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <h3 className="text-xl font-serif text-amber-100">Operations Engineer & Technology Intern</h3>
                <p className="text-amber-400">JAN 2025 - Present</p>
              </div>
              <h4 className="text-lg text-amber-200 mb-2">Second Bind, Toronto, ON</h4>
              <ul className="list-disc list-inside space-y-2 text-amber-100">
                <li>Streamlined operational systems by implementing AI automations to reduce repetitive tasks and enhance workflows</li>
                <li>Improved process efficiency by identifying bottlenecks and implementing solutions that reduced operational delays</li>
                <li>Increased throughput through strategic process optimization and innovative technological solutions</li>
                <li>Collaborated with cross-functional teams to implement and maintain operational improvements</li>
              </ul>
            </div>

            {/* Telus International */}
            <div className="bg-[#451e1a] rounded-lg shadow-lg p-8 border border-amber-900/30 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <h3 className="text-xl font-serif text-amber-100">Data Analyst</h3>
                <p className="text-amber-400">JAN 2024 - JUNE 2024</p>
              </div>
              <h4 className="text-lg text-amber-200 mb-2">Telus International, Vancouver, BC (Remote)</h4>
              <ul className="list-disc list-inside space-y-2 text-amber-100">
                <li>Conducted detailed reviews of AI-generated responses with 98% accuracy in protocol adherence</li>
                <li>Enhanced reliability of user-facing responses by identifying and resolving AI output inconsistencies</li>
                <li>Upskilled in SQL, experimenting with database querying and Jupyter Notebooks</li>
              </ul>
            </div>

            {/* AmLive */}
            <div className="bg-[#451e1a] rounded-lg shadow-lg p-8 border border-amber-900/30 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <h3 className="text-xl font-serif text-amber-100">Data Engineering Intern</h3>
                <p className="text-amber-400">JAN 2023 - APR 2023</p>
              </div>
              <h4 className="text-lg text-amber-200 mb-2">AmLive, Toronto, ON (Hybrid)</h4>
              <ul className="list-disc list-inside space-y-2 text-amber-100">
                <li>Utilized Python libraries for data analysis and visualization across 5 projects</li>
                <li>Designed and implemented a data processing pipeline using MongoDB to streamline data storage and retrieval.</li>
                <li>Developed an ETL process to aggregate music streaming data using SQL and Python, optimizing data organization and analysis..</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20" style={{ backgroundColor: '#6a3329' }}>
        <div className={`max-w-6xl mx-auto px-4 ${isVisible.projects ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="flex justify-center mb-12">
            <h2 className="text-3xl font-serif text-center section-title text-white">
              Technical Projects
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                <Heart size={20} className="text-amber-500 fill-amber-500" />
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className={`project-card bg-[#451e1a] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-amber-900/30 
                  ${isVisible.projects ? 'animate-scale' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => project.title === "Web Development Portfolio" && handleWebProjectClick()}
              >
                <div className="relative group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif mb-2 text-amber-100">{project.title}</h3>
                  <p className="text-amber-200 mb-4">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-1 bg-amber-900/50 text-sm rounded-full text-amber-300 transition-colors hover:bg-amber-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.title !== "Web Development Portfolio" && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-amber-400 hover:text-amber-300 transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-[#451e1a] to-[#5a2922]">
        <div className={`max-w-4xl mx-auto px-4 ${isVisible.contact ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="flex justify-center mb-12">
            <h2 className="text-3xl font-serif text-center section-title group text-white">
              Get In Touch
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 group-hover:scale-125 transition-transform">
                <Heart size={20} className="text-amber-500 fill-amber-500 group-hover:text-red-500 group-hover:fill-red-500 transition-colors" />
              </span>
            </h2>
          </div>
          <div className="bg-[#451e1a]/80 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-amber-900/30">
            <form className="space-y-6">
              <div className="transform transition-transform hover:scale-[1.02]">
                <label htmlFor="name" className="block text-sm font-medium text-amber-100">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-amber-900/50 bg-[#5a2922]/50 text-amber-100 shadow-sm focus:border-amber-400 focus:ring-amber-400"
                />
              </div>
              <div className="transform transition-transform hover:scale-[1.02]">
                <label htmlFor="email" className="block text-sm font-medium text-amber-100">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-amber-900/50 bg-[#5a2922]/50 text-amber-100 shadow-sm focus:border-amber-400 focus:ring-amber-400"
                />
              </div>
              <div className="transform transition-transform hover:scale-[1.02]">
                <label htmlFor="message" className="block text-sm font-medium text-amber-100">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-amber-900/50 bg-[#5a2922]/50 text-amber-100 shadow-sm focus:border-amber-400 focus:ring-amber-400"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-700 text-white py-2 px-4 rounded-md transition-all duration-300 hover:bg-amber-600 hover:transform hover:scale-[1.02] active:scale-95"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#3a1915] via-[#451e1a] to-[#5a2922] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-light text-amber-200">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const webProjects = [
  {
    title: "Kalog Drywall",
    description: "Professional website for a drywall company featuring modern design and responsive layout",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    link: "http://www.kalogadrywall.com"
  },
  {
    title: "Tech Blog Platform",
    description: "Dynamic blog platform for sharing technical content and tutorials",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    link: "#"
  },
  {
    title: "E-commerce Store",
    description: "Full-featured online store with product catalog and secure checkout",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80",
    technologies: ["Next.js", "Stripe", "Tailwind CSS", "PostgreSQL"],
    link: "#"
  }
];

const projects = [
  {
    title: "Smart Farming AI Initiative",
    description: "Developing AI solutions for sustainable agriculture in Kano State, Nigeria.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80",
    technologies: ["Python", "AI", "Data Analytics", "Machine Learning"],
    link: "https://www.omdena.com/chapter-challenges/smart-farming-using-ai-for-sustainable-agriculture-in-kano-state-nigeria"
  },
  {
    title: "Enhancing Public Transport Accessibility",
    description: "Analysis of transport data to improve accessibility for people with disabilities in Nairobi.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80",
    technologies: ["Python", "Git", "Data Analytics"],
    link: "https://www.omdena.com/chapter-challenges/enhancing-public-transport-accessibility-for-insivible-disabilities-in-nairobi"
  },
  {
    title: "Customer Analysis and Product Insights",
    description: "Advanced EDA project analyzing customer behavior and sales trends.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    technologies: ["Python", "Jupyter", "Data Visualization"],
    link: "https://github.com/EGichuhi/Customer_data_analysis"
  },
  {
    title: "Web Development Portfolio",
    description: "Collection of professional websites and web applications showcasing diverse development skills.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80",
    technologies: ["React", "Next.js", "HTML/CSS", "JavaScript"],
    link: "#"
  }
];

export default App;