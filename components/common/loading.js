const Loading = () => {
  return (
    <>
      <div className="loader"></div>

      <style jsx>{`
        .loader {
          display: block;
          width: 2.8rem;
          height: 2.8rem;

          border: 3px solid var(--color-primary-rgba);
          border-left-color: var(--color-primary);
          border-radius: 50%;
          background: transparent;

          animation-name: rotate;
          animation-iteration-count: infinite;
          animation-duration: 0.8s;
          animation-timing-function: linear;
        }

        @keyframes rotate {
          from {
            transform: rotate(0);
          }

          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  )
}

export default Loading
