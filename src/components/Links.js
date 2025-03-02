import {
  FaExternalLinkAlt,
  FaSteam,
  FaPlaystation,
  FaApple,
  FaXbox,
  FaAndroid,
  FaScroll,
  FaWikipediaW,
} from "react-icons/fa";
import { SiEpicgames, SiGogdotcom } from "react-icons/si";

export const Links = ({info}) => {
  const links = {
    official: {
      found: false,
      url: null,
      name: null,
      icon: <FaExternalLinkAlt />,
    },
    steam: { found: false, url: null, name: null, icon: <FaSteam /> },
    microsoft: { found: false, url: null, name: null, icon: <FaXbox /> },
    playstation: {
      found: false,
      url: null,
      name: null,
      icon: <FaPlaystation />,
    },
    apple: { found: false, url: null, name: null, icon: <FaApple /> },
    android: { found: false, url: null, name: null, icon: <FaAndroid /> },
    epic_games: {
      found: false,
      url: null,
      name: null,
      icon: <SiEpicgames />,
    },
    gog: { found: false, url: null, name: null, icon: <SiGogdotcom /> },
    wikia: { found: false, url: null, name: null, icon: <FaScroll /> },
    wikipedia: {
      found: false,
      url: null,
      name: null,
      icon: <FaWikipediaW />,
    },
  };

  info.external_games.forEach((link) => {
    if (!link?.category) return;
    const category = link.category;

    switch (category) {
      case 1: // steam
        if (link.url && !links.steam.found) {
          links.steam.found = true;
          links.steam.url = link.url;
          links.steam.name = link.name;
        }
        break;
      case 5: // gog
        if (link.url && !links.gog.found) {
          links.gog.found = true;
          links.gog.url = link.url;
          links.gog.name = link.name;
        }
        break;
      case 11: // microsoft
        if (
          link.url &&
          link.url.includes("www.microsoft.com") &&
          !links.microsoft.found
        ) {
          links.microsoft.found = true;
          links.microsoft.url = link.url;
          links.microsoft.name = link.name;
        }
        break;
      case 13: // apple
        if (link.url && !links.apple.found) {
          links.apple.found = true;
          links.apple.url = link.url;
          links.apple.name = link.name;
        }
        break;
      case 15: // android
        if (link.url && !links.android.found) {
          links.android.found = true;
          links.android.url = link.url;
          links.android.name = link.name;
        }
        break;
      case 26: // epic games
        if (link.url && !links.epic_games.found) {
          links.epic_games.found = true;
          links.epic_games.url = link.url;
          links.epic_games.name = link.name;
        }
        break;
      case 36: // playstation
        if (link.url && !links.playstation.found) {
          links.playstation.found = true;
          links.playstation.url = link.url;
          links.playstation.name = link.name;
        }
        break;
      default:
        break;
    }
  });

  // return null;

  // if (!info || !info.websites[0]?.url) return null;

  info.websites.forEach((link) => {
    if (!link?.category) return;
    const category = link.category;

    switch (category) {
      case 1: // official
        if (link.url && !links.official.found) {
          links.official.found = true;
          links.official.url = link.url;
          links.official.name = link.name;
        }
        break;
      case 2: // wikia
        if (link.url && !links.wikia.found) {
          links.wikia.found = true;
          links.wikia.url = link.url;
          links.wikia.name = link.name;
        }
        break;
      case 3: // wikipedia
        if (link.url && !links.wikipedia.found) {
          links.wikipedia.found = true;
          links.wikipedia.url = link.url;
          links.wikipedia.name = link.name;
        }
        break;
      case 10: // apple
        if (link.url && !links.apple.found) {
          links.apple.found = true;
          links.apple.url = link.url;
          links.apple.name = link.name;
        }
        break;
      case 12: // android
        if (link.url && !links.android.found) {
          links.android.found = true;
          links.android.url = link.url;
          links.android.name = link.name;
        }
        break;
      case 13: // steam
        if (link.url && !links.steam.found) {
          links.steam.found = true;
          links.steam.url = link.url;
          links.steam.name = link.name;
        }
        break;
      case 16: // epic games
        if (link.url && !links.epic_games.found) {
          links.epic_games.found = true;
          links.epic_games.url = link.url;
          links.epic_games.name = link.name;
        }
        break;
      case 17: // gog
        if (link.url && !links.gog.found) {
          links.gog.found = true;
          links.gog.url = link.url;
          links.gog.name = link.name;
        }
        break;
      default:
        break;
    }
  });

  return (
    <div className="relative flex flex-col items-center bg-black shadow-2xl px-4 py-4"> 
          <div className="mb-2 w-full">
            <h4 className="px-2 text-xl font-bold text-gray-100 text-center md:text-start">
              Links
            </h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0 px-2 pt-4 w-full">
            {links.official.found? <a className="text-6xl" href={links.official.url}>{links.official.icon}</a> : null}
            {links.steam.found? <a className="text-6xl" href={links.steam.url}>{links.steam.icon}</a> : null}
            {links.playstation.found? <a className="text-6xl" href={links.playstation.url}>{links.playstation.icon}</a> : null}
            {links.microsoft.found? <a className="text-6xl" href={links.microsoft.url}>{links.microsoft.icon}</a> : null}
            {links.epic_games.found? <a className="text-6xl" href={links.epic_games.url}>{links.epic_games.icon}</a> : null}
            {links.android.found? <a className="text-6xl" href={links.android.url}>{links.android.icon}</a> : null}
            {links.apple.found? <a className="text-6xl" href={links.apple.url}>{links.apple.icon}</a> : null}
            {links.gog.found? <a className="text-6xl" href={links.gog.url}>{links.gog.icon}</a> : null}
            {links.wikia.found? <a className="text-6xl" href={links.wikia.url}>{links.wikia.icon}</a> : null}
            {links.wikipedia.found? <a className="text-6xl" href={links.wikipedia.url}>{links.wikipedia.icon}</a> : null}
          </div>
        </div>
  );
};
