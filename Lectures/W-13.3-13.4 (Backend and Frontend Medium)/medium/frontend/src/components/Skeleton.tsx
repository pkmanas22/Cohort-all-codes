import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export const BlogCard = () => {

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

export const BlogPage = () => {

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