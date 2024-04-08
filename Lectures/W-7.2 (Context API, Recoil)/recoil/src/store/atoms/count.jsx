import { atom, selector } from "recoil";

export const countAtom = atom({
    key: "countAtom", // unique value for the atom
    default: 0,
});

// selector in recoil
export const evenSelector = selector({
    key: "evenSelector",
    get: ({get}) => {
        const count = get(countAtom)
        return count % 2;
    }
})