#!/usr/bin/env node

import { Command } from 'commander';
import pc from 'picocolors';
import * as api from './api.js';
import * as ui from './ui.js';

const program = new Command();

program
  .name('country-cli')
  .description('A Node.js CLI application to fetch country information from ApiCountries')
  .version('1.0.0');

program
  .command('interactive')
  .description('Launch interactive mode')
  .action(async () => {
    ui.showIntro();
    await ui.interactiveMode(api);
    ui.showOutro();
  });

program
  .command('search <name>')
  .description('Search for a country by name')
  .action(async (name) => {
    const s = ui.createSpinner();
    s.start(`Searching for "${name}"...`);
    try {
      const country = await api.getCountryByName(name);
      s.stop('Search complete');
      if (country) {
        ui.formatDetailedCountry(Array.isArray(country) ? country[0] : country);
      } else {
        console.log(pc.red('\nCountry not found.'));
      }
    } catch (error) {
      s.stop('Error');
      console.error(pc.red(`\n${error.message}`));
    }
  });

program
  .command('capital <name>')
  .description('Search for a country by its capital')
  .action(async (name) => {
    const s = ui.createSpinner();
    s.start(`Searching for capital "${name}"...`);
    try {
      const country = await api.getCountryByCapital(name);
      s.stop('Search complete');
      if (country) {
        ui.formatDetailedCountry(Array.isArray(country) ? country[0] : country);
      } else {
        console.log(pc.red('\nCapital not found.'));
      }
    } catch (error) {
      s.stop('Error');
      console.error(pc.red(`\n${error.message}`));
    }
  });

program
  .command('region <name>')
  .description('List countries in a specific region (Africa, Americas, Asia, Europe, Oceania)')
  .action(async (name) => {
    const s = ui.createSpinner();
    s.start(`Fetching countries in region "${name}"...`);
    try {
      const countries = await api.getCountriesByRegion(name);
      s.stop('Fetch complete');
      console.log('\n' + ui.formatCountryTable(countries));
    } catch (error) {
      s.stop('Error');
      console.error(pc.red(`\n${error.message}`));
    }
  });

program
  .command('list')
  .description('List all countries (Warning: Large output)')
  .action(async () => {
    const s = ui.createSpinner();
    s.start('Fetching all countries...');
    try {
      const countries = await api.getCountries();
      s.stop('Fetch complete');
      console.log('\n' + ui.formatCountryTable(countries));
    } catch (error) {
      s.stop('Error');
      console.error(pc.red(`\n${error.message}`));
    }
  });

// Default to help if no arguments provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
} else {
  program.parse(process.argv);
}
