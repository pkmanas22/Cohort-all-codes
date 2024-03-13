import { atom, selector } from "recoil";

export const profileAtom = atom({
    key: 'profileAtom',
    default: [{
        profileUrl: 'https://magiccard.odisha.gov.in/images/nua-o.png',
        name: 'Manas K Pradhan',
        age: 24,
        address: 'Odisha, India',
        followers: '60k',
        likes: '103k',
        photos: '1.5k',
    }],
})