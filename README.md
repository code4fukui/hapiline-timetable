# hapiline-timetable

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

> A data processing pipeline and web applications for the Hapiline Fukui train timetable.

## Demo

- [**Departure Countdown**](https://code4fukui.github.io/hapiline-timetable/): A real-time countdown to the next departures between any two stations, including fare information.
- [**Station Map**](https://code4fukui.github.io/hapiline-timetable/map.html): An interactive map showing the location of all Hapiline Fukui stations.

## Features

- **Data Processing Scripts:** A set of Deno scripts to process and enrich timetable data.
  - `make.js`: Compiles partial, manually-entered timetable files into a unified `hapiline-timetable.csv`.
  - `scrapeStation.js`: Scrapes official station information (names, kana, addresses, etc.) from the Hapiline Fukui website.
  - `addPos.js`: Geocodes station addresses to add latitude and longitude coordinates.
- **Reusable Modules:**
  - `HapilineTimetable.js`: A class to query train schedules between stations.
  - `HapilineFare.js`: A class to calculate fares between stations.
- **Unit Tests:** Includes tests for the core data modules (`*.test.js`).

## Data

This project uses a combination of manually entered and scraped data to generate a complete, machine-readable dataset.

1.  **Source Data:**
    - `hapiline-nobori.csv` / `hapiline-kudari.csv`: Manually transcribed upward and downward timetables.
    - `hapiline-station_src.csv`: A list of station pages to be scraped.
    - `hapiline-fare_regular.csv`: The official fare matrix.
2.  **Generated Files:**
    - `hapiline-timetable.csv`: The final, structured timetable for all trains.
    - `hapiline-station.csv`: A complete list of stations with their details and geographic coordinates.

## Getting Started

### Prerequisites

- [Deno](https://deno.land/) runtime is required to run the data processing scripts.

### Generating Data

1.  **Compile the timetable:**
    ```bash
    deno run --allow-read --allow-write make.js
    ```
    This reads `hapiline-nobori.csv` and `hapiline-kudari.csv` and generates `hapiline-timetable.csv`.

2.  **Scrape and geocode station data:**
    ```bash
    # Scrape basic station info from the official website
    deno run --allow-net --allow-read --allow-write scrapeStation.js

    # Add latitude/longitude by geocoding addresses
    deno run --allow-net --allow-read --allow-write addPos.js
    ```
    This generates `hapiline-station.csv` (without coordinates) and `hapiline-station_pos.csv` (with coordinates). For the map and other features to work correctly, replace the original file with the geocoded version:
    ```bash
    # On macOS/Linux
    mv hapiline-station_pos.csv hapiline-station.csv
    ```

### Running the Applications

After generating the data files, simply open the HTML files in your web browser:
- `index.html`: Departure Countdown
- `map.html`: Station Map

## Sources

- [Timetable & Fares | Hapiline Fukui Co., Ltd.](https://www.hapi-line.co.jp/timetable/)
- [Route & Station Information | Hapiline Fukui Co., Ltd.](https://www.hapi-line.co.jp/route/station/)

## License

[MIT](LICENSE)