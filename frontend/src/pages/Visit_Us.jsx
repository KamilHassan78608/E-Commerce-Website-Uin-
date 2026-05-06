import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, MessageSquare, Heart } from 'lucide-react'

const Visit_Us = () => {
  const [selectedStore, setselectedStore] = useState(0);

  const stores = [
    {
      name: "Dukan Peshawar",
      address: "Street No 5, Peshawar, Pakistan",
      phone: "+92 300 1234567",
      email: "peshawar@dukan.com",
      hours: {
        weekdays: "10:00 AM - 8:00 PM",
        weekend: "10:00 AM - 10:00 PM"
      },
      coordinates: "34.8152° N, 71.5589° E",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.0988865903946!2d71.55773!3d34.81523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d8f6b8a8b8a8b9%3A0x8b8a8b8a8b8a8b8a!2sPeshawar%2C%20Pakistan!5e0!3m2!1sen!2spk!4v1234567890",
      image: "🏢"
    },
    {
      name: "Dukan Islamabad",
      address: "Main Boulevard, Islamabad, Pakistan",
      phone: "+92 300 2345678",
      email: "islamabad@dukan.com",
      hours: {
        weekdays: "10:00 AM - 8:00 PM",
        weekend: "10:00 AM - 10:00 PM"
      },
      coordinates: "33.7294° N, 73.1786° E",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.0988865903946!2d73.17864!3d33.72942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df94d8a8b8a8b9%3A0x8b8a8b8a8b8a8b8a!2sIslamabad%2C%20Pakistan!5e0!3m2!1sen!2spk!4v1234567890",
      image: "🏬"
    },
    {
      name: "Dukan Lahore",
      address: "Mall Road, Lahore, Pakistan",
      phone: "+92 300 3456789",
      email: "lahore@dukan.com",
      hours: {
        weekdays: "10:00 AM - 9:00 PM",
        weekend: "10:00 AM - 10:00 PM"
      },
      coordinates: "31.5204° N, 74.3587° E",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.0988865903946!2d74.35874!3d31.52042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39189c1c1c1c1c1d%3A0x1c1c1c1c1c1c1c1c!2sLahore%2C%20Pakistan!5e0!3m2!1sen!2spk!4v1234567890",
      image: "🛍️"
    }
  ];

  const contactInfo = [
    {
      icon: <Phone className='w-8 h-8' />,
      title: "Call Us",
      value: "+92 300 1234567",
      description: "Available 24/7 for support"
    },
    {
      icon: <Mail className='w-8 h-8' />,
      title: "Email Us",
      value: "support@dukan.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: <MapPin className='w-8 h-8' />,
      title: "Visit Us",
      value: "3 Locations",
      description: "Across Pakistan"
    }
  ];

  return (
    <div className='min-h-screen bg-white'>
      
      {/* Hero Section */}
      <section className='relative py-20 md:py-28 overflow-hidden'>
        {/* Animated Background */}
        <div className='absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
        <div className='absolute bottom-0 left-0 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse' style={{animationDelay: '2s'}}></div>
        
        <div className='relative max-w-4xl mx-auto text-center px-6'>
          <span className='inline-block mb-4 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider'>Location</span>
          <h1 className='gradient-text text-5xl md:text-7xl font-black mb-6 leading-tight'>Visit Our Stores</h1>
          <p className='text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light'>
            Step into the world of Dukan and experience our premium collection in person. We'd love to meet you at any of our locations across Pakistan.
          </p>
        </div>
      </section>

      {/* Gradient Separator */}
      <div className='h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent'></div>

      {/* Quick Contact Info */}
      <section className='py-16 md:py-20'>
        <div className='max-w-6xl mx-auto px-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {contactInfo.map((info, index) => (
              <div key={index} className='bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl border-2 border-indigo-100 hover:border-indigo-300 transition-all text-center group'>
                <div className='flex justify-center mb-4'>
                  <div className='p-4 bg-white rounded-2xl text-indigo-600 group-hover:shadow-lg transition-shadow'>
                    {info.icon}
                  </div>
                </div>
                <h3 className='text-2xl font-bold mb-2 text-gray-900'>{info.title}</h3>
                <p className='text-indigo-600 font-bold text-lg mb-1'>{info.value}</p>
                <p className='text-gray-600 text-sm'>{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient Separator */}
      <div className='h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent'></div>

      {/* Store Locations Section */}
      <section className='py-20 md:py-28'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center mb-16'>
            <span className='inline-block mb-4 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider'>Our Stores</span>
            <h2 className='gradient-text text-5xl md:text-6xl font-black'>Store Locations</h2>
          </div>

          <div className='grid lg:grid-cols-3 gap-8'>
            {/* Store Cards */}
            <div className='lg:col-span-1 space-y-4'>
              {stores.map((store, index) => (
                <div
                  key={index}
                  onClick={() => setselectedStore(index)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all transform ${
                    selectedStore === index
                      ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-2xl scale-105'
                      : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 hover:shadow-lg'
                  }`}
                >
                  <div className='flex items-start gap-4'>
                    <div className='text-4xl'>{store.image}</div>
                    <div className='flex-1'>
                      <h3 className='text-xl font-black mb-1'>{store.name}</h3>
                      <p className={`text-sm mb-3 leading-relaxed ${selectedStore === index ? 'text-indigo-100' : 'text-gray-600'}`}>
                        {store.address}
                      </p>
                      <div className={`flex items-center gap-2 text-sm font-semibold mb-2 ${selectedStore === index ? 'text-indigo-100' : 'text-indigo-600'}`}>
                        <Phone className='w-4 h-4' />
                        {store.phone}
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${selectedStore === index ? 'text-indigo-100' : 'text-gray-600'}`}>
                        <Clock className='w-4 h-4' />
                        {store.hours.weekdays}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map and Details */}
            <div className='lg:col-span-2'>
              {/* Map */}
              <div className='rounded-3xl overflow-hidden shadow-2xl mb-8 h-96 lg:h-full'>
                <iframe
                  src={stores[selectedStore].mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${stores[selectedStore].name} Location`}
                ></iframe>
              </div>
            </div>
          </div>

          {/* Detailed Store Info Cards */}
          <div className='mt-12'>
            <div className='bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 border-2 border-indigo-100'>
              <div className='grid md:grid-cols-3 gap-8'>
                <div className='flex gap-4'>
                  <div className='p-4 bg-white rounded-2xl h-fit'>
                    <MapPin className='w-6 h-6 text-indigo-600' />
                  </div>
                  <div>
                    <h4 className='font-black text-gray-900 mb-2'>Address</h4>
                    <p className='text-gray-600'>{stores[selectedStore].address}</p>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <div className='p-4 bg-white rounded-2xl h-fit'>
                    <Clock className='w-6 h-6 text-indigo-600' />
                  </div>
                  <div>
                    <h4 className='font-black text-gray-900 mb-2'>Store Hours</h4>
                    <p className='text-gray-600 text-sm'>
                      <span className='block'>Weekdays: {stores[selectedStore].hours.weekdays}</span>
                      <span className='block'>Weekend: {stores[selectedStore].hours.weekend}</span>
                    </p>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <div className='p-4 bg-white rounded-2xl h-fit'>
                    <Mail className='w-6 h-6 text-indigo-600' />
                  </div>
                  <div>
                    <h4 className='font-black text-gray-900 mb-2'>Contact</h4>
                    <p className='text-gray-600 text-sm'>
                      <a href={`tel:${stores[selectedStore].phone}`} className='hover:text-indigo-600 transition-colors block'>{stores[selectedStore].phone}</a>
                      <a href={`mailto:${stores[selectedStore].email}`} className='hover:text-indigo-600 transition-colors'>{stores[selectedStore].email}</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Separator */}
      <div className='h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent'></div>

      {/* Contact Form Section */}
      <section className='py-20 md:py-28 relative overflow-hidden'>
        {/* Animated Background */}
        <div className='absolute top-0 right-0 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
        
        <div className='relative max-w-2xl mx-auto px-6'>
          <div className='text-center mb-12'>
            <span className='inline-block mb-4 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider'>Get In Touch</span>
            <h2 className='gradient-text text-5xl md:text-6xl font-black mb-4'>Send Us a Message</h2>
            <p className='text-gray-600 text-lg'>Have a question? We'd love to hear from you.</p>
          </div>

          <form className='space-y-6 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 md:p-12 rounded-3xl border-2 border-indigo-100'>
            <div className='grid md:grid-cols-2 gap-6'>
              <input 
                type="text" 
                placeholder="Your Name" 
                className='px-6 py-4 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 outline-none font-medium transition-colors'
                required
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className='px-6 py-4 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 outline-none font-medium transition-colors'
                required
              />
            </div>
            <input 
              type="text" 
              placeholder="Subject" 
              className='w-full px-6 py-4 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 outline-none font-medium transition-colors'
              required
            />
            <textarea 
              placeholder="Your Message" 
              rows="5"
              className='w-full px-6 py-4 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 outline-none font-medium transition-colors resize-none'
              required
            ></textarea>
            <button 
              type="submit"
              className='w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all uppercase tracking-widest group flex items-center justify-center gap-2'
            >
              <MessageSquare className='w-5 h-5' />
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 md:py-28 relative overflow-hidden'>
        {/* Animated Background */}
        <div className='absolute top-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
        
        <div className='relative max-w-4xl mx-auto text-center px-6'>
          <h2 className='text-4xl md:text-6xl font-black mb-6 text-gray-900'>
            We're Excited to See You
          </h2>
          <p className='text-gray-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-light'>
            Visit any of our stores to experience the Dukan difference. Our team is ready to help you find your perfect style.
          </p>
          <a 
            href='/'
            className='inline-block text-base md:text-lg py-4 px-10 font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:scale-105 cursor-pointer group relative uppercase tracking-widest transition-all'
          >
            Back to Home
            <span className='ml-2 group-hover:translate-x-1 transition-transform inline-block'>→</span>
          </a>
        </div>
      </section>

    </div>
  )
}

export default Visit_Us
