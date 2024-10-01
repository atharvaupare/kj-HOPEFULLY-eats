import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  return (
    <div className='w-screen flex justify-between p-5'>
        <div className='text-4xl font-semibold'>Menu</div>
      <AccountCircleIcon color='black' sx={{ fontSize: 55,
         color: "#462b9c"}}/>
    </div>
  )
}

export default Header
