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

export const LinksSection = ({ links }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative flex flex-col items-center max-w-3xl mx-auto bg-black shadow-2xl p-3">
        <div className="mt-2 mb-6 w-full">
          <h4 className="px-2 text-xl font-bold text-gray-100">Links</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 w-full">
          {displayLinks(links)}
        </div>
      </div>
    </div>
  );
};

const displayLinks = (linksObj) => {
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

  linksObj.external_games.forEach((link) => {
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

  linksObj.websites.forEach((link) => {
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
    <div>
      {Object.keys(links).map(
        (key) =>
          links[key].found && (
            <a
              key={key}
              href={links[key].url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center"
            >
              <div className="relative">
                {links[key].icon}
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-focus:opacity-100 text-gray-200 text-xs mt-1">
                  {links[key].name}
                </span>
              </div>
            </a>
          )
      )}
    </div>
  );
};
