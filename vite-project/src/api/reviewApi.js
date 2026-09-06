import { getAuth } from "firebase/auth";

const BASE_URL = "https://fixitnowbackend-production.up.railway.app/api/reviews";

export const getSiteReviews = async () => {
  const res = await fetch(`${BASE_URL}/site`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch site reviews");
  return data.reviews || [];
};

export const getProductReviews = async (productId) => {
  const res = await fetch(`${BASE_URL}/product/${productId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch product reviews");
  return data.reviews || [];
};

export const submitReview = async (reviewData) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const headers = { "Content-Type": "application/json" };
  if (currentUser) {
    const token = await currentUser.getIdToken();
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(reviewData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to submit review");
  return data.review;
};

export const getAllReviewsAdmin = async () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("User not logged in");
  const token = await currentUser.getIdToken();

  const res = await fetch(`${BASE_URL}/admin`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch admin reviews");
  return data.reviews || [];
};

export const updateReviewAdmin = async (id, updateFields) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("User not logged in");
  const token = await currentUser.getIdToken();

  const res = await fetch(`${BASE_URL}/admin/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updateFields)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update review");
  return data.review;
};

export const deleteReviewAdmin = async (id) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("User not logged in");
  const token = await currentUser.getIdToken();

  const res = await fetch(`${BASE_URL}/admin/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete review");
  return data;
};
