import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, MessageSquare, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

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
      <motion.section 
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='relative py-20 md:py-28 overflow-hidden'
      >
        {/* Animated Background */}
        <div className='absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
        <div className='absolute bottom-0 left-0 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse' style={{animationDelay: '2s'}}></div>
        
        <div className='relative max-w-4xl mx-auto text-center px-6'>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className='inline-block mb-4 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider'
          >
            Location
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='gradient-text text-5xl md:text-7xl font-black mb-6 leading-tight'
          >
            Visit Our Stores
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light'
          >
            Step into the world of Dukan and experience our premium collection in person. We'd love to meet you at any of our locations across Pakistan.
          </motion.p>
        </div>
      </motion.section>

      {/* Gradient Separator */}
      <div className='h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent'></div>

      {/* Quick Contact Info */}
      <motion.section 
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='py-16 md:py-20'
      >
        <div className='max-w-6xl mx-auto px-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {contactInfo.map((info, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className='bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl border-2 border-indigo-100 hover:border-indigo-300 transition-all text-center group'
              >
                <div className='flex justify-center mb-4'>
                  <div className='p-4 bg-white rounded-2xl text-indigo-600 group-hover:shadow-lg transition-shadow'>
                    {info.icon}
                  </div>
                </div>
                <h3 className='text-2xl font-bold mb-2 text-gray-900'>{info.title}</h3>
                <p className='text-indigo-600 font-bold text-lg mb-1'>{info.value}</p>
                <p className='text-gray-600 text-sm'>{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Gradient Separator */}
      <div className='h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent'></div>

      {/* Store Locations Section */}
      <motion.section 
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='py-20 md:py-28'
      >
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center mb-16'>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className='inline-block mb-4 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider'
            >
              Our Stores
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className='gradient-text text-5xl md:text-6xl font-black'
            >
              Store Locations
            </motion.h2>
          </div>

          <div className='grid lg:grid-cols-3 gap-8'>
            {/* Store Cards */}
            <div className='lg:col-span-1 space-y-4'>
              {stores.map((store, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setselectedStore(index)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all transform ${
                    selectedStore === index
                      ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-2xl scale-105'
                      : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 hover:shadow-lg'
                  }`}
                  whileHover={{ scale: selectedStore === index ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
                </motion.div>
              ))}
            </div>

            {/* Map and Details */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className='lg:col-span-2'
            >
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
            </motion.div>
          </div>

          {/* Detailed Store Info Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='mt-12'
          >
            <div className='bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 border-2 border-indigo-100'>
              <div className='grid md:grid-cols-3 gap-8'>
                {[
                  { icon: <MapPin className='w-6 h-6 text-indigo-600' />, title: 'Address', content: stores[selectedStore].address },
                  { icon: <Clock className='w-6 h-6 text-indigo-600' />, title: 'Store Hours', content: (
                    <>
                      <span className='block'>Weekdays: {stores[selectedStore].hours.weekdays}</span>
                      <span className='block'>Weekend: {stores[selectedStore].hours.weekend}</span>
                    </>
                  )},
                  { icon: <Mail className='w-6 h-6 text-indigo-600' />, title: 'Contact', content: (
                    <>
                      <a href={`tel:${stores[selectedStore].phone}`} className='hover:text-indigo-600 transition-colors block'>{stores[selectedStore].phone}</a>
                      <a href={`mailto:${stores[selectedStore].email}`} className='hover:text-indigo-600 transition-colors'>{stores[selectedStore].email}</a>
                    </>
                  )}
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                    className='flex gap-4'
                  >
                    <div className='p-4 bg-white rounded-2xl h-fit'>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className='font-black text-gray-900 mb-2'>{item.title}</h4>
                      <p className='text-gray-600 text-sm'>{item.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Gradient Separator */}
      <div className='h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent'></div>

      {/* Contact Form Section */}
      <motion.section 
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='py-20 md:py-28 relative overflow-hidden'
      >
        {/* Animated Background */}
        <div className='absolute top-0 right-0 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
        
        <div className='relative max-w-2xl mx-auto px-6'>
          <div className='text-center mb-12'>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className='inline-block mb-4 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider'
            >
              Get In Touch
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className='gradient-text text-5xl md:text-6xl font-black mb-4'
            >
              Send Us a Message
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='text-gray-600 text-lg'
            >
              Have a question? We'd love to hear from you.
            </motion.p>
          </div>

          <motion.form 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='space-y-6 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 md:p-12 rounded-3xl border-2 border-indigo-100'
          >
            <div className='grid md:grid-cols-2 gap-6'>
              <motion.input 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                type="text" 
                placeholder="Your Name" 
                className='px-6 py-4 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 outline-none font-medium transition-colors'
                required
              />
              <motion.input 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                type="email" 
                placeholder="Your Email" 
                className='px-6 py-4 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 outline-none font-medium transition-colors'
                required
              />
            </div>
            <motion.input 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
              type="text" 
              placeholder="Subject" 
              className='w-full px-6 py-4 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 outline-none font-medium transition-colors'
              required
            />
            <motion.textarea 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.7 }}
              placeholder="Your Message" 
              rows="5"
              className='w-full px-6 py-4 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 outline-none font-medium transition-colors resize-none'
              required
            ></motion.textarea>
            <motion.button 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className='w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all uppercase tracking-widest group flex items-center justify-center gap-2'
            >
              <MessageSquare className='w-5 h-5' />
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='py-20 md:py-28 relative overflow-hidden'
      >
        {/* Animated Background */}
        <div className='absolute top-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
        
        <div className='relative max-w-4xl mx-auto text-center px-6'>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='text-4xl md:text-6xl font-black mb-6 text-gray-900'
          >
            We're Excited to See You
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='text-gray-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-light'
          >
            Visit any of our stores to experience the Dukan difference. Our team is ready to help you find your perfect style.
          </motion.p>
          <motion.a 
            href='/'
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='inline-block text-base md:text-lg py-4 px-10 font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-2xl cursor-pointer group relative uppercase tracking-widest transition-all'
          >
            Back to Home
            <span className='ml-2 group-hover:translate-x-1 transition-transform inline-block'>→</span>
          </motion.a>
        </div>
      </motion.section>

    </div>
  )
}

export default Visit_Us