import { getUserId } from './authService';

const API_URL = 'http://65.0.122.218/api';

export const getMedicalReports = async () => {
  try {
    const response = await fetch(`${API_URL}/medical/scanReports`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch reports: ${response.status}`);
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Received non-JSON response');
      const text = await response.text();
      console.error('Response text:', text.substring(0, 200) + '...');
      throw new Error('Server returned an invalid response. Please try again later.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching medical reports:', error);
    return { 
      success: false, 
      message: error.message,
      reports: [] 
    };
  }
};

export const createMedicalReport = async (reportData) => {
  try {
    const response = await fetch(`${API_URL}/medical/scanReports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(reportData),
    });
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Received non-JSON response');
      const text = await response.text();
      console.error('Response text:', text.substring(0, 200) + '...');
      throw new Error('Server returned an invalid response. Please try again later.');
    }
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating medical report:', error);
    throw error;
  }
};

export const getMedicalReportById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/medical/scanReports/${id}`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Received non-JSON response');
      const text = await response.text();
      console.error('Response text:', text.substring(0, 200) + '...');
      throw new Error('Server returned an invalid response. Please try again later.');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching medical report by ID:', error);
    throw error;
  }
};

export const getTestImages = async (testId) => {
  try {
    const response = await fetch(`${API_URL}/medical/scanReports/${testId}/images`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Received non-JSON response');
      const text = await response.text();
      console.error('Response text:', text.substring(0, 200) + '...');
      throw new Error('Server returned an invalid response. Please try again later.');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching test images:', error);
    throw error;
  }
};
