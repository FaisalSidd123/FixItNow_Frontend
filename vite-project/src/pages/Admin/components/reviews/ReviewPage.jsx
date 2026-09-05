import React, { useState, useEffect } from 'react';
import { Star, Trash2, CheckCircle, Edit3, Plus, MessageSquare } from 'lucide-react';
import { getAllReviewsAdmin, updateReviewAdmin, deleteReviewAdmin, submitReview } from '../../../../api/reviewApi';
import './ReviewPage.css';

function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, site, product

  // Create review modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newReview, setNewReview] = useState({
    author_name: '',
    author_email: '',
    rating: 5,
    comment: ''
  });

  const loadReviews = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAllReviewsAdmin();
      setReviews(data);
    } catch (err) {
      setError(err.message || 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleToggleApproval = async (review) => {
    try {
      const updated = await updateReviewAdmin(review.id, { is_approved: !review.is_approved });
      setReviews(reviews.map(r => r.id === review.id ? updated : r));
    } catch (err) {
      alert('Error updating approval status: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await deleteReviewAdmin(id);
      setReviews(reviews.filter(r => r.id !== id));
    } catch (err) {
      alert('Failed to delete review: ' + err.message);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitReview(newReview);
      setShowCreateModal(false);
      setNewReview({ author_name: '', author_email: '', rating: 5, comment: '' });
      loadReviews();
    } catch (err) {
      alert('Failed to create review: ' + err.message);
    }
  };

  const filteredReviews = reviews.filter(r => {
    if (filter === 'site') return !r.product_id;
    if (filter === 'product') return Boolean(r.product_id);
    return true;
  });

  return (
    <div className="review-page">
      <div className="overview-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Reviews Management</h2>
          <p className="content-subtitle">Manage, create, approve, or delete customer reviews for services & solar products.</p>
        </div>
        <button className="admin-btn-primary" onClick={() => setShowCreateModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={16} /> Add New Review
        </button>
      </div>

      {/* Toolbar Filter */}
      <div className="review-toolbar">
        <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
          All Reviews ({reviews.length})
        </button>
        <button className={`filter-tab ${filter === 'site' ? 'active' : ''}`} onClick={() => setFilter('site')}>
          Site / Service Reviews ({reviews.filter(r => !r.product_id).length})
        </button>
        <button className={`filter-tab ${filter === 'product' ? 'active' : ''}`} onClick={() => setFilter('product')}>
          Product Reviews ({reviews.filter(r => Boolean(r.product_id)).length})
        </button>
      </div>

      {loading ? (
        <div className="review-loading">Loading reviews...</div>
      ) : error ? (
        <div className="review-error">{error}</div>
      ) : filteredReviews.length === 0 ? (
        <div className="review-empty">No reviews found for this section.</div>
      ) : (
        <div className="review-grid">
          {filteredReviews.map((r) => (
            <div key={r.id} className="review-admin-card">
              <div className="review-card-header">
                <div>
                  <span className="author-title">{r.author_name}</span>
                  {r.author_email && <small className="author-email"> ({r.author_email})</small>}
                </div>
                <div className="stars-badge">
                  {Array.from({ length: r.rating || 5 }).map((_, i) => (
                    <Star key={i} size={12} fill="#EF9F27" color="#EF9F27" />
                  ))}
                </div>
              </div>

              <div className="type-badge">
                {r.product_id ? 'Product Review' : 'Site / Service Review'}
              </div>

              <p className="review-comment">"{r.comment}"</p>

              <div className="review-card-footer">
                <span className="review-date">{new Date(r.created_at).toLocaleDateString()}</span>
                <div className="review-actions">
                  <button
                    className={`btn-approve ${r.is_approved ? 'approved' : 'pending'}`}
                    onClick={() => handleToggleApproval(r)}
                  >
                    <CheckCircle size={14} /> {r.is_approved ? 'Approved' : 'Approve'}
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(r.id)}>
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for creating a new review */}
      {showCreateModal && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h3>Add New Review</h3>
            <form onSubmit={handleCreateSubmit}>
              <div className="form-group">
                <label>Author Name</label>
                <input
                  type="text"
                  required
                  value={newReview.author_name}
                  onChange={(e) => setNewReview({ ...newReview, author_name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Author Email (Optional)</label>
                <input
                  type="email"
                  value={newReview.author_email}
                  onChange={(e) => setNewReview({ ...newReview, author_email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Rating (1 - 5)</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
              <div className="form-group">
                <label>Comment</label>
                <textarea
                  required
                  rows={3}
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowCreateModal(false)}>Cancel</button>
                <button type="submit" className="btn-submit">Submit Review</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewPage;
