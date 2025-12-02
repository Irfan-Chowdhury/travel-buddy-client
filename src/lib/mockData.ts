export const destinations = [{
  id: 1,
  name: 'Bangkok',
  country: 'Thailand',
  image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800',
  activeTravelers: 234
}, {
  id: 2,
  name: 'Paris',
  country: 'France',
  image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
  activeTravelers: 189
}, {
  id: 3,
  name: 'Tokyo',
  country: 'Japan',
  image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
  activeTravelers: 312
}, {
  id: 4,
  name: 'Barcelona',
  country: 'Spain',
  image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
  activeTravelers: 156
}, {
  id: 5,
  name: 'Bali',
  country: 'Indonesia',
  image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
  activeTravelers: 278
}, {
  id: 6,
  name: 'New York',
  country: 'USA',
  image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
  activeTravelers: 201
}];
export const travelCategories = [{
  id: 1,
  name: 'Adventure',
  icon: '🏔️'
}, {
  id: 2,
  name: 'Food',
  icon: '🍜'
}, {
  id: 3,
  name: 'Culture',
  icon: '🎭'
}, {
  id: 4,
  name: 'Solo',
  icon: '🎒'
}, {
  id: 5,
  name: 'Budget',
  icon: '💰'
}, {
  id: 6,
  name: 'Luxury',
  icon: '✨'
}, {
  id: 7,
  name: 'Road Trip',
  icon: '🚗'
}, {
  id: 8,
  name: 'Backpacking',
  icon: '🥾'
}];
export const travelers = [{
  id: 1,
  name: 'Sarah Chen',
  age: 28,
  location: 'San Francisco, USA',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  cover: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200',
  bio: 'Adventure seeker and food enthusiast. Love exploring hidden gems and meeting locals.',
  rating: 4.9,
  reviewCount: 47,
  interests: ['Adventure', 'Food', 'Culture', 'Photography'],
  upcomingTrip: 'Tokyo, Japan',
  visitedCountries: ['USA', 'Japan', 'Thailand', 'France', 'Spain', 'Italy', 'Greece']
}, {
  id: 2,
  name: 'Marcus Johnson',
  age: 32,
  location: 'London, UK',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  cover: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200',
  bio: 'Digital nomad exploring the world one city at a time. Coffee addict and history buff.',
  rating: 4.8,
  reviewCount: 35,
  interests: ['Culture', 'Solo', 'Budget', 'History'],
  upcomingTrip: 'Barcelona, Spain',
  visitedCountries: ['UK', 'Spain', 'Portugal', 'Morocco', 'Egypt']
}, {
  id: 3,
  name: 'Emma Rodriguez',
  age: 26,
  location: 'Barcelona, Spain',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
  bio: 'Beach lover and yoga instructor. Always looking for the next sunset spot.',
  rating: 5.0,
  reviewCount: 52,
  interests: ['Beach', 'Wellness', 'Adventure', 'Food'],
  upcomingTrip: 'Bali, Indonesia',
  visitedCountries: ['Spain', 'Indonesia', 'Thailand', 'Australia', 'New Zealand']
}, {
  id: 4,
  name: 'Alex Kim',
  age: 30,
  location: 'Seoul, South Korea',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
  cover: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200',
  bio: 'Tech enthusiast and street food hunter. Love discovering local markets and hidden cafes.',
  rating: 4.7,
  reviewCount: 29,
  interests: ['Food', 'Culture', 'Photography', 'Technology'],
  upcomingTrip: 'Bangkok, Thailand',
  visitedCountries: ['South Korea', 'Japan', 'Thailand', 'Vietnam', 'Singapore']
}];
export const travelPlans = [{
  id: 1,
  hostId: 1,
  destination: 'Tokyo, Japan',
  country: 'Japan',
  startDate: '2024-06-15',
  endDate: '2024-06-25',
  budget: '$2000-3000',
  travelType: 'Adventure',
  groupSize: 4,
  currentMembers: 2,
  status: 'active',
  image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200',
  description: "Exploring Tokyo's vibrant culture, from ancient temples to modern tech districts. We'll visit Shibuya, Harajuku, and take a day trip to Mount Fuji.",
  itinerary: ['Day 1-2: Shibuya & Harajuku exploration', 'Day 3-4: Traditional temples and gardens', 'Day 5-6: Mount Fuji day trip', 'Day 7-8: Akihabara and tech districts', 'Day 9-10: Food tour and local markets'],
  interests: ['Culture', 'Food', 'Adventure', 'Photography']
}, {
  id: 2,
  hostId: 2,
  destination: 'Barcelona, Spain',
  country: 'Spain',
  startDate: '2024-07-01',
  endDate: '2024-07-10',
  budget: '$1500-2500',
  travelType: 'Culture',
  groupSize: 3,
  currentMembers: 1,
  status: 'active',
  image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200',
  description: "Discover Barcelona's stunning architecture, beaches, and tapas culture. Visit Sagrada Familia, Park Güell, and enjoy the Mediterranean lifestyle.",
  itinerary: ['Day 1-2: Gothic Quarter and Las Ramblas', 'Day 3-4: Gaudí architecture tour', 'Day 5-6: Beach days and seafood', 'Day 7-8: Montjuïc and museums', 'Day 9-10: Day trips to Costa Brava'],
  interests: ['Culture', 'Food', 'Beach', 'Architecture']
}];
export const testimonials = [{
  id: 1,
  name: 'Jessica Lee',
  avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
  rating: 5,
  text: 'Found the perfect travel buddy for my Thailand trip! We had similar interests and the experience was amazing. Highly recommend this platform.',
  location: 'Los Angeles, USA'
}, {
  id: 2,
  name: 'David Martinez',
  avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
  rating: 5,
  text: 'As a solo traveler, this platform gave me confidence to explore new places with like-minded people. Made lifelong friends!',
  location: 'Madrid, Spain'
}, {
  id: 3,
  name: 'Priya Patel',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
  rating: 5,
  text: 'The verification process made me feel safe, and I met incredible people who shared my passion for adventure travel.',
  location: 'Mumbai, India'
}];
export const reviews = [{
  id: 1,
  reviewerId: 2,
  reviewerName: 'Marcus Johnson',
  reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  rating: 5,
  comment: 'Sarah was an amazing travel companion! Very organized and fun to be around. Would definitely travel together again.',
  date: '2024-03-15',
  tripDestination: 'Paris, France'
}, {
  id: 2,
  reviewerId: 3,
  reviewerName: 'Emma Rodriguez',
  reviewerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  rating: 5,
  comment: 'Great energy and always up for adventure. Sarah made the trip unforgettable with her local knowledge and positive attitude.',
  date: '2024-02-20',
  tripDestination: 'Barcelona, Spain'
}];
export const adminStats = {
  totalUsers: 12847,
  activeTrips: 342,
  totalReports: 23,
  newSignups: 156,
  totalReviews: 8934
};
export const adminUsers = [{
  id: 1,
  name: 'Sarah Chen',
  email: 'sarah@example.com',
  status: 'active',
  joinDate: '2023-01-15',
  trips: 12
}, {
  id: 2,
  name: 'Marcus Johnson',
  email: 'marcus@example.com',
  status: 'active',
  joinDate: '2023-02-20',
  trips: 8
}, {
  id: 3,
  name: 'Emma Rodriguez',
  email: 'emma@example.com',
  status: 'active',
  joinDate: '2023-03-10',
  trips: 15
}, {
  id: 4,
  name: 'Alex Kim',
  email: 'alex@example.com',
  status: 'suspended',
  joinDate: '2023-04-05',
  trips: 5
}];