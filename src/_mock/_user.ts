import { randomNumber } from "./funcs";
import _mock from "./_mock";

export const _feedTopUsers = [...Array(5)].map((_, idx) =>({
    _id: _mock.id(idx),
    photo: _mock.image.avatar(idx),
    name: _mock.name.fullName(idx),
    likes: randomNumber(idx)
}))