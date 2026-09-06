import { getAuth } from 'firebase/auth';

export const submitAmc = async (formData) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('You must be logged in to submit an AMC contract.');
  }

  const token = await currentUser.getIdToken();

  const response = await fetch('https://fixitnowbackend-production.up.railway.app/api/amc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(formData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to submit AMC contract.');
  }

  return data;
};
export const getAMCs = async () => {

  const auth = getAuth();
  const currentUser = auth.currentUser;


  if (!currentUser) {
    throw new Error("User not logged in");
  }


  const token = await currentUser.getIdToken();


  const response = await fetch(
    "https://fixitnowbackend-production.up.railway.app/api/amc",
    {
      method:"GET",
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );


  const data = await response.json();


  if(!response.ok){
    throw new Error(
      data.message || "Failed to fetch AMC"
    );
  }


  return data;

};
export const submitAMC = async (formData) => {

  const auth = getAuth();
  const currentUser = auth.currentUser;


  if (!currentUser) {
    throw new Error("User not logged in");
  }


  const token = await currentUser.getIdToken();


  const response = await fetch(
    "https://fixitnowbackend-production.up.railway.app/api/amc",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },

      body: JSON.stringify(formData)
    }
  );


  const data = await response.json();


  if (!response.ok) {
    throw new Error(data.message || "AMC submission failed");
  }


  return data;

};
export const getAllAMCContracts = async () => {

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
        throw new Error("User not logged in");
    }

    const token = await currentUser.getIdToken();

    const response = await fetch(
        "https://fixitnowbackend-production.up.railway.app/api/amc/admin",
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
            data.message || "Failed to fetch AMC requests"
        );
    }

    return data;
};

export const updateAMCStatus = async (id, status) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("User not logged in");
    const token = await currentUser.getIdToken();

    const response = await fetch(`https://fixitnowbackend-production.up.railway.app/api/amc/admin/${id}/status`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to update AMC status");
    return data;
};