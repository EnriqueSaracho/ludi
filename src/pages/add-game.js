import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { BsFillXCircleFill } from "react-icons/bs";
import { SiNintendo } from "react-icons/si";
import { SiPlaystation } from "react-icons/si";
import { SiXbox } from "react-icons/si";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaGamepad } from "react-icons/fa";
import { ImMobile } from "react-icons/im";

export const AddGame = () => {
  const [game, setGame] = useState({
    name: "",
    franchise: "",
    developer: "",
    publisher: "",
    director: "",
    producer: "",
    designer: "",
    programmer: "",
    artist: "",
    writer: "",
    composer: "",
    engine: "",
    releaseDate: new Date(),
    imageUrl: "",
    status: "Not played",
    genres: [],
    platforms: [],
    modes: [],
    rating: 0,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, checked } = event.target;

    if (name === "genres" || name === "platforms" || name === "modes") {
      if (checked) {
        setGame({ ...game, [name]: [...game[name], value] });
      } else {
        setGame({
          ...game,
          [name]: [...game[name].filter((option) => option !== value)],
        });
      }
    } else {
      setGame({ ...game, [name]: value });
    }
  };

  // Function: posts new game to the database
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      // Accessing database using online server
      await axios.post("https://ludi-server.vercel.app/games", game);
      alert("Game added");
      navigate("/");
    } catch (error) {
      try {
        // Accessing database using local server
        await axios.post("http://localhost:3001/games", game);
        alert("Game added");
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="form-page">
      <div className="navbar">
        <Link to="/" className="navbar-title mobile">
          <FaGamepad />
        </Link>
        <Link to="/" className="navbar-title">
          <FaGamepad /> Game List
        </Link>
      </div>
      <div className="blur"></div>
      <Link to="/" className="btn btn-1">
        <BsFillXCircleFill />
      </Link>
      <h2 className="game-form-title">Add a new game</h2>

      {/* Add Game Form */}
      <form onSubmit={onSubmit} className="game-form">
        <fieldset>
          <div>
            <label htmlFor="name" className="label-text">
              Title:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              className="input-text"
              autoComplete="off"
            />

            <label htmlFor="franchise" className="label-text">
              Series:
            </label>
            <input
              type="text"
              id="franchise"
              name="franchise"
              onChange={handleChange}
              className="input-text"
              autoComplete="off"
            />

            <label htmlFor="developer" className="label-text">
              Developer:
            </label>
            <input
              type="text"
              id="developer"
              name="developer"
              onChange={handleChange}
              className="input-text"
              autoComplete="off"
            />

            <label htmlFor="publisher" className="label-text">
              Publisher(s):
            </label>
            <input
              type="text"
              id="publisher"
              name="publisher"
              onChange={handleChange}
              className="input-text"
              autoComplete="off"
              value={game.publisher}
            />

            <label htmlFor="director" className="label-text">
              Director(s):
            </label>
            <input
              type="text"
              id="director"
              name="director"
              onChange={handleChange}
              className="input-text"
              autoComplete="off"
              value={game.director}
            />

            <label htmlFor="producer" className="label-text">
              Producer(s):
            </label>
            <input
              type="text"
              id="producer"
              name="producer"
              onChange={handleChange}
              className="input-text"
              autoComplete="off"
              value={game.producer}
            />

            <label htmlFor="designer" className="label-text">
              Designer(s):
            </label>
            <input
              type="text"
              id="designer"
              name="designer"
              onChange={handleChange}
              className="input-text"
              autoComplete="off"
              value={game.designer}
            />

            <label htmlFor="programmer" className="label-text">
              Programmer(s):
            </label>
            <input
              type="text"
              id="programmer"
              name="programmer"
              onChange={handleChange}
              className="input-text"
              autoComplete="off"
              value={game.programmer}
            />

            <label htmlFor="artist" className="label-text">
              Artist(s):
            </label>
            <input
              type="text"
              id="artist"
              name="artist"
              onChange={handleChange}
              className="input-text"
              autoComplete="off"
              value={game.artist}
            />

            <label htmlFor="writer" className="label-text">
              Writer(s):
            </label>
            <input
              type="text"
              id="writer"
              name="writer"
              onChange={handleChange}
              className="input-text"
              autoComplete="off"
              value={game.writer}
            />

            <label htmlFor="composer" className="label-text">
              Composer(s):
            </label>
            <input
              type="text"
              id="composer"
              name="composer"
              onChange={handleChange}
              className="input-text"
              autoComplete="off"
              value={game.composer}
            />

            <label htmlFor="engine" className="label-text">
              Engine:
            </label>
            <input
              type="text"
              id="engine"
              name="engine"
              onChange={handleChange}
              className="input-text"
              autoComplete="off"
              value={game.engine}
            />

            <label htmlFor="release-date" className="label-text">
              Release date:
            </label>
            <DatePicker
              id="release-date"
              name="releaseDate"
              dateFormat="dd/MM/yyyy"
              selected={game.releaseDate}
              onChange={(date) => {
                setGame({ ...game, releaseDate: date });
              }}
              className="input-text"
              autoComplete="off"
            />

            <label htmlFor="image-url" className="label-text">
              Image URL:
            </label>
            <input
              type="text"
              id="image-url"
              name="imageUrl"
              onChange={handleChange}
              className="input-text"
              autoComplete="off"
            />
          </div>
        </fieldset>

        {/* Status */}
        <fieldset>
          <legend>Status:</legend>
          <div>
            <div className="option-container">
              <input
                type="radio"
                id="not-played"
                name="status"
                value={"Not played"}
                onChange={handleChange}
                className="input-option input-radio"
              />
              <label htmlFor="not-played" className="label-option">
                Not played
              </label>
            </div>

            <div className="option-container">
              <input
                type="radio"
                id="in-progress"
                name="status"
                value={"In progress"}
                onChange={handleChange}
                className="input-option input-radio"
              />
              <label htmlFor="in-progress" className="label-option">
                In progress
              </label>
            </div>

            <div className="option-container">
              <input
                type="radio"
                id="paused"
                name="status"
                value={"Paused"}
                onChange={handleChange}
                className="input-option input-radio"
              />
              <label htmlFor="paused" className="label-option">
                Paused
              </label>
            </div>

            <div className="option-container">
              <input
                type="radio"
                id="completed"
                name="status"
                value={"Completed"}
                onChange={handleChange}
                className="input-option input-radio"
              />
              <label htmlFor="completed" className="label-option">
                Completed
              </label>
            </div>

            <div className="option-container">
              <input
                type="radio"
                id="abandoned"
                name="status"
                value={"Abandoned"}
                onChange={handleChange}
                className="input-option input-radio"
              />
              <label htmlFor="abandoned" className="label-option">
                Abandoned
              </label>
            </div>
          </div>
        </fieldset>

        {/* Genres */}
        <fieldset>
          <legend>Genres:</legend>
          <div>
            <div className="option-container">
              <input
                type="checkbox"
                id="action"
                name="genres"
                value={"Action"}
                onChange={handleChange}
                className="input-option"
              />
              <label htmlFor="action" className="label-option">
                Action
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="adventure"
                name="genres"
                value={"Adventure"}
                onChange={handleChange}
                className="input-option"
              />
              <label htmlFor="adventure" className="label-option">
                Adventure
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="fighting"
                name="genres"
                value={"Fighting"}
                onChange={handleChange}
                className="input-option"
              />
              <label htmlFor="fighting" className="label-option">
                Fighting
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="first-person-shooter"
                name="genres"
                value={"First Person Shooter (FPS)"}
                onChange={handleChange}
                className="input-option"
              />
              <label htmlFor="first-person-shooter" className="label-option">
                First Person Shooter (FPS)
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="hack-and-slash"
                name="genres"
                value={"Hack and Slash"}
                onChange={handleChange}
                className="input-option"
              />
              <label htmlFor="hack-and-slash" className="label-option">
                Hack and Slash
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="horror"
                name="genres"
                value={"Horror"}
                onChange={handleChange}
                className="input-option"
              />
              <label htmlFor="horror" className="label-option">
                Horror
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="massively-multiplayer-online"
                name="genres"
                value={"Massively Multiplayer Online (MMO)"}
                onChange={handleChange}
                className="input-option"
              />
              <label
                htmlFor="massively-multiplayer-online"
                className="label-option"
              >
                Massively Multiplayer Online (MMO)
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="park-simualtor"
                name="genres"
                value={"Park simulator"}
                onChange={handleChange}
                className="input-option"
              />
              <label htmlFor="park-simulator" className="label-option">
                Park simulator
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="platformer"
                name="genres"
                value={"Platformer"}
                onChange={handleChange}
                className="input-option"
              />
              <label htmlFor="platformer" className="label-option">
                Platformer
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="puzzle"
                name="genres"
                value={"Puzzle"}
                onChange={handleChange}
                className="input-option"
              />
              <label htmlFor="puzzle" className="label-option">
                Puzzle
              </label>
            </div>
          </div>

          <div>
            <div className="option-container">
              <input
                type="checkbox"
                id="racing"
                name="genres"
                value={"Racing"}
                onChange={handleChange}
                className="input-option"
              />
              <label htmlFor="racing" className="label-option">
                Racing
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="role-playing"
                name="genres"
                value={"Role-Playing (RPG)"}
                onChange={handleChange}
                className="input-option"
              />
              <label htmlFor="role-playing" className="label-option">
                Role Playing (RPG)
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="sandbox"
                name="genres"
                value={"Sandbox"}
                onChange={handleChange}
                className="input-option"
              />
              <label htmlFor="sandbox" className="label-option">
                Sandbox
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="simulation"
                name="genres"
                value={"Simulation"}
                onChange={handleChange}
                className="input-option"
              />
              <label htmlFor="simulation" className="label-option">
                Simulation
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="sports"
                name="genres"
                value={"Sports"}
                onChange={handleChange}
                className="input-option"
              />
              <label htmlFor="sports" className="label-option">
                Sports
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="stealth"
                name="genres"
                value={"Stealth"}
                onChange={handleChange}
                className="input-option"
              />
              <label htmlFor="stealth" className="label-option">
                Stealth
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="strategy"
                name="genres"
                value={"Strategy"}
                onChange={handleChange}
                className="input-option"
              />
              <label htmlFor="strategy" className="label-option">
                Strategy
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="survival"
                name="genres"
                value={"Survival"}
                onChange={handleChange}
                className="input-option"
              />
              <label htmlFor="survival" className="label-option">
                Survival
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="third-person-shooter"
                name="genres"
                value={"Third-Person Shooter (TPS)"}
                onChange={handleChange}
                className="input-option"
              />
              <label htmlFor="third-person-shooter" className="label-option">
                Third-Person Shooter (TPS)
              </label>
            </div>
          </div>
        </fieldset>

        {/* Platforms */}
        <fieldset>
          <legend>Platforms:</legend>
          <div>
            <SiNintendo className="platform-icon" />

            <div className="option-container">
              <input
                type="checkbox"
                id="nintendo-64"
                name="platforms"
                value={"Nintendo 64"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("Nintendo 64")}
              />
              <label htmlFor="nintendo-64" className="label-option">
                Nintendo 64
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="game-boy-color"
                name="platforms"
                value={"Game Boy Color"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("Game Boy Color")}
              />
              <label htmlFor="game-boy-color" className="label-option">
                Game Boy Color
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="game-boy-advance"
                name="platforms"
                value={"Game Boy Advance"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("Game Boy Advance")}
              />
              <label htmlFor="game-boy-advance" className="label-option">
                Game Boy Advance
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="gamecube"
                name="platforms"
                value={"GameCube"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("GameCube")}
              />
              <label htmlFor="gamecube" className="label-option">
                GameCube
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="nintendo-ds"
                name="platforms"
                value={"Nintendo DS"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("Nintendo DS")}
              />
              <label htmlFor="nintendo-ds" className="label-option">
                Nintendo DS
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="nintendo-3ds"
                name="platforms"
                value={"Nintendo 3DS"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("Nintendo 3DS")}
              />
              <label htmlFor="nintendo-3ds" className="label-option">
                Nintendo 3DS
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="wii"
                name="platforms"
                value={"Wii"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("Wii")}
              />
              <label htmlFor="wii" className="label-option">
                Wii
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="wii-u"
                name="platforms"
                value={"Wii U"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("Wii U")}
              />
              <label htmlFor="wii-u" className="label-option">
                Wii U
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="nintendo-switch"
                name="platforms"
                value={"Nintendo Switch"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("Nintendo Switch")}
              />
              <label htmlFor="nintendo-switch" className="label-option">
                Nintendo Switch
              </label>
            </div>
          </div>

          <div>
            <SiPlaystation className="platform-icon" />

            <div className="option-container">
              <input
                type="checkbox"
                id="playstation"
                name="platforms"
                value={"PlayStation"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("PlayStation")}
              />
              <label htmlFor="playstation" className="label-option">
                PlayStation
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="playstation-2"
                name="platforms"
                value={"PlayStation 2"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("PlayStation 2")}
              />
              <label htmlFor="playstation-2" className="label-option">
                PlayStation 2
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="playstation-portable"
                name="platforms"
                value={"PlayStation Portable"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("PlayStation Portable")}
              />
              <label htmlFor="playstation-portable" className="label-option">
                PlayStation Portable
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="playstation-3"
                name="platforms"
                value={"PlayStation 3"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("PlayStation 3")}
              />
              <label htmlFor="playstation-3" className="label-option">
                PlayStation 3
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="playstation-vita"
                name="platforms"
                value={"PlayStation Vita"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("PlayStation Vita")}
              />
              <label htmlFor="playstation-vita" className="label-option">
                PlayStation Vita
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="playstation-4"
                name="platforms"
                value={"PlayStation 4"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("PlayStation 4")}
              />
              <label htmlFor="playstation-4" className="label-option">
                PlayStation 4
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="playstation-5"
                name="platforms"
                value={"PlayStation 5"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("PlayStation 5")}
              />
              <label htmlFor="playstation-5" className="label-option">
                PlayStation 5
              </label>
            </div>
          </div>

          <div>
            <SiXbox className="platform-icon" />

            <div className="option-container">
              <input
                type="checkbox"
                id="xbox"
                name="platforms"
                value={"Xbox"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("Xbox")}
              />
              <label htmlFor="xbox" className="label-option">
                Xbox
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="xbox-360"
                name="platforms"
                value={"Xbox 360"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("Xbox 360")}
              />
              <label htmlFor="xbox-360" className="label-option">
                Xbox 360
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="xbox-one"
                name="platforms"
                value={"Xbox One"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("Xbox One")}
              />
              <label htmlFor="xbox-one" className="label-option">
                Xbox One
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="xbox-series-x-s"
                name="platforms"
                value={"Xbox Series X/S"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("Xbox Series X/S")}
              />
              <label htmlFor="xbox-series-x-s" className="label-option">
                Xbox Series X/S
              </label>
            </div>
          </div>

          <div>
            <p className="platform-icon">PC</p>
            <div className="option-container">
              <input
                type="checkbox"
                id="windows"
                name="platforms"
                value={"Microsoft Windows"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("Microsoft Windows")}
              />
              <label htmlFor="windows" className="label-option">
                Microsoft Windows
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="mac-os"
                name="platforms"
                value={"macOS"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("macOS")}
              />
              <label htmlFor="mac-os" className="label-option">
                macOS
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="linux"
                name="platforms"
                value={"Linux"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("Linux")}
              />
              <label htmlFor="linux" className="label-option">
                Linux
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="google-stadia"
                name="platforms"
                value={"Google Stadia"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("Google Stadia")}
              />
              <label htmlFor="google-stadia" className="label-option">
                Google Stadia
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="amazon-luna"
                name="platforms"
                value={"Amazon Luna"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("Amazon Luna")}
              />
              <label htmlFor="amazon-luna" className="label-option">
                Amazon Luna
              </label>
            </div>
          </div>

          <div>
            <ImMobile className="platform-icon" />

            <div className="option-container">
              <input
                type="checkbox"
                id="android"
                name="platforms"
                value={"Android"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("Android")}
              />
              <label htmlFor="android" className="label-option">
                Android
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="ios"
                name="platforms"
                value={"iOS"}
                onChange={handleChange}
                className="input-option"
                checked={game.platforms.includes("iOS")}
              />
              <label htmlFor="ios" className="label-option">
                iOS
              </label>
            </div>
          </div>
        </fieldset>

        {/* Modes */}
        <fieldset>
          <legend>Modes:</legend>
          <div>
            <div className="option-container">
              <input
                type="checkbox"
                id="single-player"
                name="modes"
                value={"Single-player"}
                onChange={handleChange}
                className="input-option"
                checked={game.modes.includes("Single-player")}
              />
              <label htmlFor="single-player" className="label-option">
                Single-player
              </label>
            </div>

            <div className="option-container">
              <input
                type="checkbox"
                id="multi-player"
                name="modes"
                value={"Multi-player"}
                onChange={handleChange}
                className="input-option"
                checked={game.modes.includes("Multi-player")}
              />
              <label htmlFor="multi-player" className="label-option">
                Multi-player
              </label>
            </div>
          </div>
        </fieldset>

        {/* Rating */}
        <fieldset>
          <legend>Rating:</legend>
          <div>
            <div className="option-container">
              <input
                type="radio"
                id="rating-10"
                name="rating"
                value={10}
                onChange={handleChange}
                className="input-option input-radio"
                checked={game.rating == 10}
              />
              <label htmlFor="rating-10" className="label-option">
                10 - Outstanding
              </label>
            </div>

            <div className="option-container">
              <input
                type="radio"
                id="rating-9"
                name="rating"
                value={9}
                onChange={handleChange}
                className="input-option input-radio"
                checked={game.rating == 9}
              />
              <label htmlFor="rating-9" className="label-option">
                9 - Excellent
              </label>
            </div>

            <div className="option-container">
              <input
                type="radio"
                id="rating-8"
                name="rating"
                value={8}
                onChange={handleChange}
                className="input-option input-radio"
                checked={game.rating == 8}
              />
              <label htmlFor="rating-8" className="label-option">
                8 - Great
              </label>
            </div>

            <div className="option-container">
              <input
                type="radio"
                id="rating-7"
                name="rating"
                value={7}
                onChange={handleChange}
                className="input-option input-radio"
                checked={game.rating == 7}
              />
              <label htmlFor="rating-7" className="label-option">
                7 - Good
              </label>
            </div>

            <div className="option-container">
              <input
                type="radio"
                id="rating-6"
                name="rating"
                value={6}
                onChange={handleChange}
                className="input-option input-radio"
                checked={game.rating == 6}
              />
              <label htmlFor="rating-6" className="label-option">
                6 - Decent
              </label>
            </div>

            <div className="option-container">
              <input
                type="radio"
                id="rating-5"
                name="rating"
                value={5}
                onChange={handleChange}
                className="input-option input-radio"
                checked={game.rating == 5}
              />
              <label htmlFor="rating-5" className="label-option">
                5 - Average
              </label>
            </div>

            <div className="option-container">
              <input
                type="radio"
                id="rating-4"
                name="rating"
                value={4}
                onChange={handleChange}
                className="input-option input-radio"
                checked={game.rating == 4}
              />
              <label htmlFor="rating-4" className="label-option">
                4 - Mediocre
              </label>
            </div>

            <div className="option-container">
              <input
                type="radio"
                id="rating-3"
                name="rating"
                value={3}
                onChange={handleChange}
                className="input-option input-radio"
                checked={game.rating == 3}
              />
              <label htmlFor="rating-3" className="label-option">
                3 - Poor
              </label>
            </div>

            <div className="option-container">
              <input
                type="radio"
                id="rating-2"
                name="rating"
                value={2}
                onChange={handleChange}
                className="input-option input-radio"
                checked={game.rating == 2}
              />
              <label htmlFor="rating-2" className="label-option">
                2 - Terrible
              </label>
            </div>

            <div className="option-container">
              <input
                type="radio"
                id="rating-1"
                name="rating"
                value={1}
                onChange={handleChange}
                className="input-option input-radio"
                checked={game.rating == 1}
              />
              <label htmlFor="rating-1" className="label-option">
                1 - Abysmal
              </label>
            </div>
          </div>
        </fieldset>

        <button type="submit" className="btn">
          <BsPlusCircleFill />
        </button>
      </form>
    </div>
  );
};
