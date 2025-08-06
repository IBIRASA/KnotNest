import React from 'react';
import { Card, Button } from 'react-bootstrap';

// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" xintegrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0V4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

import PropTypes from 'prop-types';

const EventCard = ({
  event, //
  onEdit,
  onDelete,
  onViewDetails
}) => {
  //
  if (!event) {
    return null; //
  }

  return (
    <Card
      className="h-100 shadow-lg border-0 cursor-pointer"
      style={{
        borderRadius: '10px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.03)';
        e.currentTarget.style.boxShadow = '0 0.5rem 1rem rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 0.5rem 1rem rgba(0, 0, 0, 0.075)';
      }}
    >
      <Card.Img
        variant="top"
        src="/heroimage.jpg" //
        alt={`Cover for ${event.title}`}
        style={{
          height: '200px',
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            'https://placehold.co/600x400/CCCCCC/000000?text=Event+Image';
        }}
      />
      <Card.Body className="d-flex flex-column p-4">
        <div className="flex-grow-1">
          <Card.Title className="h5 mb-2 text-dark fw-semibold text-truncate">
            {event.title}
          </Card.Title>
          <Card.Text
            className="text-muted mb-3"
            style={{ fontSize: '0.95rem' }}
          >
            <i className="fas fa-map-marker-alt me-2 text-success"></i>
            {event.location}
          </Card.Text>
          {/* Display only the first sentence or a snippet of the description */}
          <Card.Text
            className="text-secondary mb-3"
            style={{ fontSize: '0.9rem', lineHeight: '1.4' }}
          >
            {event.description.split('.')[0]}.
          </Card.Text>
        </div>

        <div
          className="d-flex justify-content-between align-items-center mt-auto text-muted"
          style={{ fontSize: '0.85rem' }}
        >
          <span>
            <i className="fas fa-calendar-alt me-2 text-info"></i>{' '}
            {/* Changed icon for date */}
            Date: {event.date}
          </span>
          <span>
            <i
              className="fas fa-check-circle me-2"
              style={{ color: event.is_available ? 'green' : 'red' }}
            ></i>
            {event.is_available ? 'Available' : 'Booked'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-between mt-3 pt-3 border-top">
          <Button
            variant="link"
            className="p-1"
            aria-label="View details"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(event);
            }} //
          >
            <i
              className="fas fa-eye text-primary"
              style={{ fontSize: '1.3rem' }}
            ></i>
          </Button>
          <Button
            variant="link"
            className="p-1"
            aria-label="Edit"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(event.id);
            }}
          >
            <i
              className="fas fa-edit text-warning"
              style={{ fontSize: '1.3rem' }}
            ></i>
          </Button>
          <Button
            variant="link"
            className="p-1"
            aria-label="Delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(event.id);
            }}
          >
            <i
              className="fas fa-trash-alt text-danger"
              style={{ fontSize: '1.3rem' }}
            ></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

// Define PropTypes for the updated EventCard
EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired, //
    is_available: PropTypes.bool.isRequired
    //
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired
};

export default EventCard;
