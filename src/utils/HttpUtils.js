export const BASE_URL = "https://outlookguide.net/";

class HttpUtils {

  signup() {
    return BASE_URL + "?cmd=OG-signup";
  }

  signin() {
    return BASE_URL + "?cmd=OG-login";
  }

  forgot() {
    return BASE_URL + "?cmd=OG-forgot";
  }

  activate() {
    return BASE_URL + "?cmd=OG-activate"
  }

  // Headers ======================
  getHeaders() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }

  getXMLHeaders() {
    return {
      Accept: 'application/xml',
      'Content-Type': 'application/json',
    }
  }
}

export const httpUtils = new HttpUtils();