import { getAuth } from 'firebase/auth';
export const submitRepair = async (formData) => {

  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("You must be logged in.");
  }

  const token = await currentUser.getIdToken();

  const response = await fetch(
    "https://fixitnowbackend-production.up.railway.app/api/repairs",
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`
      },

      body: formData
    }
  );


  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed");
  }

  return data;
};
export const getRepairs = async()=>{

const auth = getAuth();

const currentUser = auth.currentUser;


if(!currentUser){
 throw new Error("User not logged in");
}


const token = await currentUser.getIdToken();


const response = await fetch(
"https://fixitnowbackend-production.up.railway.app/api/repairs",
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
 data.message
 );

}


return data;

};
export const getAllRepairs = async () => {

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
        throw new Error("User not logged in");
    }

    const token = await currentUser.getIdToken();

    const response = await fetch(
        "https://fixitnowbackend-production.up.railway.app/api/repairs/admin",
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
            data.message || "Failed to fetch repair requests"
        );
    }

    return data;
};

export const updateRepairStatus = async (id, status) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("User not logged in");
    const token = await currentUser.getIdToken();

    const response = await fetch(`https://fixitnowbackend-production.up.railway.app/api/repairs/admin/${id}/status`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to update repair status");
    return data;
};