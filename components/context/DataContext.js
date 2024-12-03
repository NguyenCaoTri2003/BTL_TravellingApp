import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [dataHotel, setDataHotel] = useState({
    beach: [
    {
      id: '1',
      img: require('../../image/hotel-beach-1.png'),
      img_description: require('../../image/resort_1.jpg'),
      title: 'Apartment in Omaha',
      rate: '5.0',
      place: 'Beach',
      location: 'Bali, Omaha',
      continent: 'Europe',
      price: '20',
      description: 'Enjoy a serene stay in this spacious Deluxe room, offering soft neutral tones with blue accents. Perfect for up to two adults and one child, you can choose between a king-size or single bed. This room offers 78 square meters of living space and an en suite bathroom. There are also connecting rooms for added flexibility.',
      // dịch vụ
      facility_1: {
       guest: 1,
       bedroom: 1,
       bed: 1,
       bath: 1,
      },
      facility_2: { // 1: True, 0: False
       wifi: 1,
       kitchen: 1,
       exercise_equipment: 1,
       pool: 1,
       garden: 1,
      },
      cleaning: {
       washer: 1,
       free_dryer: 0,
       iron: 0,
      },
      bathroom:{
       bathtub: 1,
       hair_dryer: 1,
      },
      reviews: [
        {
          reviewer: 'John Doe',
          comment: 'Fantastic experience! Highly recommend.',
          rating: 5,
          avatar: require('../../image/avatar_1.jpg'),
        },
        {
          reviewer: 'Jane Smith',
          comment: 'Nice place but a bit noisy at night.',
          rating: 4,
          avatar: require('../../image/avatar_2.jpg'),
        }
      ]
    },
    {
      id: '2',
      img: require('../../image/hotel-beach-2.png'),
      img_description: require('../../image/resort_beach_2.png'),
      title: 'Apartment in San Jose',
      rate: '5.0',
      place: 'Beach',
      price: '28',
      location: 'Santa, San Jose',
      continent: 'Europe',
      description: 'This luxurious Deluxe room, with its soft neutral tones and calming blue hues, is ideal for up to two adults and one child. The room includes a choice of king-size or single beds and offers 78 square meters of comfort. An en suite bathroom adds to the convenience, with connecting rooms available for larger groups.',
      // dịch vụ
      facility_1: {
       guest: 2,
       bedroom: 1,
       bed: 1,
       bath: 1,
      },
      facility_2: { // 1: True, 0: False
       wifi: 1,
       kitchen: 1,
       exercise_equipment: 1,
       pool: 1,
       garden: 0,
      },
      cleaning: {
       washer: 1,
       free_dryer: 1,
       iron: 0,
      },
      bathroom:{
       bathtub: 1,
       hair_dryer: 1,
      },
      reviews: [
        {
          reviewer: 'John Doe',
          comment: 'Fantastic experience! Highly recommend.',
          rating: 5,
          avatar: require('../../image/avatar_2.jpg'),
        },
        {
          reviewer: 'Jane Smith',
          comment: 'Nice place but a bit noisy at night.',
          rating: 4,
          avatar: require('../../image/avatar_2.jpg'),
        },
        {
          reviewer: 'Wiliam',
          comment: 'Good hotel',
          rating: 4,
          avatar: require('../../image/avatar_2.jpg'),
        }
      ]
    },
    {
      id: '3',
      img: require('../../image/hotel-beach-3.png'),
      img_description: require('../../image/resort_beach_3.jpg'),
      title: 'Apartment in Japan',
      rate: '4.5',
      place: 'Beach',
      location: 'Tokyo, Japan',
      continent: 'Asia',
      price: '15',
      description: 'Relax in a spacious Deluxe room designed for comfort, featuring soft neutral tones and blue hues. Perfect for two adults and one child, you can choose between a king-size or single bed. With 78 square meters of space and an en suite bathroom, this room offers a relaxing and convenient retreat.',
      // dịch vụ
      facility_1: {
       guest: 2,
       bedroom: 1,
       bed: 1,
       bath: 1,
      },
      facility_2: { // 1: True, 0: False
       wifi: 1,
       kitchen: 1,
       exercise_equipment: 0,
       pool: 0,
       garden: 1,
      },
      cleaning: {
       washer: 1,
       free_dryer: 1,
       iron: 0,
      },
      bathroom:{
       bathtub: 1,
       hair_dryer: 1,
      },
      reviews: [
        {
          reviewer: 'John Doe',
          comment: 'Fantastic experience! Highly recommend.',
          rating: 5,
          avatar: require('../../image/avatar_2.jpg'),
        },
        {
          reviewer: 'Jane Smith',
          comment: 'Nice place but a bit noisy at night.',
          rating: 4,
          avatar: require('../../image/avatar_2.jpg'),
        }
      ]
    },
  ],
  mountain: [
    {
      id: '4',
      img: require('../../image/hotel-mountain-1.png'),
      img_description: require('../../image/resort_mountain_1.png'),
      title: 'Cabin in Korean',
      rate: '4.8',
      place: 'Mountain',
      location: 'Gangwon, Korean',
      continent: 'Asia',
      price: '35',
      description: 'This charming cabin provides a cozy and inviting atmosphere, ideal for up to two adults and one child. The Deluxe room offers 78 square meters of living space with soft neutral tones and blue hues. Enjoy an en suite bathroom, and take advantage of the connecting rooms for a larger family experience.',
      // dịch vụ
      facility_1: {
       guest: 2,
       bedroom: 1,
       bed: 1,
       bath: 1,
      },
      facility_2: { // 1: True, 0: False
       wifi: 1,
       kitchen: 1,
       exercise_equipment: 1,
       pool: 1,
       garden: 1,
      },
      cleaning: {
       washer: 1,
       free_dryer: 1,
       iron: 1,
      },
      bathroom:{
       bathtub: 1,
       hair_dryer: 1,
      },
      reviews: [
        {
          reviewer: 'John Doe',
          comment: 'Fantastic experience! Highly recommend.',
          rating: 5,
          avatar: require('../../image/avatar_2.jpg'),
        },
        {
          reviewer: 'Jane Smith',
          comment: 'Nice place but a bit noisy at night.',
          rating: 4,
          avatar: require('../../image/avatar_2.jpg'),
        }
      ]
    },
    {
      id: '5',
      img: require('../../image/hotel-mountain-2.png'),
      img_description: require('../../image/resort_mountain_2.png'),
      title: 'Cabin in Rocky Mountains',
      rate: '4.7',
      place: 'Mountain',
      location: 'Henan, China',
      continent: 'Asia',
      price: '30',
      description: 'Experience the beauty of the Rocky Mountains in this spacious cabin. The Deluxe room is designed for up to two adults and one child, with 78 square meters of living space. Soft neutral tones and blue hues make the space comfortable, and the en suite bathroom ensures your convenience. Connecting rooms are available if needed.',
      // dịch vụ
      facility_1: {
       guest: 2,
       bedroom: 1,
       bed: 1,
       bath: 1,
      },
      facility_2: { // 1: True, 0: False
       wifi: 1,
       kitchen: 1,
       exercise_equipment: 1,
       pool: 1,
       garden: 1,
      },
      cleaning: {
       washer: 1,
       free_dryer: 1,
       iron: 1,
      },
      bathroom:{
       bathtub: 1,
       hair_dryer: 1,
      },
      reviews: [
        {
          reviewer: 'John Doe',
          comment: 'Fantastic experience! Highly recommend.',
          rating: 5,
          avatar: require('../../image/avatar_2.jpg'),
        },
        {
          reviewer: 'Jane Smith',
          comment: 'Nice place but a bit noisy at night.',
          rating: 4,
          avatar: require('../../image/avatar_2.jpg'),
        }
      ]
    }
  ],
  camping: [
    {
      id: '6',
      img: require('../../image/hotel-camping-1.png'),
      img_description: require('../../image/camping_1.png'),
      title: 'Campground in Viet Nam',
      rate: '4.9',
      place: 'Camping',
      location: 'Long An, Viet Nam',
      continent: 'Asia',
      price: '10',
      description: 'Escape to nature with this well-equipped campground. The Deluxe room offers 78 square meters of living space, with a king-size or single bed, and an en suite bathroom. It is perfect for two adults and one child, providing all the comforts needed for a relaxing stay. Connecting rooms are also available for larger groups.',
      // dịch vụ
      facility_1: {
       guest: 2,
       bedroom: 1,
       bed: 1,
       bath: 1,
      },
      facility_2: { // 1: True, 0: False
       wifi: 1,
       kitchen: 1,
       exercise_equipment: 1,
       pool: 1,
       garden: 1,
      },
      cleaning: {
       washer: 1,
       free_dryer: 1,
       iron: 1,
      },
      bathroom:{
       bathtub: 1,
       hair_dryer: 1,
      },
      reviews: [
        {
          reviewer: 'John Doe',
          comment: 'Fantastic experience! Highly recommend.',
          rating: 5,
          avatar: require('../../image/avatar_2.jpg'),
        },
        {
          reviewer: 'Jane Smith',
          comment: 'Nice place but a bit noisy at night.',
          rating: 4,
          avatar: require('../../image/avatar_2.jpg'),
        }
      ]
    },
    {
      id: '7',
      img: require('../../image/hotel-camping-2.png'),
      img_description: require('../../image/camping_2.png'),
      title: 'Campground in Canada',
      rate: '4.8',
      place: 'Camping',
      location: 'Edmonton, Canada',
      continent: 'America',
      price: '12',
      description: 'This spacious campground offers a Deluxe room with soft neutral tones and blue hues, designed for up to two adults and one child. With 78 square meters of living space and an en suite bathroom, it provides a comfortable retreat. You can enjoy the outdoor scenery, and connecting rooms are available for families.',
      // dịch vụ
      facility_1: {
       guest: 2,
       bedroom: 1,
       bed: 1,
       bath: 1,
      },
      facility_2: { // 1: True, 0: False
       wifi: 1,
       kitchen: 1,
       exercise_equipment: 1,
       pool: 1,
       garden: 1,
      },
      cleaning: {
       washer: 1,
       free_dryer: 1,
       iron: 1,
      },
      bathroom:{
       bathtub: 1,
       hair_dryer: 1,
      },
      reviews: [
        {
          reviewer: 'John Doe',
          comment: 'Fantastic experience! Highly recommend.',
          rating: 5,
          avatar: require('../../image/avatar_2.jpg'),
        },
        {
          reviewer: 'Jane Smith',
          comment: 'Nice place but a bit noisy at night.',
          rating: 4,
          avatar: require('../../image/avatar_2.jpg'),
        }
      ]
    }
  ]
  });

  return (
    <DataContext.Provider value={{ dataHotel, setDataHotel, selectedHotel, setSelectedHotel }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataHotel = () => useContext(DataContext);
