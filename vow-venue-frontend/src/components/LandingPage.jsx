import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FaHeart, FaCalendarAlt, FaSearch, FaUsers } from 'react-icons/fa';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section
        className="hero-section d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `
          linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
           url(${process.env.PUBLIC_URL}/heroimage.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          position: 'relative'
        }}
      >
        <Container
          className="text-center text-white position-relative"
          style={{ zIndex: 2 }}
        >
          <h1 className="display-2 fw-bold mb-4 animate__animated animate__fadeInDown">
            KnotNest
          </h1>
          <p className="lead mb-5 fs-3 animate__animated animate__fadeIn animate__delay-1s">
            Plan your dream wedding effortlessly with KnotNest — your all-in-one
            platform for organizing, discovering, and booking everything you
            need for your big day.
          </p>
          <Button
            variant="light"
            size="lg"
            onClick={() => navigate('/eventlist')}
            className="px-5 py-3 rounded-pill fw-bold shadow-lg animate__animated animate__fadeInUp animate__delay-2s"
          >
            Explore Events
          </Button>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5 display-4 fw-bold text-dark">
            Why Choose KnotNest?
          </h2>
          <Row className="g-4">
            <Col md={3} className="text-center">
              <div className="p-4 rounded-3 shadow-sm bg-white h-100">
                <FaHeart className="text-danger mb-3" size={48} />
                <h3>Personalized</h3>
                <p className="text-muted">
                  Tailored recommendations based on your preferences
                </p>
              </div>
            </Col>
            <Col md={3} className="text-center">
              <div className="p-4 rounded-3 shadow-sm bg-white h-100">
                <FaCalendarAlt className="text-primary mb-3" size={48} />
                <h3>Easy Planning</h3>
                <p className="text-muted">
                  Manage all wedding events in one place
                </p>
              </div>
            </Col>
            <Col md={3} className="text-center">
              <div className="p-4 rounded-3 shadow-sm bg-white h-100">
                <FaSearch className="text-success mb-3" size={48} />
                <h3>Vendor Network</h3>
                <p className="text-muted">
                  Discover trusted wedding professionals
                </p>
              </div>
            </Col>
            <Col md={3} className="text-center">
              <div className="p-4 rounded-3 shadow-sm bg-white h-100">
                <FaUsers className="text-warning mb-3" size={48} />
                <h3>Guest Management</h3>
                <p className="text-muted">
                  Track RSVPs and seating arrangements
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-dark text-white">
        <Container className="text-center">
          <h2 className="display-5 fw-bold mb-4">Ready to start planning?</h2>
          <p className="lead mb-5">
            Join thousands of couples who found their perfect wedding with
            KnotNest
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button
              variant="light"
              size="lg"
              className="rounded-pill px-4 shadow"
              onClick={() => navigate('/signup')}
            >
              Sign Up Free
            </Button>
            <Button
              variant="outline-light"
              size="lg"
              className="rounded-pill px-4"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5 display-4 fw-bold">
            What Couples Say
          </h2>
          <Row className="g-4">
            <Col md={4}>
              <div className="p-4 rounded-3 shadow-sm h-100">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/heroimage.jpg"
                    alt="Sarah & John"
                    className="rounded-circle me-3"
                    width="60"
                    height="60"
                  />
                  <div>
                    <h5 className="mb-0">Sarah &amp; John</h5>
                    <small className="text-muted">Married June 2023</small>
                  </div>
                </div>
                <p className="mb-0">
                  &quot;KnotNest made wedding planning actually enjoyable! We
                  found our perfect venue and photographer through the
                  platform.&quot;
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 rounded-3 shadow-sm h-100">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/heroimage.jpg"
                    alt="Priya & Raj"
                    className="rounded-circle me-3"
                    width="60"
                    height="60"
                  />
                  <div>
                    <h5 className="mb-0">Priya &amp; Raj</h5>
                    <small className="text-muted">Married September 2023</small>
                  </div>
                </div>
                <p className="mb-0">
                  &quot;The guest management tools saved us so much time. We
                  could track RSVPs and meal preferences effortlessly.&quot;
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 rounded-3 shadow-sm h-100">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/heroimage.jpg"
                    alt="Emma & Michael"
                    className="rounded-circle me-3"
                    width="60"
                    height="60"
                  />
                  <div>
                    <h5 className="mb-0">Emma &amp; Michael</h5>
                    <small className="text-muted">Married December 2023</small>
                  </div>
                </div>
                <p className="mb-0">
                  &quot;We planned our entire wedding in 3 months thanks to
                  KnotNest&apos;s vendor recommendations and checklist
                  tools.&quot;
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default LandingPage;
