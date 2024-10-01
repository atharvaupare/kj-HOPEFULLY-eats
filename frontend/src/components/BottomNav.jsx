import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const BottomNav = () => {
  return (
    <div className="bg-white w-screen h-[75px] flex justify-evenly items-center fixed bottom-0">
      <div>
        <HomeIcon sx={{fontSize: 34, color: "#462B9C"}}/>
      </div>
      <div>
        <SearchIcon sx={{fontSize: 34, color: "#9D9C9C"}}/>
      </div>
      <div>
        <ShoppingCartOutlinedIcon sx={{fontSize: 30, color: '#9D9C9C'}}/>
      </div>
      <div>
        <PersonOutlinedIcon sx={{fontSize: 34, color: "#9D9C9C"}}/>
      </div>
    </div>
  );
};

export default BottomNav;
