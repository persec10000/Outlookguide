import { httpUtils } from '../utils/HttpUtils';

class KeywordsService {

  loadKeywords(cbSuccess, cbError) {
    fetch(httpUtils.loadKeywords(), {
      method: 'GET',
      headers: httpUtils.getHeaders()
    })
      .then(response => response.json())
      .then(resJson => {
        cbSuccess(resJson);
      })
      .catch((error) => {
        cbError(error);
      });
  }
  loadKeywordForUsers(params, cbSuccess, cbError){
    let url = httpUtils.loadKeywordForUsers();
    url = url + "?UserId=" + params.UserId;
    fetch(url, {
      method: 'GET',
      headers: httpUtils.getHeaders()
    })
      .then(response => response.json())
      .then(resJson => {
        cbSuccess(resJson);
      })
      .catch((error) => {
        cbError(error);
      });
  }

}

export const keywordsService = new KeywordsService();