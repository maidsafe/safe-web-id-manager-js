module.exports = {
    browser : true,
    verbose                : true,
    moduleFileExtensions   : ['js', 'jsx', 'json'],
    setupFiles   : ['raf/polyfill','<rootDir>/__tests__/setupTests.js'],
    testPathIgnorePatterns : ['node_modules', '__tests__/setupTests.js'],
    moduleDirectories      : ['src', '__tests__', 'node_modules'],
    transformIgnorePatterns : ['/node_modules\/(?!antd\/dist)/'],
    moduleNameMapper       : {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$' :
        '<rootDir>/mocks/fileMock.js',
        '\\.(css|scss)$' : '<rootDir>/__mocks__/fileMock.js',

        '^@actions(.*)$'    : '<rootDir>/src/actions$1',
        '^@components(.*)$' : '<rootDir>/src/components$1',
        '^@containers(.*)$' : '<rootDir>/src/containers$1',
        '^@reducers(.*)$'   : '<rootDir>/src/reducers$1',
        '^@utils(.*)$'      : '<rootDir>/app/utils$1'
    }
};
