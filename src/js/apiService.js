const URL = 'https://pixabay.com/api/';
const API_KEY = "23234796-47fbd745329069e6b0b2bf0fd";
export default {
  searchQuery: '',
  page: 1,
  async fetchImages() {
    const queryUrl = `?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    const result = await fetch(URL + queryUrl);
    const dataResponse = await result.json();
    this.incrementPage();
    return dataResponse.hits
  },
  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
  get querySearch() {
    return this.searchQuery;
  },
  set querySearch(value) {
    this.searchQuery = value;
  },
};