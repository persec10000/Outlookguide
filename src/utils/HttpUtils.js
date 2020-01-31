export const BASE_USER_URL = "https://game.invoicegeek.com/api/webapi.asmx/";
export const BASE_URL = "http://gameapi.invoicegeek.com/api/";

class HttpUtils {

  signup() {
    return BASE_URL + "User/UserSignUp";
  }

  signin() {
    return BASE_URL + "User/ValidateLogin";
  }

  updateUser() {
    return BASE_URL + "User/UpdateUserDetails";
  }

  loadItemType() {
    return BASE_URL + "Setting/LoadItemType";
  }

  loadCountries() {
    return BASE_URL + "Setting/LoadCountry";
  }

  loadUser(userId) {
    return BASE_URL + "User/LoadUser?UserId=" + userId;
  }

  checkNickName(nickname) {
    return BASE_URL + "User/CheckNickName?NickName=" + nickname;
  }

  loadGroupWithUsers() {
    return BASE_URL + "User/LoadGroupWithUsers";
  }

  addEditItem() {
    return BASE_URL + "Item/SaveUpdateItem";
  }

  loadItemList(count) {
    return BASE_URL + "Item/LoadItemListWithFilter";
  }

  loadItemDetails() {
    return BASE_URL + "Item/LoadItemDetails";
  }

  loadGroups() {
    return BASE_URL + "Setting/LoadGroup";
  }

  filterGroups() {
    return BASE_URL + "Group/LoadGroupListWithFilter";
  }

  loadGroupMembers() {
    return BASE_URL + "Group/LoadUserDetailsForGroup";
  }

  joinGroup() {
    return BASE_URL + "Group/SaveGroupUser";
  }

  leaveGroup() {
    return BASE_URL + "Group/DeleteGroupUser";
  }

  addGroup() {
    return BASE_URL + "Group/SaveUpdateGroup";
  }

  loadKeywords() {
    return BASE_URL + "Setting/LoadKeyword";
  }

  loadKeywordForUsers() {
    return BASE_URL + "User/LoadKeywordForUsers";
  }

  loadUserListWithFilter() {
    return BASE_URL + "Item/LoadItemListWithFilter";
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