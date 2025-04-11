const API_URL = "https://restcountries.com/v3.1/all";

export const fetchCountries = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok)
      throw new Error(
        `Error in the request: ${response.status} ${response.statusText}`,
      );
    return await response.json();
  } catch (error) {
    console.error("Error fetching countries", error);
    // Add context, but preserve the original error as the cause
    const enhancedError = new Error(
      `Failed to fetch countries: ${error.message}`,
    );
    enhancedError.cause = error; // Available in modern javascript
    enhancedError.originalStack = error.stack;
    throw enhancedError;
  }
};
