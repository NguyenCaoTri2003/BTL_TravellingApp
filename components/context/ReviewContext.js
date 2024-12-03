import React, { createContext, useState } from 'react';

// Tạo context
export const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      full_name: 'Jinny Oslin',
      avatar: require('../../image/avatar_1.jpg'),
      assessment_date: 'One day ago',
      rate: 5,
      comment: 'The best apartment I have ever booked. Spacious, clean, Scandinavian design. Excellent location. Astonishing views to the port. Comfortable beds. Feeling like home. It is better than the pictures showing',
    },
    {
      id: 2,
      full_name: 'Marina John',
      avatar: require('../../image/avatar_2.jpg'),
      assessment_date: 'One day ago',
      rate: 4,
      comment: 'The best apartment I have ever booked. Spacious, clean, Scandinavian design. Excellent location. Astonishing views to the port. Comfortable beds. Feeling like home. It is better than the pictures showing',
    },
  ]);

  return (
    <ReviewsContext.Provider value={{ reviews, setReviews }}>
      {children}
    </ReviewsContext.Provider>
  );
};
