import Searchbar from '@/components/searchbar'
import Logo from '@/components/common/logo'

const Header = () => {
  return (
    <>
      <header>
        <Logo />
        <Searchbar />
      </header>

      <style jsx>{`
        header {
          display: flex;
          align-items: center;
          height: 14rem;
          gap: 6rem;
        }
      `}</style>
    </>
  )
}

export default Header
