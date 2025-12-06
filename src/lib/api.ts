export async function getPopularDestinations(): Promise<any> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations/popular`, {
    cache: 'no-store',   // always fetch fresh data
  });


  if (!res.ok) {
    throw new Error("Failed to fetch destinations");
  }

  return res.json(); // returns {statusCode, success, message, data}
}


export async function getTopTravelers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/travelers/top-rated`, {
    next: { revalidate: 0 }, // always fresh
  });

  if (!res.ok) {
    throw new Error("Failed to fetch travelers");
  }

  return res.json(); // returns { statusCode, success, message, data }
}




// export async function createUser(data: any) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   const body = await res.json().catch(() => ({}));

//   if (!res.ok) {
//     // Throw status + body so we can handle validation errors
//     throw {
//       status: res.status,
//       data: body,
//     };
//   }

//   return body; // { success, message, data }
// }




export async function getUsers(page = 1) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?page=${page}`, {
    cache: "no-store",
  });

  return await res.json();
}


export async function createUser(formData: FormData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: "POST",
    body: formData,
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw {
      status: res.status,
      data: body,
    };
  }

  return body; // { success, message, data }
}




// export async function updateUser(id: string, data: any) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   const body = await res.json().catch(() => ({}));

//   if (!res.ok) {
//     throw {
//       status: res.status,
//       data: body,
//     };
//   }

//   return body; // { success, message, data }
// }
export async function updateUser(id: string, formData: FormData) {
  formData.append("_method", "PUT");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
    method: "POST",
    body: formData,
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw {
      status: res.status,
      data: body,
    };
  }

  return body;
}





export async function deleteUserApi(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
    method: "DELETE",
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw {
      status: res.status,
      data: body
    };
  }

  return body;
}


// ======== Travel Plan =========

// Typescript type matching Laravel shape
export interface TravelPlan {
  id: number;
  user_id: number;
  destination: string;
  start_date: string;
  end_date: string;
  budget: number | null;
  travel_type: string | null;
  itinerary: string[] | null;
  group_size: number;
  status: "active" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
}

// GET /travel-plans?page=1&user_id=?
export async function getTravelPlans(page = 1, userId?: number) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (userId) params.set("user_id", String(userId));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/travel-plans?${params.toString()}`,
    { cache: "no-store" }
  );

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw { status: res.status, data: body };
  }

  return body; // {statusCode, success, message, data: paginator}
}

// CREATE
export async function createTravelPlan(data: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/travel-plans`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw { status: res.status, data: body };
  return body;
}

// UPDATE
export async function updateTravelPlan(id: number, data: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/travel-plans/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw { status: res.status, data: body };
  return body;
}

// DELETE
export async function deleteTravelPlan(id: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/travel-plans/${id}`,
    {
      method: "DELETE",
    }
  );

  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw { status: res.status, data: body };
  return body;
}

