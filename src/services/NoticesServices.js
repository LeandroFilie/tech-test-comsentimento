import HttpClient from './utils/HttpClient';

class NoticesService {
  constructor() {
    this.httpClient = new HttpClient('https://api.comsentimento.com.br');
  }

  listNotices() {
    return this.httpClient.get('/notices');
  }

  getNoticeById(id) {
    return this.httpClient.get(`/notices/${id}`);
  }

  createNotice(notice) {
    return this.httpClient.post('/notices', notice);
  }
}

export default new NoticesService();
