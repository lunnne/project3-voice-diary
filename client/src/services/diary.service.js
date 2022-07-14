import axios from 'axios';

class DiaryService {
  constructor() {
    this.baseUrl = 'http://localhost:5005/api/mydiary';
  }

  getAllRecordings = () => {
    return axios.get(`${this.baseUrl}`);
  };

  getOneRecording = (id) => {
    return axios({
      url: `${this.baseUrl}/${id}`,
      method: 'GET',
      responseType: 'blob', // important
    });
  };

  createRecording = () => {
    const formData = new FormData(); // preparing to send to the server
    return axios({
      method: 'post',
      url: `${this.baseUrl}/create`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  deleteRecording = (id) => {
    return axios.delete(`${this.baseUrl}/${id}`);
  };

  getQuote = () => {
    return axios.get('https://type.fit/api/quotes');
  };
}

const diaryService = new DiaryService();

export { diaryService };
