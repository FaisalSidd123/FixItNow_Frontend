import { getAuth } from 'firebase/auth';

export const submitInspection = async (formData) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('You must be logged in to submit an inspection request.');
  }

  const token = await currentUser.getIdToken();

  const response = await fetch(
    'http://localhost:5000/api/inspections',
    {
      method: 'POST',

      headers: {
        'Authorization': `Bearer ${token}`
      },

      body: formData
    }
  );


  const data = await response.json();


  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to submit inspection request.'
    );
  }


  return data;
};
export const getInspections = async () => {

  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("User not logged in");
  }


  const token = await currentUser.getIdToken();


  const response = await fetch(
    "http://localhost:5000/api/inspections",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


  const data = await response.json();


  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch inspections");
  }


  return data;

};
export const getAllInspections = async () => {

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
        throw new Error("User not logged in");
    }

    const token = await currentUser.getIdToken();

    const response = await fetch(
        "http://localhost:5000/api/inspections/admin",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch inspection requests"
        );
    }

    return data;
};