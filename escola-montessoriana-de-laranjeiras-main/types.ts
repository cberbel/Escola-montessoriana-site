import React from 'react';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image?: string;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface VideoReel {
  id: number;
  title: string;
  category: string;
  thumbnailUrl: string;
  duration: string;
  videoUrl?: string;
}