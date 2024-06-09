import React, { useState } from "react";
import { Input } from "antd";
import Header from "./header";
import ImageComponent from "./ImageComponent";
const { Search } = Input;

export default function Home() {
  const [thumbnailUrls, setThumbnailUrls] = useState([]);

  function getYouTubeVideoId(url) {
    // Regular expression to find YouTube video ID
    var regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    // Execute regular expression to get the video ID
    var match = url.match(regExp);

    // If match found, return the video ID
    if (match && match[1]) {
      return match[1];
    } else {
      // If no match found, return null or handle as needed
      return null;
    }
  }
  const getThumbnail = (youtubeUrl) => {
    let videoId = getYouTubeVideoId(youtubeUrl);
    let temp = [
      `https://i1.ytimg.com/vi/${videoId}/default.jpg`,
      `https://i1.ytimg.com/vi/${videoId}/mqdefault.jpg`,
      `https://i1.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      ` https://i1.ytimg.com/vi/${videoId}/sddefault.jpg`,
    ];
    setThumbnailUrls(temp);
  };

  return (
    <div >
      <Header />
      <div
        style={{
          width: "100vw",
          height: "100%",
        }}
      >
        <div
          style={{
            borderRadius: "6px",
            display: "flex",
            width: "100vw",
            height: "45vh",
            justifyContent: "center",
            alignItems: "end",
          }}
        >
          <Search
            style={{ width: "40vw" }}
            placeholder="Enter Youtube Url here"
            loading={false}
            enterButton="Get Thumbnail"
            size="large"
            onSearch={(value) => {
              getThumbnail(value);
            }}
          />
        </div>
        <div>
          {thumbnailUrls.map((url) => {
            return <ImageComponent imageUrl={url} />;
          })}
        </div>
      </div>
    </div>
  );
}
