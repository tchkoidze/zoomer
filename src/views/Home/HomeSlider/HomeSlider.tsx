import { useMediaQuery } from 'react-responsive';
import Slider from "react-slick";
import leftArrow from '@src/assets/icons/slider-left-btn.png'
import righrArrow from '@src/assets/icons/slider-right-btn.png'
import img1 from '@src/assets/images/200657ab-e908-44ef-9885-5f61538e6d77_Thumb.png'
import img2 from '@src/assets/images/289d951d-af80-469a-b7c1-98986e9d8a5f_Thumb.png'
import img3 from '@src/assets/images/5557ec49-4355-4839-8a07-4c6bfbb3c802_Thumb.png'
import img4 from '@src/assets/images/5fa86f4b-8f11-43f2-bc69-5f8bb109af34_Thumb.png'
import img5 from '@src/assets/images/80bfcfa9-91a7-4da9-905d-83b74250e530_Thumb.png'


export default function HomeSlider() {

    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const isTab = useMediaQuery({minWidth: 768});
    const isMobile = useMediaQuery({minWidth: 640})

    const sliderImages = [{
            id: '1',
            src: img1
        },
        {
            id: '2',
            src: img2
        },
        {
            id: '3',
            src: img3
        }, 
        {
            id: '4',
            src: img4
        },
        {
            id: '5',
            src: img5
        }
    ];

    function SampleNextArrow(props:any) {
        const { className, style, onClick } = props;
        return (
          <img
            className={className}
            style={{ ...style, display: "block", width:'50px', height: '50px', position:'absolute', top: '50%', right: '10px', zIndex: 1, boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 10px', borderRadius: '50%' }}
            onClick={onClick}
            src={righrArrow}
          />
        );
      }
      
      function SamplePrevArrow(props:any) {
        const { className, style, onClick } = props;
        return (
          <img
            className={className}
            style={{ ...style, display: "block", width:'50px', height: '50px', position:'absolute', top: '50%', left: '10px', zIndex: 1, boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 10px', borderRadius: '50%'  }}
            onClick={onClick}
            src={leftArrow}
          />
        );
      }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: isDesktop ? 1 : isTab ? 3 : isMobile ? 2 : 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        arrows: isDesktop ? true : false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
      };

    return (
        <div className='w-full lg:w-[750px] xl:w-[850px] lg:ml-auto relative'>
            <Slider {...settings}>
                  {sliderImages.map(slidImg => {
                    return <img key={slidImg.id} src={slidImg.src} alt='home slider img' className='max-h-[200px] lg:max-h-full sm:min-h-[140px] max-w-full sm:max-w-[290px] md:max-w-[240px] lg:max-w-[750px] xl:max-w-full rounded-xl'/>
                  })}
              </Slider>
        </div>
    )
}
