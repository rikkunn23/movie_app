import AppLayout from '@/components/Layouts/AppLayout'
import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


const home = () => {
  // ステートの管理
  const[movies,setMovies] = useState([]);


  useEffect(() => {
    const fetchMovies = async() => {
      try {
        const response = await axios.get('api/getPopularMovies');
        // console.log(response.data.results);
        // response.data.resultsはコンソールログで確認できる
        // moviesの中に下の関数が入る
        setMovies(response.data.results);
        console.log(movies);
      }catch(err){
        console.log(err)
      }
    }
    fetchMovies();
  },[])

return (
  <AppLayout
    header={
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          home
      </h2>
    }>
  <Head>
    <title>home</title>
  </Head>

  <Swiper
      // 画像同士の余白
      spaceBetween={30}
      //画面に表示される画面の数
      slidesPerView={5}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      // レスポンシブ対応
      breakpoints={{
        // 320px以上の画像サイズの場合
        320:{
            slidesPerView: 1,
            spaceBetween: 10,
        },
        // 320px以上の画像サイズの場合
        480:{
          slidesPerView: 3,
          spaceBetween: 20,
      },
        // 640px以上の画像サイズの場合
        640:{
          slidesPerView: 4,
          spaceBetween: 30,
      },
        // 768px以上の画像サイズの場合
        768:{
          slidesPerView: 5,
          spaceBetween: 40,
      },
      }}
    >

      {/* /* JSのデータを入れるときは{}になる  poster_pathはcomponentsの中に書いてある*/ }
      {movies.map((movie) =>(
        // ユニークなキーを指定してあげる必要がある(movieIDは作品の🆔のこと)
        <SwiperSlide key={movie.id}>
          {/* クリックでアニメーションがつく */}
          <CardActionArea>
            <CardMedia
              components={'img'}
              // styleみたいなもん
              sx={{
                aspectRatio:'2/3',
              }}
              image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              >
            </CardMedia>
          </CardActionArea>
          {/* Pタグのようなもの */}
          <Typography>
            公開日:{movie.release_date}
          </Typography>
          {/* <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}/> */}
        </SwiperSlide>
      ))}
    </Swiper>


  </AppLayout>
)
}

export default home
