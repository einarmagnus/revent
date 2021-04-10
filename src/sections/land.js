/** @jsx jsx */
import { rgba } from 'polished';
import { useState, useRef, useEffect } from 'react';
import { jsx, Box, Container, Image, Heading, Text, Button } from 'theme-ui';
import SectionHeading from 'components/section-heading';
import Progressbar from 'components/progressbar';
import Feature from 'components/cards/feature';
import expand from 'assets/images/icons/expand.png';
import users from 'assets/images/icons/users.png';
import wifi from 'assets/images/icons/wifi.png';
import slider1 from 'assets/images/features/1.jpg';
import slider2 from 'assets/images/features/2.jpg';
import slider3 from 'assets/images/features/3.jpg';

import SwiperCore, { Autoplay, Pagination, EffectFade } from 'swiper';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

SwiperCore.use([Autoplay, Pagination, EffectFade]);

const data = {
  feature: [
    {
      id: 1,
      icon: expand,
      title: '42 ha',
      description: `It's huge! There is an almost endless space for new buildings, projects, and, of course, Borderland`,
    },
    {
      id: 2,
      icon: users,
      title: 'Friendly municipality',
      description: `We won't have to worry about local government's support`,
    },
    {
      id: 3,
      icon: wifi,
      title: '100 mbps',
      description: 'Direct connection to god. Miracles guaranteed.',
    },
    {
      id: 4,
      icon: wifi,
      title: '100 mbps',
      description: 'Direct connection to god. Miracles guaranteed.',
    },
    {
      id: 5,
      icon: wifi,
      title: '100 mbps',
      description: 'Direct connection to god. Miracles guaranteed.',
    },
    {
      id: 6,
      icon: wifi,
      title: '100 mbps',
      description: 'Direct connection to god. Miracles guaranteed.',
    },
  ],
  gallery: [
    {
      id: 1,
      image: slider1,
      title: 'Field',
      desc: 'About the field',
    },
    {
      id: 2,
      image: slider2,
      title: 'Shelter',
      desc: 'About the shelter',
    },
    {
      id: 3,
      image: slider3,
      title: 'Quary',
      desc: 'About the quary',
    },
  ],
};

const FeaturedSpace = () => {
  const isPause = useRef(false);
  const swiperRef = useRef(null);
  const [togglePlay, setTogglePlay] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(0);

  let time = 3;
  let tick, percentTime;

  function startProgressbar() {
    resetProgressbar();
    percentTime = 0;
    tick = setInterval(interval, 10);
  }

  function interval() {
    if (isPause.current === false) {
      percentTime += 1 / (time + 0.1);
      setCurrentWidth(percentTime);
      if (percentTime >= 100) {
        swiperRef.current && swiperRef.current.swiper.slideNext();
        startProgressbar();
      }
    }
  }

  function resetProgressbar() {
    setCurrentWidth(0);
    clearTimeout(tick);
  }

  useEffect(() => {
    startProgressbar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = () => {
    isPause.current = !isPause.current;
    setTogglePlay((prev) => !prev);
  };

  return (
    <Box id='land' as='section' sx={styles.section}>
      <Container>
        <Box sx={styles.contentWrapper}>
          <Box sx={styles.leftContent}>
            <SectionHeading
              sx={styles.heading}
              title='We found a perfect land in Sweden and we need your help!'
              description='We started a crowdfunding campaign and invite you to help us. Your donation will magically turn into a membership an grant you all the priviliges to co-create this beautiful dream with us'
            >
              <Button variant='primaryMd'>I want to help</Button>
            </SectionHeading>
            <Box sx={styles.featureWrapper}>
              {data?.feature?.map((feature) => (
                <Feature key={feature.id} data={feature} />
              ))}
            </Box>
          </Box>
          <Box sx={styles.rightContent}>
            <Progressbar
              sx={styles.progressbar}
              togglePlay={togglePlay}
              handleClick={handleToggle}
              currentWidth={currentWidth}
            />
            <Swiper loop={true} effect='fade' ref={swiperRef} spaceBetween={0} slidesPerView={1} pagination={true}>
              {data?.gallery?.map((item) => (
                <SwiperSlide key={item.id}>
                  <Box as='figure' sx={styles.image}>
                    <Image loading='lazy' src={item.image} alt='' />
                    <Box as='figcaption'>
                      <Box>
                        <Heading as='h4'>{item.title}</Heading>
                        <Text as='p'>{item.desc}</Text>
                      </Box>
                    </Box>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedSpace;

const styles = {
  section: {
    pt: [30, null, null, null, 60],
    pb: [30, null, null, 50, 60],
  },
  contentWrapper: {
    gap: [0, 0, 0, 0, '30px'],
    display: ['flex', null, null, null, 'grid'],
    alignItems: 'center',
    flexDirection: ['column', null, null, null, null],
    gridTemplateColumns: ['unset', null, null, null, 'repeat(2,1fr)'],
  },
  leftContent: {
    m: [0, '30px 0px 0', '30px 50px 0', 0],
  },
  heading: {
    textAlign: ['center', null, null, null, 'left'],
    maxWidth: 490,
    margin: ['0 auto 40px', null, null, null, '0 0 80px'],
    h2: {
      fontSize: [22, null, null, 30, 30, 36, 46],
      lineHeight: [1.6, null, null, 1.41],
      fontWeight: [500, null, null, 400],
    },
    p: {
      fontSize: ['15px', null, null, '17px'],
      mt: [3, 3, 3, 5],
    },
  },
  featureWrapper: {
    gap: ['40px 20px', null, null, null, '30px'],
    display: 'grid',
    gridTemplateColumns: ['repeat(2,1fr)', null, null, 'repeat(3,180px)', 'repeat(3,1fr)'],
    justifyContent: ['unset', null, null, 'center', 'flex-start'],
  },
  rightContent: {
    position: 'relative',
    mt: [6, 6, 6, 6, 0],
    maxWidth: '100%',
    '.swiper-pagination-bullets': {
      bottom: 20,
    },
    '.swiper-pagination-bullet': {
      backgroundColor: 'rgba(255,255,255,0.5)',
      width: 10,
      height: 10,
      opacity: 1,
      mx: 5,
      ':focus': {
        outline: 0,
      },
    },
    '.swiper-pagination-bullet-active': {
      backgroundColor: 'rgba(255,255,255,1)',
    },
  },
  progressbar: {
    position: 'absolute',
    left: [15, 25],
    top: [46, 53],
    zIndex: 2,
  },
  progressBar: {
    position: 'relative',
    mr: 4,
  },
  toggleButton: {
    backgroundColor: 'transparent',
    border: 0,
    cursor: 'pointer',
    display: 'flex',
    padding: 0,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    '&:focus': {
      outline: '0 none',
    },
  },
  image: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    '> img': {
      borderRadius: 10,
    },
    figcaption: {
      backgroundColor: 'primary',
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      left: 0,
      top: 30,
      borderRadius: 5,
      color: '#fff',
      padding: ['20px 20px 20px 80px', '25px 25px 25px 90px'],
      h4: {
        lineHeight: 1,
        fontWeight: 'bold',
        fontSize: [14, 18],
        letterSpacing: 'heading',
      },
      p: {
        fontSize: [13, 16],
        fontWeight: 500,
        letterSpacing: 'heading',
        color: rgba('#fff', 0.6),
        marginTop: [2],
      },
    },
  },
};