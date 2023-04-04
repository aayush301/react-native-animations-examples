import { View, Text } from "react-native";
import React from "react";
import Carousel from "./Carousel";

const carouselImages = [
  {
    src: "https://images.unsplash.com/photo-1610878180933-123728745d22?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuYWRhJTIwbmF0dXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    title: "First slide title",
    description: "this is the first slide",
  },
  {
    src: "https://cdn.pixabay.com/photo/2018/02/09/10/10/flower-3141276_960_720.jpg",
    title: "Second slide title",
    description: "this is the second slide",
  },
  {
    src: "https://image.shutterstock.com/image-photo/3d-wallpaper-design-waterfall-sea-260nw-1380925703.jpg",
    title: "Third slide title",
    description: "this is the third slide",
  },
];

const CarouselApp = () => {
  return (
    <View>
      <View style={{ marginTop: 100 }}></View>
      <Carousel images={carouselImages} />
    </View>
  );
};

export default CarouselApp;
