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
      }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}
      />
      <div
        className="position-relative text-white text-center ps-5 ms-5"
        style={{ zIndex: 2, maxWidth: '80%' }}
      >
        <h1 className="display-3 fw-bold mb-4" style={{ fontSize: '5rem' }}>
          KnotNest
        </h1>
        <p className="lead mb-5" style={{ fontSize: '1.8rem' }}>
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
  View Venues
</Button>
      </div>
    </div>
  );
}

export default LandingPage;
