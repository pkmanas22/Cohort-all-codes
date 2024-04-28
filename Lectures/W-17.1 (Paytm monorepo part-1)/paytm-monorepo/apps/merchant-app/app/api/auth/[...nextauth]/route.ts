import nextAuth from 'next-auth';
import { authOptions } from '../../../lib/auth';

const handler = nextAuth(authOptions);

export {
    handler as GET,
    handler as POST
}