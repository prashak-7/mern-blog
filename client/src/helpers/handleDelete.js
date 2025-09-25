export const deleteData = async (endpoint) => {
  const userConfirmed = confirm("Are you sure you want to delete this data?");
  if (!userConfirmed) return false;

  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    return false;
  }
};
