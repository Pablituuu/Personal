function Points({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={size}>
      <circle fill="currentColor" cx="12" cy="2" r="2" />
      <circle fill="currentColor" cx="12" cy="12" r="2" />
      <circle fill="currentColor" cx="12" cy="22" r="2" />
    </svg>
  )
}

export default Points
