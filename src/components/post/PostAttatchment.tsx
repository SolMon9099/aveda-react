import { Box, Card, Container, Stack } from "@mui/material";
import { useRef, useState } from "react";
import Slider from "react-slick";
import { feedPostAttachmentType } from "src/@types/feed"
import { CarouselArrowIndex } from "../carousel";
import Image from "../Image";
import LightboxModal from "../LightboxModal";

type Props = {
    attatchments: feedPostAttachmentType[]
}

export default function PostAttatchment({ attatchments }: Props) {
    const images = attatchments.filter((att) => att.attachmentType === 'image')
    const videos = attatchments.filter((att) => att.attachmentType === 'link')
    const [openLightbox, setOpenLightbox] = useState(false);
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const carouselRef = useRef<Slider | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const settings = {
        dots: false,
        arrows: false,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        rtl: false,
        beforeChange: (current: number, next: number) => setCurrentIndex(next),
    };

    const handleOpenLightbox = (url: string) => {
        const selectedImage = images.findIndex((att) => att.url === url);
        setOpenLightbox(true);
        setSelectedImage(selectedImage);
    };

    const handlePrevious = () => {
        carouselRef.current?.slickPrev();
    };

    const handleNext = () => {
        carouselRef.current?.slickNext();
    };

    const getYoutubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return (match && match[2].length === 11) ? match[2] : false;
    }

    return (
        <Stack spacing={0} alignItems='stretch' >
            {images.length > 0 &&
                <Container>
                    <Card>
                        <Slider ref={carouselRef} {...settings}>
                            {images.map((item) => (
                                <CarouselItem key={item._id} url={item.url} onClick={() => handleOpenLightbox(item.url)} />
                            ))}
                        </Slider>

                        <CarouselArrowIndex
                            index={currentIndex}
                            total={images.length}
                            onNext={handleNext}
                            onPrevious={handlePrevious}
                        />

                        <LightboxModal
                            images={images.map((img) => img.url)}
                            mainSrc={images.map((img) => img.url)[selectedImage]}
                            photoIndex={selectedImage}
                            setPhotoIndex={setSelectedImage}
                            isOpen={openLightbox}
                            onCloseRequest={() => setOpenLightbox(false)}
                        />
                    </Card>
                </Container>
            }
            {videos.length > 0 &&
                videos.map((video: feedPostAttachmentType, index: number) => {
                    let videoId = getYoutubeId(video.url);
                    const url = `https://youtube.com/embed/${videoId}`;
                    return <Box key={index} flexGrow={1} display='flex' width='100%' sx={{ borderRadius: '10px', overflow: 'hidden' }}>
                        <iframe
                            src={url}
                            frameBorder='0'
                            allow='autoplay; encrypted-media; full-screen'
                            allowFullScreen
                            title='video'
                            height={'350px'}
                            width={'100%'}
                        />
                    </Box>
                })
            }
        </Stack>
    );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
    url: string,
    onClick: () => void
};

function CarouselItem({ url, onClick } : CarouselItemProps ) {
    return <Image 
        onClick={(e) => { e.stopPropagation(); onClick() }} 
        alt={url} 
        src={url} 
        sx={{ objectFit: 'contain'}}
        ratio='1/1' 
    />;
}