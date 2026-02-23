const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('token');
  }

  // Set token for authenticated requests
  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  // Clear token on logout
  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add authorization header if token exists
    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // HTTP methods
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: 'GET' });
  }

  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // File upload method
  async uploadFile(endpoint, file, additionalData = {}) {
    const formData = new FormData();
    formData.append('file', file);
    
    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key]);
    });

    const url = `${this.baseURL}${endpoint}`;
    const config = {
      method: 'POST',
      body: formData,
      headers: {},
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      return data;
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async login(email, password) {
    const response = await this.post('/auth/login', { email, password });
    this.setToken(response.token);
    return response;
  }

  async register(userData) {
    const response = await this.post('/auth/register', userData);
    this.setToken(response.token);
    return response;
  }

  async getCurrentUser() {
    return this.get('/auth/me');
  }

  async updateProfile(userData) {
    return this.put('/auth/profile', userData);
  }

  async changePassword(currentPassword, newPassword) {
    return this.put('/auth/change-password', { currentPassword, newPassword });
  }

  // User endpoints
  async getUsers(params = {}) {
    return this.get('/users', params);
  }

  async getUserById(id) {
    return this.get(`/users/${id}`);
  }

  async updateUser(id, userData) {
    return this.put(`/users/${id}`, userData);
  }

  async deleteUser(id) {
    return this.delete(`/users/${id}`);
  }

  async getDentists() {
    return this.get('/users/dentists/list');
  }

  // Patient endpoints
  async getPatients(params = {}) {
    return this.get('/patients', params);
  }

  async getPatientProfile() {
    return this.get('/patients/profile');
  }

  async getPatientById(id) {
    return this.get(`/patients/${id}`);
  }

  async createPatient(patientData) {
    return this.post('/patients', patientData);
  }

  async updatePatient(id, patientData) {
    return this.put(`/patients/${id}`, patientData);
  }

  async getPatientStats(id) {
    return this.get(`/patients/${id}/stats`);
  }

  // Appointment endpoints
  async getAppointments(params = {}) {
    return this.get('/appointments', params);
  }

  async getAppointmentById(id) {
    return this.get(`/appointments/${id}`);
  }

  async createAppointment(appointmentData) {
    return this.post('/appointments', appointmentData);
  }

  async updateAppointment(id, appointmentData) {
    return this.put(`/appointments/${id}`, appointmentData);
  }

  async getAvailableSlots(dentistId, date) {
    return this.get(`/appointments/available-slots/${dentistId}`, { date });
  }

  // Document endpoints
  async getPatientDocuments(patientId, params = {}) {
    return this.get(`/documents/patient/${patientId}`, params);
  }

  async getDocumentById(id) {
    return this.get(`/documents/${id}`);
  }

  async uploadDocument(file, documentData) {
    return this.uploadFile('/documents', file, documentData);
  }

  async updateDocument(id, documentData) {
    return this.put(`/documents/${id}`, documentData);
  }

  async deleteDocument(id) {
    return this.delete(`/documents/${id}`);
  }

  async downloadDocument(id) {
    const url = `${this.baseURL}/documents/${id}/download`;
    const config = {
      headers: {},
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Download failed');
      }

      // Get filename from response headers or create one
      const contentDisposition = response.headers.get('content-disposition');
      let filename = 'document';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      // Create blob and download
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      return { success: true, filename };
    } catch (error) {
      console.error('Document download error:', error);
      throw error;
    }
  }
}

// Create and export singleton instance
const apiService = new ApiService();
export default apiService;
