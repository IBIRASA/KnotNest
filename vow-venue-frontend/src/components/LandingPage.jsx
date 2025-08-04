import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center w-100 min-vh-100 position-relative"
      style={{
        backgroundImage: 'url("/heroimage.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        position: 'relative'
      }}
    >
      {/* Overlay for readability */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}
        aria-hidden="true"
      />
      {/* Content section */}
      <div
        className="position-relative text-white text-center ps-5 ms-5"
        style={{
          zIndex: 2,
          maxWidth: '80%',
          paddingTop: '5rem'
        }}
      >
        <h1
          className="display-3 fw-bold mb-4"
          style={{
            fontSize: 'clamp(3rem, 5vw, 5rem)' // Responsive font size
          }}
        >
          KnotNest
        </h1>
        <p
          className="lead mb-5"
          style={{
            fontSize: 'clamp(1.5rem, 2.5vw, 1.8rem)' // Responsive font size
          }}
        >
          Plan your dream wedding effortlessly with <strong>KnotNest</strong> —
          your all-in-one platform for organizing, discovering, and booking
          everything you need for your big day. From venues and photographers to
          dresses and catering, we've got everything covered to make your
          journey to “I do” smooth and memorable.
        </p>
        <Button
          variant="success"
          size="lg"
          onClick={() => navigate('/eventlist')}
          className="px-5 py-3 rounded"
        >
          Explore Events
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;
