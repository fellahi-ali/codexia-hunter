import secrets from '../config/secrets'
export default class GitHubSearch {
  constructor(onError = console.error, pageSize = 25) {
    this.currentPage = 1
    this.pageSize = pageSize
    this.config = {
      headers: {
        Accept: 'application/vnd.github.mercy-preview+json',
        Authorization: 'token ' + secrets.GITHUB_TOKEN
      }
    }
    this.onError = onError
  }

  useQuery(query) {
    if (query) this.query = query
    return this
  }

  page(page) {
    if (page) this.currentPage = page
    return this
  }

  async search(sort = 'stars', order = 'desc') {
    const url =
      'https://api.github.com/search/repositories?q=' +
      this.query +
      '&per_page=' +
      this.pageSize +
      '&page=' +
      this.currentPage +
      '&sort=' +
      sort +
      '&order=' +
      order

    console.debug('github search url:' + url)
    const res = await fetch(url, this.config)
    if (res.ok) {
      return res.json()
    } else {
      const responseMsg = await res.text()
      //res.text().then(this.onError)
      throw Error('Search github with: ' + url + '\n' + responseMsg)
    }
  }
}
