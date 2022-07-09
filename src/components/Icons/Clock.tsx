function Clock({ size }: { size: number }) {
  return (
    <svg viewBox="-0.026 -0.014 1.017 1.021" height={size} xmlns="http://www.w3.org/2000/svg">
      <g transform="matrix(0.041636, 0, 0, 0.041636, -0.017038, 0)">
        <path
          fill="currentColor"
          d="M 12 0 C 2.762 0 -3.011 10 1.608 18 C 6.226 26 17.774 26 22.392 18 C 23.446 16.176 24 14.106 24 12 C 23.993 5.376 18.624 0.007 12 0 Z M 12 22 C 4.302 22 -0.509 13.667 3.34 7 C 7.189 0.333 16.811 0.333 20.66 7 C 21.538 8.52 22 10.245 22 12 C 21.994 17.52 17.52 21.994 12 22 Z"
        />
        <path
          fill="currentColor"
          d="M 12 6 C 11.448 6 11 6.448 11 7 L 11 11.325 L 7.629 13.437 C 6.975 13.846 7.008 14.81 7.689 15.172 C 8.006 15.34 8.387 15.327 8.691 15.137 L 12.531 12.737 C 12.826 12.552 13.004 12.227 13 11.879 L 13 7 C 13 6.448 12.552 6 12 6 Z"
        />
      </g>
    </svg>
  )
}

export default Clock