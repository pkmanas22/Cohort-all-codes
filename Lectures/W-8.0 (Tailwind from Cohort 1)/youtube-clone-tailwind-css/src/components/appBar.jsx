import SearchBar from '@/components/searchBar'
import Profile from '@/components/profile'
import Logo from '@/components/logo'

export const AppBar = () => {

    return <div className="flex justify-between m-4">
        <div>
            <Logo />
        </div>
        <div>
            <SearchBar />
        </div>
        <div>
            <Profile />
        </div>
    </div>
}