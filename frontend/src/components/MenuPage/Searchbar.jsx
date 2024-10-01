import SearchIcon from '@mui/icons-material/Search';

const Searchbar = () => {
  return (
    <div className='w-[90%] h-[50px] p-3 rounded-3xl bg-[#EFEEEE] flex gap-3 text-xl items-center'>
        <SearchIcon sx={{fontSize: 20}}/>
        <input type="text" placeholder="Search" className='bg-[#EFEEEE]'/>
    </div>
  )
}

export default Searchbar
