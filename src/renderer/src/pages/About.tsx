import React from 'react';
import Container from '../components/Container';

const About: React.FC = () => {
  return (
    <Container>
      <h2 className="text-2xl font-bold">About Page</h2>
      <p>This is the about page.</p>
      <div className="h-96 bg-gray-200 mt-4">Long content here to demonstrate scrolling...</div>
    </Container>
  );
};

export default About;
