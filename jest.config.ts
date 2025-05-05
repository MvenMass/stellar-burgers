import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',

  // Добавляем маппинг алиасов для Jest
  moduleNameMapper: {
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@ui/(.*)$': '<rootDir>/src/components/ui/$1',
    '^@ui-pages/(.*)$': '<rootDir>/src/components/ui/pages/$1',
    '^@utils-types/(.*)$': '<rootDir>/src/utils/types/$1',
    '^@api$': '<rootDir>/src/utils/burger-api.ts', // путь для @api
    '^@slices/(.*)$': '<rootDir>/src/services/slices/$1',
    '^@selectors/(.*)$': '<rootDir>/src/services/selectors/$1',
    '^@store$': '<rootDir>/src/services/store.ts' // путь для @store
  },

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // сюда можно добавить настройки для ts-jest, если нужно
      }
    ]
  }
};

export default config;
