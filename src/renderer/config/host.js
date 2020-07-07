let hostUrl = ''
const env = process.env.NODE_ENV
if (env === 'production') {
  hostUrl = ''
} else {
  hostUrl = ''
}

export default hostUrl
