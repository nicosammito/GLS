// next.config.js

const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = '/'
let basePath = ''

if (isGithubActions) {
    const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')

    assetPrefix = `/${repo}/`
    basePath = `/${repo}`
}

module.exports = {
    assetPrefix: assetPrefix,
    basePath: basePath,
    images: {
        unoptimized: true
    },
    output: 'standalone',
    reactStrictMode: true,
    i18n: {
        locales: ['de_DE', 'en_US'],
        defaultLocale: 'de_DE',
    }
}