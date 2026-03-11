import pc from 'picocolors';
import Table from 'cli-table3';
import { intro, outro, spinner, select, text as promptText, note } from '@clack/prompts';
import { Country } from './types.js';

export const showIntro = () => {
  intro(pc.bgCyan(pc.black(' Country CLI ')));
};

export const showOutro = (message?: string) => {
  outro(pc.cyan(message || 'Goodbye!'));
};

export const createSpinner = () => {
  return spinner();
};

export const formatCountryTable = (countries: Country | Country[]) => {
  const table = new Table({
    head: [
      pc.bold('Name'),
      pc.bold('Capital'),
      pc.bold('Region'),
      pc.bold('Population'),
      pc.bold('Native Name')
    ],
    colWidths: [25, 20, 15, 15, 25]
  });

  const list = Array.isArray(countries) ? countries : [countries];

  list.forEach(country => {
    table.push([
      country.name || 'N/A',
      country.capital || 'N/A',
      country.region || 'N/A',
      country.population?.toLocaleString() || 'N/A',
      country.nativeName || 'N/A'
    ]);
  });

  return table.toString();
};

export const formatDetailedCountry = (country: Country) => {
  const info = [
    `${pc.bold('Name:')} ${country.name}`,
    `${pc.bold('Native Name:')} ${country.nativeName}`,
    `${pc.bold('Capital:')} ${country.capital}`,
    `${pc.bold('Region:')} ${country.region}`,
    `${pc.bold('Subregion:')} ${country.subregion}`,
    `${pc.bold('Population:')} ${country.population?.toLocaleString()}`,
    `${pc.bold('Area:')} ${country.area?.toLocaleString()} sq km`,
    `${pc.bold('Calling Codes:')} ${country.callingCodes?.join(', ')}`,
    `${pc.bold('Timezones:')} ${country.timezones?.join(', ')}`,
    `${pc.bold('Currencies:')} ${country.currencies?.map(c => `${c.name} (${c.symbol})`).join(', ')}`,
    `${pc.bold('Languages:')} ${country.languages?.map(l => l.name).join(', ')}`,
    `${pc.bold('Alpha-2 Code:')} ${country.alpha2Code}`,
    `${pc.bold('Alpha-3 Code:')} ${country.alpha3Code}`,
    `${pc.bold('Flag:')} ${country.flags?.png}`
  ].join('\n');

  note(info, `Country Details: ${country.name}`);
};

export const interactiveMode = async (api: any) => {
  while (true) {
    const action = await select({
      message: 'Choose an action:',
      options: [
        { value: 'search_name', label: 'Search by Name' },
        { value: 'search_capital', label: 'Search by Capital' },
        { value: 'list_region', label: 'List by Region' },
        { value: 'exit', label: 'Exit' },
      ],
    });

    if (action === 'exit' || typeof action === 'symbol') break;

    if (action === 'search_name') {
      const name = await promptText({
        message: 'Enter country name:',
        placeholder: 'e.g. Turkey',
        validate: (value) => {
          if (!value) return 'Please enter a name';
        }
      });

      if (typeof name === 'symbol') continue;

      const s = createSpinner();
      s.start('Fetching country data...');
      try {
        const country = await api.getCountryByName(name);
        s.stop('Fetch complete');
        if (country) {
          formatDetailedCountry(Array.isArray(country) ? country[0] : country);
        } else {
          outro(pc.red('Country not found.'));
        }
      } catch (e: any) {
        s.stop('Error');
        outro(pc.red(e.message));
      }
    }

    if (action === 'search_capital') {
      const capital = await promptText({
        message: 'Enter capital name:',
        placeholder: 'e.g. Ankara',
        validate: (value) => {
          if (!value) return 'Please enter a capital name';
        }
      });

      if (typeof capital === 'symbol') continue;

      const s = createSpinner();
      s.start('Fetching country data...');
      try {
        const country = await api.getCountryByCapital(capital);
        s.stop('Fetch complete');
        if (country) {
          formatDetailedCountry(Array.isArray(country) ? country[0] : country);
        } else {
          outro(pc.red('Capital not found.'));
        }
      } catch (e: any) {
        s.stop('Error');
        outro(pc.red(e.message));
      }
    }

    if (action === 'list_region') {
      const region = await select({
        message: 'Choose a region:',
        options: [
          { value: 'Africa', label: 'Africa' },
          { value: 'Americas', label: 'Americas' },
          { value: 'Asia', label: 'Asia' },
          { value: 'Europe', label: 'Europe' },
          { value: 'Oceania', label: 'Oceania' },
        ],
      }) as string;

      if (typeof region === 'symbol') continue;

      const s = createSpinner();
      s.start(`Fetching countries in ${region}...`);
      try {
        const countries = await api.getCountriesByRegion(region);
        s.stop('Fetch complete');
        console.log(formatCountryTable(countries));
      } catch (e: any) {
        s.stop('Error');
        outro(pc.red(e.message));
      }
    }
  }
};
