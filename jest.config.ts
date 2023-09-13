module.exports = {
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
      customExportConditions: ["node", "node-addons"],
    },
    moduleFileExtensions: ['js', 'json', 'ts', 'vue'],
    transform: {
      '^.+\\.js$': 'babel-jest',
      '^.+\\.ts$': 'babel-jest',
      '^.+\\.vue$': '@vue/vue3-jest'
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    },
}
