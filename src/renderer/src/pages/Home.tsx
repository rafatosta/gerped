import React from 'react'
import Container from '../components/Container'

const Home: React.FC = () => {
  return (
    <Container>
      <h2 className="text-2xl font-bold">Home Page</h2>
      <p>Welcome to the home page!</p>
      <div className="h-96 bg-gray-200 mt-4">Long content here to demonstrate scrolling...</div>
    </Container>
  )
}

export default Home
