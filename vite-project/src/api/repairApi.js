import { getAuth } from 'firebase/auth';
export const submitRepair = async (formData) => {

  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("You must be logged in.");
  }

  const token = await currentUser.getIdToken();

  const response = await fetch(
    "http://localhost:5000/api/repairs",
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
"http://localhost:5000/api/repairs",
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
