import Face3Icon from '@mui/icons-material/Face3';
import EditIcon from '@mui/icons-material/Edit';

const ProfileDisplayTag = () => {
  return (
    <div className="w-[90%] bg-gradient-to-b from-[#462b9c] to-[#644ab5] h-[100px] rounded-3xl flex items-center justify-between flex-shrink-0">
        <div className='flex gap-3 h-full items-center'>
            <div className="size-[70px] rounded-full bg-white ml-3 flex justify-center items-center border-4 border-black">
                <Face3Icon sx={{fontSize: 40, color: '#321e71'}}/>
            </div>
            <div className='flex flex-col h-full justify-center'>
                <span className='text-sm text-white'>Anuj Parwal</span>
                <span className='text-xs text-[#b9b9b9]'>@username</span>
            </div>
        </div>
        <div className='mr-5'>
            <EditIcon sx={{fontSize: 20, color: 'white'}}/>
        </div>
    </div>
  )
}

export default ProfileDisplayTag
