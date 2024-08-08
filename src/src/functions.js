import axios from "axios";
import { apiUrl } from "../components/constants";

/**
 * Takes 'id' (of game) and uses it to fetch initial data, it organizes it and stores them in an object (game) and then returns the object
 * @param {*} id
 * @returns
 */
export const fetchInitialGameData = async (id) => {
  const response = await axios.post(`${apiUrl}/igdb/game`, {
    query: id,
  });

  if (response.data && response.data.length > 0) {
    const {
      aggregated_rating,
      aggregated_rating_count,
      artworks,
      bundles,
      category,
      collections,
      cover,
      external_games,
      first_release_date,
      franchises,
      game_engines,
      game_modes,
      genres,
      involved_companies,
      name,
      parent_game,
      platforms,
      player_perspectives,
      rating: igdb_rating,
      screenshots,
      storyline,
      summary,
      themes,
      version_parent,
      videos,
      websites,
      ...rest
    } = response.data[0];

    return {
      ...rest,
      about: {
        collections: collections ? collections.map((id) => ({ id })) : [],
        franchises: franchises ? franchises.map((id) => ({ id })) : [],
        game_engines: game_engines ? game_engines.map((id) => ({ id })) : [],
        game_modes: game_modes ? game_modes.map((id) => ({ id })) : [],
        genres: genres ? genres.map((id) => ({ id })) : [],
        involved_companies: involved_companies
          ? involved_companies.map((id) => ({ id }))
          : [],
        parent_game: parent_game ? { id: parent_game } : null,
        platforms: platforms ? platforms.map((id) => ({ id })) : [],
        player_perspectives: player_perspectives
          ? player_perspectives.map((id) => ({ id }))
          : [],
        themes: themes ? themes.map((id) => ({ id })) : [],
        storyline: storyline ? storyline : null,
        version_parent: version_parent ? { id: version_parent } : null,
      },
      core_info: {
        aggregated_rating: aggregated_rating ?? null,
        aggregated_rating_count: aggregated_rating_count ?? null,
        category: category ?? null,
        cover: cover ? { id: cover } : null,
        first_release_date: first_release_date
          ? { epoch: first_release_date }
          : null,
        igdb_rating: igdb_rating ?? null,
        name: name ?? null,
        summary: summary ? summary : null,
      },
      links: {
        external_games: external_games
          ? external_games.map((id) => ({ id }))
          : [],
        websites: websites ? websites.map((id) => ({ id })) : [],
      },
      media: {
        artworks: artworks ? artworks.map((id) => ({ id })) : [],
        screenshots: screenshots ? screenshots.map((id) => ({ id })) : [],
        videos: videos ? videos.map((id) => ({ id })) : [],
      },
      related_content: {
        bundles: bundles ? bundles.map((id) => ({ id })) : [],
      },
    };
  }
  return null;
};

/**
 * Takes an object (game) and uses its 'cover.id' to fecth and add 'image_id', 'height', and 'width' (of the cover) to the 'cover' attribute
 * @param {*} gameData
 */
export const fetchCoverImageId = async (gameData) => {
  if (gameData.core_info.cover.id) {
    try {
      const response = await axios.post(`${apiUrl}/igdb/cover`, {
        query: gameData.core_info.cover.id,
      });

      if (response.data && response.data.length > 0) {
        gameData.core_info.cover.image_id = response.data[0].image_id;
        gameData.core_info.cover.height = response.data[0].height;
        gameData.core_info.cover.width = response.data[0].width;
      } else {
        console.warn("No cover image_id found for game");
      }
    } catch (err) {
      console.error(err);
    }
  }
};

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
 * Takes the game object and uses 'category' to find the category of game
 * @param {*} game
 * @returns
 */
export const findCategoryOfTitle = (game) => {
  switch (game.category) {
    case 0:
      return "Main Game";
    case 1:
      return "DLC";
    case 2:
      return "Expansion";
    case 3:
      return "Bundle";
    case 4:
      return "Standalone Expansion";
    case 5:
      return "Mod";
    case 6:
      return "Episode";
    case 7:
      return "Season";
    case 8:
      return "Remake";
    case 9:
      return "Remaster";
    case 10:
      return "Expanded Game";
    case 11:
      return "Port";
    case 12:
      return "Fork";
    case 13:
      return "Pack";
    case 14:
      return "Update";
    default:
      return null;
  }
};

/**
 * Takes array of objects and uses their 'id's to fetch and add 'name' to each one
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
 * Takes an array of objects (video) and uses their 'id' to fetch and add 'name' and 'video_id' to each one
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
 * Takes array of objects and uses their 'id's to fetch and add 'category' and 'url' to each one
 * @param {*} list
 * @param {*} listName
 */
export const fetchCategoryAndUrl = async (list, listName) => {
  if (list && list.length > 0) {
    const response = await axios.post(`${apiUrl}/igdb/${listName}`, {
      query: list,
    });
    if (response.data && response.data.length > 0) {
      response.data.forEach((responseRecord) => {
        const listRecord = list.find(
          (record) => record.id === responseRecord.id
        );
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
 * Takes array of objects and uses their 'id's to fetch and add 'image_id', 'height', and 'width' to each one
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

/**
 * Takes array of objects (involved companies) and uses their 'id's to fetch and add 'company', 'developer', 'porting', 'publisher', and 'supporting' to each one
 * @param {*} list
 */
export const fetchInvolvedCompanyInfo = async (list) => {
  if (list && list.length > 0) {
    const response = await axios.post(`${apiUrl}/igdb/involved_companies`, {
      query: list,
    });
    if (response.data && response.data.length > 0) {
      response.data.forEach((responseRecord) => {
        const listRecord = list.find(
          (record) => record.id === responseRecord.id
        );
        if (listRecord) {
          listRecord.company = responseRecord.company;
          listRecord.developer = responseRecord.developer;
          listRecord.porting = responseRecord.porting;
          listRecord.publisher = responseRecord.publisher;
          listRecord.supporting = responseRecord.supporting;
        }
      });
      if (list[0].company) {
        await fetchCompaniesNames(list);
      }
    }
  }
};
/**
 * Takes an array of objects (companies) and uses their 'company' (id) attributes to fetch and add 'name' to each one
 * @param {*} list
 */
const fetchCompaniesNames = async (list) => {
  if (list && list.length > 0) {
    const response = await axios.post(`${apiUrl}/igdb/companies`, {
      query: list,
    });
    if (response.data && response.data.length > 0) {
      response.data.forEach((responseRecord) => {
        const listRecord = list.find(
          (record) => record.company === responseRecord.id
        );
        if (listRecord) {
          listRecord.name = responseRecord.name;
        }
      });
    }
  }
};

/**
 * Takes an array of objects and uses their 'id' attribute to fetch and add 'name' and 'abbreviation' to each one
 * @param {*} list
 * @param {*} listName
 */
export const fetchNamesAndAbbreviations = async (list, listName) => {
  if (list && list.length > 0) {
    const response = await axios.post(`${apiUrl}/igdb/${listName}`, {
      query: list,
    });
    if (response.data && response.data.length > 0) {
      response.data.forEach((responseRecord) => {
        const listRecord = list.find(
          (record) => record.id === responseRecord.id
        );
        if (listRecord) {
          listRecord.name = responseRecord.name;
          listRecord.abbreviation = responseRecord.abbreviation;
        }
      });
    }
  }
};

/**
 * Takes an object (game) and uses the 'id's inside 'related_content' to fetch and add 'name', 'cover', 'first_release_date', and 'category' to each element inside 'related_content'
 * @param {*} game
 */
export const fetchRelatedContent = async (game) => {
  fetchNamesDatesAndCovers(game.related_content.bundles); // Fetching info for bundles separately
  const existingBundles = game.related_content?.bundles || [];
  game.related_content = {
    bundles: existingBundles,
    dlcs: [],
    expansions: [],
    standalone_expansions: [],
    mods: [],
    episodes: [],
    seasons: [],
    remakes: [],
    remasters: [],
    expanded_games: [],
    ports: [],
    forks: [],
    packs: [],
    updates: [],
    editions: [],
  };

  if (game.id) {
    const response = await axios.post(`${apiUrl}/igdb/related_content`, {
      query: game.id,
    });

    if (response.data && response.data.length > 0) {
      const unorganizedList = response.data.map((responseRecord) => {
        const first_release_date = {
          epoch: responseRecord.first_release_date,
        };
        convertDate(first_release_date);

        return {
          name: responseRecord.name,
          cover: { id: responseRecord.cover },
          first_release_date,
          category: responseRecord.category,
        };
      });
      if (unorganizedList[0].cover.id) {
        await fetchCoverImageIds(unorganizedList);
      }

      unorganizedList.forEach((item) => {
        switch (item.category) {
          case 1:
            game.related_content.dlcs.push(item);
            break;
          case 2:
            game.related_content.expansions.push(item);
            break;
          case 3:
            game.related_content.editions.push(item);
            break;
          case 4:
            game.related_content.standalone_expansions.push(item);
            break;
          case 5:
            game.related_content.mods.push(item);
            break;
          case 6:
            game.related_content.episodes.push(item);
            break;
          case 7:
            game.related_content.seasons.push(item);
            break;
          case 8:
            game.related_content.remakes.push(item);
            break;
          case 9:
            game.related_content.remasters.push(item);
            break;
          case 10:
            game.related_content.expanded_games.push(item);
            break;
          case 11:
            game.related_content.ports.push(item);
            break;
          case 12:
            game.related_content.forks.push(item);
            break;
          case 13:
            game.related_content.packs.push(item);
            break;
          case 14:
            game.related_content.updates.push(item);
            break;
          default:
            game.related_content.editions.push(item);
        }
      });
    }
  }
};
/**
 * Takes array of objects with 'id' and fetches 'name', 'cover', 'first_release_date', and 'category' for each element
 * @param {*} list
 */
const fetchNamesDatesAndCovers = async (list) => {
  if (list && list.length > 0) {
    const response = await axios.post(`${apiUrl}/igdb/games_by_id`, {
      query: list,
    });

    response.data.forEach((responseRecord) => {
      const listRecord = list.find((record) => record.id === responseRecord.id);
      if (listRecord) {
        listRecord.name = responseRecord.name;
        listRecord.cover = { id: responseRecord.cover };
        listRecord.first_release_date = {
          epoch: responseRecord.first_release_date,
        };
        convertDate(listRecord.first_release_date);
        listRecord.category = responseRecord.category;
      }
    });
    if (list[0].cover.id) {
      await fetchCoverImageIds(list);
    }
  }
};
/**
 * Takes an array of objects and uses 'cover.id' to fetch and add 'cover.image_id' to each one
 * @param {*} records
 */
const fetchCoverImageIds = async (records) => {
  const response = await axios.post(`${apiUrl}/igdb/covers`, {
    query: records,
  });

  response.data.forEach((coverRecord) => {
    const listRecord = records.find(
      (record) => record.cover.id === coverRecord.id
    );
    if (listRecord) {
      listRecord.cover.image_id = coverRecord.image_id;
    }
  });
};
