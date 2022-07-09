function Circle({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 1.156 1.048" height={size} xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M 0.598 0.036 C 0.213 0.036 -0.027 0.453 0.165 0.786 C 0.357 1.119 0.839 1.119 1.031 0.786 C 1.075 0.71 1.098 0.624 1.098 0.536 C 1.098 0.26 0.874 0.036 0.598 0.036 Z"
      />
    </svg>
  )
}

export default Circle
