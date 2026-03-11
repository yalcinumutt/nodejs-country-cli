# Country CLI 🌍

An interactive Command Line Interface (CLI) application for fetching detailed country information using the [ApiCountries](https://www.apicountries.com/) API. Now built with **TypeScript** for better developer experience and reliability.

## Features

-   ✨ **Interactive Mode**: Easy-to-use guided prompts.
-   🔍 **Search**: Find countries by name or capital.
-   Regions 📍: List countries by region (Africa, Americas, Asia, Europe, Oceania).
-   🎨 **Polished UI**: Styled with `picocolors` and formatted with `cli-table3`.
-   ⚡ **TypeScript**: Fully typed and built with modern Node.js standards.

## Installation

```bash
git clone https://github.com/yalcinumutt/nodejs-country-cli.git
cd nodejs-country-cli
npm install
```

## Usage

### Development
To run the CLI in development mode using `tsx`:
```bash
npm run dev -- interactive
```

### Build
To compile the TypeScript source to JavaScript:
```bash
npm run build
```

### Production
After building, you can run the CLI using:
```bash
npm start -- interactive
```
Or use the linked binary:
```bash
npm link
country-cli interactive
```

## Commands

-   `interactive`: Launch interactive mode.
-   `search <name>`: Search for a country by name.
-   `capital <name>`: Search for a country by capital city.
-   `region <name>`: List all countries in a region.
-   `list`: List all countries (Warning: Large output).

## Technologies Used

-   [Node.js](https://nodejs.org/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Commander.js](https://github.com/tj/commander.js)
-   [Clack Prompts](https://github.com/natemoo-re/clack)
-   [Axios](https://github.com/axios/axios)
-   [cli-table3](https://github.com/cli-table/cli-table3)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
