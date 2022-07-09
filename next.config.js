module.exports = () => {
  webpack: (config) => {
    config.plugins = config.plugins || []

    config.optimization.providedExports = true

    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "./")
    }
  }

  const rewrites = () => {
    return [
      {
        source: "/v1",
        destination: "http://localhost:4000" // The :path parameter isn't used here so will be automatically passed in the query
      }
    ]
  }
  return {
    rewrites
  }
}
