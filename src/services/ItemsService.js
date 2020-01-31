import { httpUtils } from '../utils/HttpUtils';

class ItemsService {

  addEditItem(params, cbSuccess, cbError) {
    let url = httpUtils.addEditItem();
    url = url + 
      "?ItemId=" + params.ItemId +
      "&OwnerName=" + params.OwnerName +
      "&IsPublic=" + params.IsPublic +
      "&GroupId=" + params.GroupId +
      "&ItemType=" + params.ItemType +
      "&ItemName=" + params.ItemName +
      "&ItemDesc=" + params.ItemDesc +
      "&Gender=" + params.Gender +
      "&AgeFrom=" + params.AgeFrom +
      "&AgeTo=" + params.AgeTo +
      "&FinderMessage=" + params.FinderMessage +
      "&Location=" + params.Location +
      "&Area=" + params.Area +
      "&Town=" + params.Town +
      "&Country=" + params.Country +
      "&IsHidden=" + params.IsHidden +
      "&HiddenDate=" + params.HiddenDate +
      "&Distance=" + params.Distance +
      "&KeywordId=" + params.KeywordId +
      "&ItemImage=" + params.ItemImage +
      "&LocationImage=" + params.LocationImage;

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

  loadItemList(params, cbSuccess, cbError) {
    let url = httpUtils.loadItemList();
    url = url + "?HitCount=" + params.HitCount;
    if(typeof params.searchKeyword != 'undefined') {
      url = url + "&searchKeyword=" + params.searchKeyword;
    }
    if(typeof params.UserId != 'undefined') {
      url = url + "&UserId=" + params.UserId;
    }
    if(typeof params.Gender != 'undefined') {
      url = url + "&Gender=" + params.Gender;
    }
    if(typeof params.ItemType != 'undefined') {
      url = url + "&ItemType=" + params.ItemType;
    }
    if(typeof params.AgeFrom != 'undefined') {
      url = url + "&AgeFrom=" + params.AgeFrom;
    }
    if(typeof params.AgeTo != 'undefined') {
      url = url + "&AgeTo=" + params.AgeTo;
    }
    if(typeof params.Country != 'undefined') {
      url = url + "&Country=" + params.Country;
    }
    if(typeof params.Town != 'undefined') {
      url = url + "&Town=" + params.Town;
    }
    if(typeof params.Location != 'undefined') {
      url = url + "&Location=" + params.Location;
    }
    if(typeof params.UserRating != 'undefined') {
      url = url + "&UserRating=" + params.UserRating;
    }
    if(typeof params.Distance != 'undefined') {
      url = url + "&Distance=" + params.Distance;
    }
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

  loadItemType(cbSuccess, cbError) {
    fetch(httpUtils.loadItemType(), {
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

  loadItemDetails(params, cbSuccess, cbError) {
    let url = httpUtils.loadItemDetails();
    url = url + "?ItemId=" + params
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

  loadUserListWithFilter(params, cbSuccess, cbError){
    let url = httpUtils.loadUserListWithFilter();
    url = url + "?HitCount=" + params.HitCount;
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

export const itemsService = new ItemsService();