import { httpUtils } from '../utils/HttpUtils';

class GroupsService {

  loadGroups(cbSuccess, cbError) {
    fetch(httpUtils.loadGroups(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(resJson => {
        cbSuccess(resJson);
      })
      .catch((error) => {
        cbError(error);
      });
  }

  filterGroups(params, cbSuccess, cbError) {
    let url = httpUtils.filterGroups();
    url = url + 
      "?HitCount=" + params.HitCount +
      "&searchKeyword=" + params.searchKeyword;
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

  loadGroupMembers(groupId, cbSuccess, cbError) {
    let url = httpUtils.loadGroupMembers() + "?GroupId=" + groupId;
    console.log(url);
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

  joinGroup(params, cbSuccess, cbError) {
    let url = httpUtils.joinGroup();
    url = url + 
      "?UserId=" + params.UserId +
      "&GroupId=" + params.GroupId;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }, 300000)
      .then(response => response.json())
      .then(resJson => {
        cbSuccess(resJson);
      })
      .catch((error) => {
        cbError(error);
      });
  }

  leaveGroup(params, cbSuccess, cbError) {
    let url = httpUtils.leaveGroup();
    url = url + 
      "?UserId=" + params.UserId +
      "&GroupId=" + params.GroupId;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }, 300000)
      .then(response => response.json())
      .then(resJson => {
        cbSuccess(resJson);
      })
      .catch((error) => {
        cbError(error);
      });
  }

  addGroup(params, cbSuccess, cbError){
    let url = httpUtils.addGroup();
    url = url + 
      "?GroupName=" + params.GroupName +
      "&GroupDesc=" + params.GroupDesc +
      "&GroupCity=" + params.GroupCity +
      "&GroupGeoLoc=" + params.GroupGeoLoc +
      "&GroupMaxDis=" + params.GroupMaxDis +
      "&PublicProfile=" + params.PublicProfile;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }, 300000)
      .then(response => response.json())
      .then(resJson => {
        cbSuccess(resJson);
      })
      .catch((error) => {
        cbError(error);
      });
  }
}

export const groupsService = new GroupsService();