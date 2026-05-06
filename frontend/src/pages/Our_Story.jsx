import React from 'react'
import { Heart, Target, Users, Zap, Award, TrendingUp, Leaf } from 'lucide-react'

const Our_Story = () => {
  const values = [
    {
      icon: <Heart className='w-16 h-16 text-indigo-500' />,
      title: "Quality First",
      description: "We believe in delivering products that exceed expectations with meticulous attention to detail and craftsmanship.",
      color: "from-indigo-50 to-blue-50"
    },
    {
      icon: <Target className='w-16 h-16 text-purple-500' />,
      title: "Customer Focused",
      description: "Your satisfaction is our mission. We listen, adapt, and continuously improve to serve you better.",
      color: "from-purple-50 to-pink-50"
    },
    {
      icon: <Users className='w-16 h-16 text-pink-500' />,
      title: "Community Driven",
      description: "We're more than a store—we're a community of fashion enthusiasts supporting each other's style journey.",
      color: "from-pink-50 to-rose-50"
    },
    {
      icon: <Leaf className='w-16 h-16 text-green-500' />,
      title: "Sustainability",
      description: "We're committed to eco-friendly practices and sustainable fashion that cares for our planet.",
      color: "from-green-50 to-emerald-50"
    }
  ];

  const timeline = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Dukan was founded with a simple vision: to make quality fashion accessible to everyone.",
      milestone: "Founded"
    },
    {
      year: "2021",
      title: "Growth Phase",
      description: "Expanded our collection and reached 50,000+ satisfied customers across the region.",
      milestone: "50K Customers"
    },
    {
      year: "2022",
      title: "Sustainability Focus",
      description: "Launched our eco-friendly collection and committed to sustainable manufacturing practices.",
      milestone: "Green Initiative"
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Opened our first international warehouse and introduced new fashion lines.",
      milestone: "Going Global"
    },
    {
      year: "2024",
      title: "Community Hub",
      description: "Became more than a store—a lifestyle platform with exclusive events and collaborations.",
      milestone: "Community Leader"
    },
    {
      year: "2025",
      title: "Leading Innovation",
      description: "Today, we continue to innovate and serve millions while staying true to our core values.",
      milestone: "Innovation Leader"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers", icon: <Users className='w-8 h-8' /> },
    { number: "5K+", label: "Products", icon: <Award className='w-8 h-8' /> },
    { number: "6", label: "Years Strong", icon: <TrendingUp className='w-8 h-8' /> },
  ];

  return (
    <div className='min-h-screen bg-white'>
      
      {/* Hero Section - Premium Design */}
      <section className='relative py-24 md:py-32 overflow-hidden'>
        {/* Animated Background Elements */}
        <div className='absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
        <div className='absolute bottom-0 left-0 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse' style={{animationDelay: '2s'}}></div>
        
        <div className='relative flex flex-col items-center text-center max-w-4xl mx-auto px-6'>
          <span className='inline-block mb-4 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider'>Our Heritage</span>
          <h1 className='gradient-text mb-8 text-5xl md:text-7xl font-black leading-tight'>Crafting Stories,<br />One Piece at a Time</h1>
          <p className='text-gray-600 max-w-2xl text-lg md:text-xl leading-relaxed font-light'>
            From a passionate vision to a trusted fashion destination, Dukan has been creating moments of style, confidence, and authentic connection for thousands of customers worldwide.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-12 md:py-16 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6'>
          {stats.map((stat, index) => (
            <div key={index} className='flex flex-col items-center text-center py-8'>
              <div className='mb-4 p-4 bg-white rounded-2xl shadow-lg text-indigo-500'>
                {stat.icon}
              </div>
              <h3 className='text-4xl md:text-5xl font-black text-gray-900 mb-2'>{stat.number}</h3>
              <p className='text-gray-600 font-semibold'>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className='h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-12'></div>

      {/* Mission & Vision Section - Side by Side */}
      <section className='py-20 md:py-28'>
        <div className='max-w-6xl mx-auto px-6'>
          <div className='grid md:grid-cols-2 gap-12 md:gap-16'>
            {/* Mission */}
            <div className='flex flex-col justify-center group'>
              <div className='mb-6 p-4 w-16 h-16 bg-indigo-100 rounded-2xl group-hover:bg-indigo-200 transition-colors flex items-center justify-center'>
                <Target className='w-8 h-8 text-indigo-600' />
              </div>
              <h2 className='text-4xl md:text-5xl font-black mb-6 text-gray-900'>Our Mission</h2>
              <p className='text-gray-600 leading-relaxed mb-6 text-lg font-light'>
                To democratize fashion by providing high-quality, trendy, and sustainable clothing that allows everyone to discover their unique style without compromise. We believe fashion should be accessible, inspiring, and absolutely authentic.
              </p>
              <div className='mt-4 p-6 bg-indigo-50 rounded-2xl border-l-4 border-indigo-500'>
                <p className='text-indigo-700 italic font-semibold text-lg'>
                  "Making style personal, quality uncompromising, and fashion truly inclusive."
                </p>
              </div>
            </div>
            
            {/* Vision */}
            <div className='flex flex-col justify-center group'>
              <div className='mb-6 p-4 w-16 h-16 bg-purple-100 rounded-2xl group-hover:bg-purple-200 transition-colors flex items-center justify-center'>
                <Zap className='w-8 h-8 text-purple-600' />
              </div>
              <h2 className='text-4xl md:text-5xl font-black mb-6 text-gray-900'>Our Vision</h2>
              <p className='text-gray-600 leading-relaxed mb-6 text-lg font-light'>
                To become the world's most trusted fashion brand, recognized for our unwavering commitment to quality, innovation, and sustainability. A brand where every customer feels genuinely seen, deeply valued, and truly inspired.
              </p>
              <div className='mt-4 p-6 bg-purple-50 rounded-2xl border-l-4 border-purple-500'>
                <p className='text-purple-700 italic font-semibold text-lg'>
                  "Where passion meets purpose, style becomes identity, and fashion shapes futures."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-12'></div>

      {/* Core Values Section - Premium Cards */}
      <section className='py-20 md:py-28'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center mb-16'>
            <span className='inline-block mb-4 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider'>What Drives Us</span>
            <h2 className='gradient-text text-5xl md:text-6xl font-black'>Core Values</h2>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {values.map((value, index) => (
              <div key={index} className={`group bg-gradient-to-br ${value.color} p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100`}>
                <div className='mb-6 p-4 bg-white rounded-2xl shadow-md group-hover:shadow-lg transition-shadow w-fit group-hover:scale-110 transition-transform'>
                  {value.icon}
                </div>
                <h3 className='text-2xl font-black mb-4 text-gray-900'>{value.title}</h3>
                <p className='text-gray-700 leading-relaxed font-light text-sm'>{value.description}</p>
                <div className='mt-6 h-1 w-0 group-hover:w-12 bg-indigo-500 transition-all rounded-full'></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className='h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-12'></div>

      {/* Timeline Section - Enhanced */}
      <section className='py-20 md:py-28'>
        <div className='max-w-6xl mx-auto px-6'>
          <div className='text-center mb-16'>
            <span className='inline-block mb-4 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider'>Our Evolution</span>
            <h2 className='gradient-text text-5xl md:text-6xl font-black'>Our Journey</h2>
          </div>

          {/* Timeline */}
          <div className='relative'>
            {/* Timeline Line */}
            <div className='hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500'></div>
            
            <div className='space-y-16'>
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className='bg-white border-2 border-gray-100 p-8 rounded-2xl hover:shadow-2xl hover:border-indigo-300 transition-all duration-300 group'>
                      <div className='inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold mb-3'>
                        {item.milestone}
                      </div>
                      <h3 className='text-3xl font-black text-indigo-600 mb-2'>{item.year}</h3>
                      <h4 className='text-xl font-black text-gray-900 mb-3'>{item.title}</h4>
                      <p className='text-gray-600 leading-relaxed font-light'>{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className='w-full md:w-2/12 flex justify-center relative z-10'>
                    <div className='flex flex-col items-center'>
                      <div className='w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full border-4 border-white shadow-xl'></div>
                    </div>
                  </div>
                  
                  {/* Empty Space */}
                  <div className='w-full md:w-5/12'></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className='h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-12'></div>

      {/* Call to Action Section - Premium */}
      <section className='py-24 md:py-32 relative overflow-hidden'>
        {/* Background Elements */}
        <div className='absolute top-0 left-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
        <div className='absolute bottom-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse' style={{animationDelay: '2s'}}></div>
        
        <div className='relative text-center max-w-3xl mx-auto px-6'>
          <h2 className='text-5xl md:text-6xl font-black mb-6 text-gray-900'>Join Our Community</h2>
          <p className='text-gray-600 mb-10 max-w-2xl mx-auto text-lg leading-relaxed font-light'>
            Every purchase is a step in our shared journey toward a more inclusive, sustainable, and beautiful fashion future. Be part of something greater.
          </p>
          <a 
            href="/collection" 
            className='inline-block text-base md:text-lg py-4 px-10 font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:scale-105 cursor-pointer group relative uppercase tracking-widest transition-all'
          >
            Explore Collection
            <span className='ml-2 group-hover:translate-x-1 transition-transform inline-block'>→</span>
          </a>
        </div>
      </section>

    </div>
  )
}

export default Our_Story
