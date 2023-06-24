import _mock from "./_mock";

export const _userCommunity = [...Array(1)].map((_, idx) =>(
    {
        _id: _mock.id(idx),
        name: _mock.address.fullAddress(idx),
        bannerImage: _mock.image.cover(idx)
    }
))   