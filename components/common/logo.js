import Link from 'next/link'

const Logo = () => {
  return (
    <>
      <Link href="/">
        <a>
          <img src="/static/logo-game.png" alt="Logo" />
        </a>
      </Link>

      <style jsx>{`
        img {
          display: block;
          height: 5.2rem;
          width: 5.2rem;

          transition: opacity 0.2s ease-in-out;
        }

        img:hover {
          opacity: 0.8;
        }
      `}</style>
    </>
  )
}

export default Logo
