import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import EventCard from '../components/EventCard'; // Import EventCard component

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch events from your Django API
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/events/available/`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data); // Set the fetched data to state
        setLoading(false);
      } catch (err) {
        setError('Failed to load events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Event handlers
  const handleEdit = (id) => {
    console.log('Edit event with ID:', id);
    // Add your edit logic here
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  const handleViewDetails = (id) => {
    console.log('View details for event with ID:', id);
    // Add your view details logic here
  };

  const handleAddEvent = () => {
    console.log('Add new event');
    // Add your add event logic here
  };

  // Loading state
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container className="text-center mt-5 text-danger">{error}</Container>
    );
  }

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Venue Events</h1>
      </div>

      {events.length > 0 ? (
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {events.map((event) => (
            <Col key={event.id}>
              <EventCard
                title={event.title}
                author={event.author}
                genre={event.genre}
                rating={event.rating}
                image={event.image}
                onEdit={() => handleEdit(event.id)}
                onDelete={() => handleDelete(event.id)}
                onViewDetails={() => handleViewDetails(event.id)}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5">
          <h4>No events found</h4>
          <Button variant="primary" onClick={handleAddEvent} className="mt-3">
            Create Your First Event
          </Button>
        </div>
      )}
    </Container>
  );
};

export default EventList;
