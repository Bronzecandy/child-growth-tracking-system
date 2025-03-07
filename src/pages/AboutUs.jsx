import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-16 px-4 font-inter rounded-lg">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
        <p className="text-lg text-gray-600 mt-4">
          Helping parents and healthcare professionals monitor children's growth with accuracy and care.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src="https://media.istockphoto.com/id/1369620254/photo/shot-of-a-doctor-using-a-cotton-ball-on-a-little-girls-arm-while-administering-an-injection.jpg?s=612x612&w=0&k=20&c=1k44-DJxeSdtKIltzVk2tSPs19dW1EO_oeDjvlDsI3g="
            alt="Child Growth Tracking"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Section */}
        <div>
        <p className="text-gray-600 text-lg leading-relaxed">
          Our platform provides parents and healthcare professionals with a seamless way to monitor children's growth. 
          Using scientifically-backed growth charts and AI-powered analytics, we ensure every child is growing healthily.
        </p>

        <p className="text-gray-600 text-lg leading-relaxed mt-4">
          Early detection of growth concerns is key. Our system integrates medical data and parental inputs to offer 
          personalized insights, helping caregivers track developmental milestones effectively.
        </p>

        <p className="text-gray-600 text-lg leading-relaxed mt-4">
          With a user-friendly dashboard, parents can log key health parameters and visualize growth trends, 
          making informed decisions about nutrition and well-being.
        </p>

        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto text-center mt-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">2M+ Children</h3>
            <p className="text-gray-600 mt-1">Tracked for growth and development</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">98% Accuracy</h3>
            <p className="text-gray-600 mt-1">Using AI-powered growth predictions</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">500+ Clinics</h3>
            <p className="text-gray-600 mt-1">Partnered to provide expert consultations</p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-6xl mx-auto mt-16">
        <div className="grid md:grid-cols-3 gap-12 mt-6">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900">Accuracy & Science</h3>
            <p className="text-gray-600 mt-1">We rely on medical research and data-driven insights.</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900">Parental Empowerment</h3>
            <p className="text-gray-600 mt-1">Giving parents the tools to track and understand their child's growth.</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900">Early Intervention</h3>
            <p className="text-gray-600 mt-1">Helping detect growth concerns before they become problems.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;