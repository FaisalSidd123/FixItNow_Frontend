import { getAuth } from 'firebase/auth';

export const submitRepair = async (formData) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('You must be logged in to submit a repair request.');
  }

  const token = await currentUser.getIdToken();

  const response = await fetch('http://localhost:5000/api/repairs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(formData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to submit repair request.');
  }

  return data;
};
