import React from 'react'

function Card({ image, title, description }) {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-green-700">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  )
}

export default Card
