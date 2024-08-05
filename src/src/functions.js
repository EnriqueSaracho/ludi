import axios from "axios";
import { apiUrl } from "../components/constants";

/**
 * Takes a date object with '.epoch' attribute and adds the converted '.date' attribute
 * @param {*} gameDate
 */
export const convertDate = (gameDate) => {
  if (gameDate) {
    const timestamp = gameDate.epoch;
    const date = new Date(timestamp * 1000);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    gameDate.date = formattedDate;
  }
};

/**
 * Takes array of objects with 'id' and fetches 'name' for each element
 * @param {*} list
 * @param {*} listName
 */
export const fetchNames = async (list, listName) => {
  if (list && list.length > 0) {
    const response = await axios.post(`${apiUrl}/igdb/${listName}`, {
      query: list,
    });
    response.data.forEach((responseRecord) => {
      const listRecord = list.find((record) => record.id === responseRecord.id);
      if (listRecord) {
        listRecord.name = responseRecord.name;
      }
    });
  }
};

/**
 * Takes a game object with 'id' fetches 'parent_game.name' and '.first_release_date'
 * @param {*} gameObject
 */
export const fetchNameAndDate = async (gameObject) => {
  if (gameObject) {
    const response = await axios.post(`${apiUrl}/igdb/name_and_date`, {
      query: gameObject.id,
    });
    gameObject.name = response.data[0].name;
    gameObject.first_release_date = {
      epoch: response.data[0].first_release_date,
    };
    convertDate(gameObject.first_release_date);
  }
};

/**
 * Takes an array of video objects and uses '.id' to fetch '.name' and '.video_id'
 * @param {*} list
 */
export const fetchNamesAndVideoIds = async (list) => {
  if (list && list.length > 0) {
    const response = await axios.post(`${apiUrl}/igdb/game_videos`, {
      query: list,
    });
    response.data.forEach((responseRecord) => {
      const listRecord = list.find((record) => record.id === responseRecord.id);
      if (listRecord) {
        listRecord.name = responseRecord.name;
        listRecord.video_id = responseRecord.video_id;
      }
    });
  }
};

/**
 * Takes array of objects with 'id' and fetches 'category' and 'url' for each element
 * @param {*} list
 * @param {*} listName
 */
export const fetchCategoryAndUrl = async (list, listName) => {
  if (list && list.length > 0) {
    const response = await axios.post(`${apiUrl}/igdb/${listName}`, {
      query: list,
    });
    response.data.forEach((responseRecord) => {
      const listRecord = list.find((record) => record.id === responseRecord.id);
      if (listRecord) {
        listRecord.category = responseRecord.category;
        listRecord.url = responseRecord.url;
        if (listName === "external_games") {
          listRecord.name = findCategoryOfService(responseRecord.category);
        } else if (listName === "websites") {
          listRecord.trusted = responseRecord.trusted;
          listRecord.name = findCategoryOfWebsite(responseRecord.category);
        }
      }
    });
  }
};
/**
 * Takes a media service's category and finds its title/name
 * @param {*} list
 */
export const findCategoryOfService = (category) => {
  if (category) {
    switch (category) {
      case 1:
        return "Steam";
      case 5:
        return "GOG";
      case 10:
        return "YouTube";
      case 11:
        return "Microsoft";
      case 13:
        return "Apple";
      case 14:
        return "Twitch";
      case 15:
        return "Android";
      case 20:
        return "Amazon ASIN";
      case 22:
        return "Amazon Luna";
      case 23:
        return "Amazon ADG";
      case 26:
        return "Epic Game Store";
      case 28:
        return "Oculus";
      case 29:
        return "Utomik";
      case 30:
        return "itch.io";
      case 31:
        return "Xbox Marketplace";
      case 32:
        return "Kartridge";
      case 36:
        return "PlayStation Store";
      case 37:
        return "Focus Entertainment";
      case 54:
        return "Xbox Game Pass Ultimate Cloud";
      case 55:
        return "Game Jolt";
      default:
        return "Unknown";
    }
  } else {
    return "Unknown";
  }
};
/**
 * Takes a website's category and finds its title/name
 * @param {*} list
 */
export const findCategoryOfWebsite = (category) => {
  if (category) {
    switch (category) {
      case 1:
        return "Official";
      case 2:
        return "Wikia";
      case 3:
        return "Wikipedia";
      case 4:
        return "Facebook";
      case 5:
        return "Twitter";
      case 6:
        return "Twitch";
      case 8:
        return "Instagram";
      case 9:
        return "YouTube";
      case 10:
        return "iPhone";
      case 11:
        return "iPad";
      case 12:
        return "Android";
      case 13:
        return "Steam";
      case 14:
        return "Reddit";
      case 15:
        return "itch.io";
      case 16:
        return "Epic Games";
      case 17:
        return "GOG";
      case 18:
        return "Discord";
      default:
        return "Unknown";
    }
  } else {
    return "Unknown";
  }
};

/**
 * Takes array of objects with 'id' and fetches 'image_id' for each element
 * @param {*} list array of objects
 * @param {*} listName name of the array
 */
export const fetchImageIds = async (list, listName) => {
  if (list && list.length > 0) {
    const response = await axios.post(`${apiUrl}/igdb/${listName}`, {
      query: list,
    });
    response.data.forEach((responseRecord) => {
      const listRecord = list.find((art) => art.id === responseRecord.id);
      if (listRecord) {
        listRecord.image_id = responseRecord.image_id;
        listRecord.height = responseRecord.height;
        listRecord.width = responseRecord.width;
      }
    });
  }
};
