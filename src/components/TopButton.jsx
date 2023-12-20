import React from 'react'

const TopButton = () => {

    const cities =[
        {
            id: 1,
            title: 'London'
        },
        {
            id: 2,
            title: 'Vancouver'
        },
        {
            id: 3,
            title: 'Tokyo'
        },
        {
            id: 4,
            title: 'New York'
        },
        {
            id: 5, 
            title: 'Toronto'
        }
    ]

  return (
    <>
    <div className="flex items-center justify-around my-6">
        {cities.map((city) => (
            <button key={city.id} className='text-white text-lg font-medium'>
                {city.title}
                </button>
        ))}
    </div>
    </>
  )
}

export default TopButton