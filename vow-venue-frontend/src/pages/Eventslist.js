import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Row,
  Col,
  Spinner,
  Button,
  Form,
  Pagination,
  Modal
} from 'react-bootstrap';
import EventCard from '../components/EventCard'; // Corrected import path

// IMPORTANT: Bootstrap CSS and Font Awesome icons are expected to be loaded via CDN in your public/index.html
// If styling or icons are missing, add these lines to the <head> section of public/index.html:
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" xintegrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" xintegrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0V4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

const EventList = () => {
  const [events, setEvents] = useState([]); // State for fetched events
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(6);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // Changed to selectedEvent
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [eventToDeleteId, setEventToDeleteId] = useState(null);

  // Get the API base URL from the environment variable
  // This will be set by your GitHub Actions workflow during build
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Simulate fetching data from a Django backend
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // --- CORRECTED: Use the environment variable for the backend API endpoint ---
      const response = await fetch(`${API_BASE_URL}/api/venues/`);

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      // Django REST Framework pagination returns data in a 'results' key
      setEvents(data.results); // Set the fetched data to state
      setLoading(false);
    } catch (err) {
      setError(
        'Failed to fetch events. Please check your backend connection and ensure data matches expected format.'
      );
      setLoading(false);
      console.error('Fetch error:', err);
    }
  }, [API_BASE_URL]); // Add API_BASE_URL to dependency array

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Filter events based on search term
  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const results = events.filter(
      (event) =>
        event.title.toLowerCase().includes(lowercasedSearchTerm) ||
        event.location.toLowerCase().includes(lowercasedSearchTerm) ||
        event.description.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredEvents(results);
    setCurrentPage(1); // Reset to first page on new search
  }, [searchTerm, events]);

  // Get current events for pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle card click to show details modal
  const handleViewDetails = (event) => {
    // Now accepts an event object
    setSelectedEvent(event);
    setShowDetailsModal(true);
  };

  // Handle edit action (placeholder)
  const handleEdit = (id) => {
    console.log('Edit event with ID:', id);
    // You would typically navigate to an edit page or open an edit form here
  };

  // Handle delete action (opens confirmation modal)
  const handleDelete = (id) => {
    setEventToDeleteId(id);
    setShowDeleteConfirmModal(true);
  };

  // Confirm delete action
  const confirmDelete = () => {
    // In a real app, you would send a DELETE request to your Django API here
    console.log('Confirmed delete for event with ID:', eventToDeleteId);
    setEvents(events.filter((event) => event.id !== eventToDeleteId));
    setFilteredEvents(
      filteredEvents.filter((event) => event.id !== eventToDeleteId)
    ); // Also update filtered list
    setShowDeleteConfirmModal(false);
    setEventToDeleteId(null);
  };

  // Handle add event (placeholder)
  const handleAddEvent = () => {
    console.log('Add new event');
    // You would typically navigate to an add event page or open a form here
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // Pagination items
  let paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => paginate(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  // Loading state
  if (loading) {
    return (
      <Container className="text-center my-5 py-5">
        <Spinner
          animation="border"
          role="status"
          variant="success"
          style={{ width: '3rem', height: '3rem' }}
        >
          <span className="visually-hidden">Loading events...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading events...</p>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container className="text-center my-5 py-5 text-danger">
        <i className="fas fa-exclamation-circle me-2"></i>
        {error}
      </Container>
    );
  }

  return (
    <Container className="my-5">
      {/* Search Bar */}
      <Row className="mb-5 justify-content-center">
        <Col md={8} lg={6}>
          <Form.Control
            type="text"
            placeholder="Search  "
            className="p-3 border rounded-pill shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              borderColor: '#ced4da',
              boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
              transition:
                'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
              outline: 'none', // Remove default focus outline
              '--bs-focus-ring-color': 'rgba(40, 167, 69, 0.25)' // Custom focus ring color
            }}
          />
        </Col>
      </Row>

      {/* Event Cards Grid */}
      {filteredEvents.length > 0 ? (
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {currentEvents.map((event) => (
            <Col key={event.id}>
              <EventCard
                event={event} // Pass the entire event object
                onEdit={() => handleEdit(event.id)}
                onDelete={() => handleDelete(event.id)}
                onViewDetails={() => handleViewDetails(event)} // Pass event object for details
              />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5">
          <h4>No events found</h4>
          <Button variant="primary" onClick={handleAddEvent} className="mt-3">
            Add Your First Event
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Row className="mt-5 justify-content-center">
          <Col xs="auto">
            <Pagination>
              <Pagination.Prev
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {paginationItems}
              <Pagination.Next
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </Col>
        </Row>
      )}

      {/* Event Details Modal */}
      <Modal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="h3 text-dark">
            {selectedEvent?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {selectedEvent && (
            <>
              <p className="text-muted mb-3">
                <i className="fas fa-map-marker-alt me-2 text-success"></i>
                {selectedEvent.location}
              </p>
              {/* Image is handled manually, so we'll use a placeholder or your heroimage.jpg */}
              <img
                src="/heroimage.jpg" // Use your default image or a specific image for events
                alt={selectedEvent.title}
                className="img-fluid rounded mb-4"
                style={{
                  maxHeight: '300px',
                  width: '100%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://placehold.co/600x400/CCCCCC/000000?text=Event+Image';
                }}
              />
              <p
                className="text-secondary lead mb-4"
                style={{ fontSize: '1.05rem', lineHeight: '1.6' }}
              >
                {selectedEvent.description}
              </p>
              <Row className="g-3">
                <Col md={6}>
                  <p className="mb-0">
                    <strong className="text-dark">Date:</strong>{' '}
                    {selectedEvent.date}
                  </p>
                </Col>
                <Col md={6}>
                  <p className="mb-0">
                    <strong className="text-dark">Availability:</strong>{' '}
                    {selectedEvent.is_available ? 'Available' : 'Booked'}
                  </p>
                </Col>
              </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDetailsModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteConfirmModal}
        onHide={() => setShowDeleteConfirmModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this event? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EventList;
