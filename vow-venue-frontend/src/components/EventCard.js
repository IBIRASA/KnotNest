import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const EventCard = ({
  title,
  description,
  onEdit,
  onDelete,
  onViewDetails,
  image
}) => {
  return (
    <Card className="mb-4 shadow-sm h-100">
      <Card.Img
        variant="top"
        src={image || '/heroimage.jpg'} // Default image fallback
        alt={`Cover for ${title}`}
        style={{
          height: '200px',
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
      <Card.Body className="d-flex flex-column">
        <div className="flex-grow-1">
          <Card.Title className="text-truncate">{title}</Card.Title>
          <Card.Text className="text-muted">{description}</Card.Text>
        </div>

        <div className="d-flex justify-content-between mt-auto">
          <button
            type="button"
            onClick={onViewDetails}
            className="btn btn-link p-1"
            aria-label="View details"
          >
            <FontAwesomeIcon
              icon={faEye}
              className="text-primary"
              style={{ fontSize: '1.3rem' }}
            />
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="btn btn-link p-1"
            aria-label="Edit"
          >
            <FontAwesomeIcon
              icon={faEdit}
              className="text-warning"
              style={{ fontSize: '1.3rem' }}
            />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="btn btn-link p-1"
            aria-label="Delete"
          >
            <FontAwesomeIcon
              icon={faTrashAlt}
              className="text-danger"
              style={{ fontSize: '1.3rem' }}
            />
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

// Define PropTypes outside the component
EventCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
  image: PropTypes.string
};

export default EventCard;
