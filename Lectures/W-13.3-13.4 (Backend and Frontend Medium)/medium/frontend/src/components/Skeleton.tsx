import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';

export const AppBarSkeleton = () => {
    const navigate = useNavigate()
    return (
        <div className='px-6 py-2 flex  justify-between items-center border-b-2 shadow-md'>
            <div
                onClick={() => {
                    navigate('/');
                }}
                className='text-xl font-bold italic cursor-pointer'>
                BlogVista
            </div>
            <div className='flex gap-2 pr-2 items-center'>

                <div className='text-lg font-semibold italic outline outline-2 px-4 rounded-xl outline-slate-400 cursor-pointer hover:bg-slate-100'
                >
                    Write
                </div>
            </div>
        </div>
    )
}

export const CreateCardSkeleton = () => {

    return (
        <div className='w-[80%] mt-5 m-auto grid grid-cols-12'>
            <div className='h-[60vh] col-span-2 border-r-2 flex justify-end'>
                <Skeleton sx={{ right: '0px', display: 'absolute' }} animation="wave" variant="circular" width={50} height={50} />
            </div>
            <div className='col-span-10'>
                <Skeleton sx={{ height: '30px' }} animation="wave" />
                <Skeleton sx={{ height: '70px' }} animation="wave" />
            </div>
        </div>
    )
}

export const BlogCardSkeleton = () => {

    return (
        <>
            <Box sx={{ maxWidth: '100%', margin: 'auto', padding: '20px 10%', display: 'flex', justfiyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ width: '60%', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Skeleton animation="wave" variant="circular" width={30} height={30} />
                    <Skeleton sx={{ width: '60%', height: '30px', display: 'flex' }} animation="wave" />
                </Box>
                <Skeleton sx={{ width: '60%', height: '25px', display: 'flex' }} animation="wave" />
                <Skeleton sx={{ width: '60%', height: '20px', display: 'flex' }} animation="wave" />
                <Box sx={{ width: '60%', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Skeleton sx={{ width: '30%', height: '20px' }} animation="wave" />
                    <Skeleton sx={{ width: '30%', height: '20px' }} animation="wave" />
                </Box>
            </Box>
        </>
    )
}

export const BlogPageSkeleton = () => {

    return (
        <>
            <Box sx={{ maxWidth: 600, margin: 'auto', padding: '20px', display: 'flex', justfiyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Skeleton variant="text" width={300} height={60} animation="wave" />
                <Skeleton variant="text" width={250} height={40} animation="wave" />
                <div className='w-[80%] md:hidden'>
                    <Box sx={{ width: '80%' }}>
                        <Skeleton sx={{ width: '20%', marginTop: '30px' }} animation="wave" />
                        <Skeleton sx={{ width: '40%', }} animation="wave" />
                        <Skeleton sx={{ width: '60%', }} animation="wave" />
                        <Skeleton sx={{ width: '80%', }} animation="wave" />
                    </Box>
                    <hr className='h-2 w-[80%] my-4' />
                    <Box sx={{ width: '80%', display: 'flex', gap: '10px' }}>
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                        <Skeleton sx={{ width: '60%', height: '30px', display: 'flex' }} animation="wave" />
                    </Box>
                </div>
                <div className='w-screen px-[30%] hidden md:grid grid-cols-2 items-center justify-between'>
                    <Box sx={{ width: '80%' }}>
                        <Skeleton sx={{ width: '20%', marginTop: '30px' }} animation="wave" />
                        <Skeleton sx={{ width: '40%', }} animation="wave" />
                        <Skeleton sx={{ width: '60%', }} animation="wave" />
                        <Skeleton sx={{ width: '80%', }} animation="wave" />
                    </Box>
                    <Box sx={{ width: '80%', display: 'flex', gap: '10px' }}>
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                        <Skeleton sx={{ width: '60%', height: '30px', display: 'flex' }} animation="wave" />
                    </Box>
                </div>
            </Box>
        </>
    )
}