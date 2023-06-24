import { randomNumberRange } from "./funcs";
import _mock from "./_mock";

export const _feedTopTopics = [...Array(8)].map((_,idx) =>({
    _id: _mock.id(idx),
    name: _mock.name.firstName(idx),
    postCount: randomNumberRange(idx+50, idx+100),
    community: _mock.boolean(idx+3)
}))