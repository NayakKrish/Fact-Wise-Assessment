import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  useGetCharacterDetailsQuery,
  useGetCharactersLocationDataQuery,
} from "../../redux/baseApiSlice";

const MainPage = () => {
  const [pageNo, setPageNo] = useState(1);
  const { data } = useGetCharacterDetailsQuery({ pageNo: pageNo });
  const [CharacterData, setCharacterData] = useState(
    data?.results ? data?.results : []
  );
  const [locationData, setLocationData] = useState();
  const { data: LocationData } = useGetCharactersLocationDataQuery({
    url: locationData,
  });

  const fetchData = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    if (data) {
      setCharacterData([...CharacterData, ...data?.results]);
    }
  }, [data]);

  // const CharacterData = data?.results;
  console.log("krish", data);
  return (
    <>
      <Main>
        <TitleDiv>
          <h1>Rick & Morty</h1>
        </TitleDiv>

        {/* <MainContainer> */}
        <InfiniteScroll
          dataLength={CharacterData?.length ? CharacterData?.length : 0} //This is important field to render the next data
          next={fetchData}
          hasMore={CharacterData?.length > 0 ? true : false}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          style={{
            width: "100%",
            overflow: "visible",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {CharacterData?.map(
            (
              {
                gender,
                id,
                status,
                species,
                name,
                image,
                created,
                location: { url },
              },
              index
            ) => {
              return (
                <CharacterCard key={index}>
                  <div>
                    <img
                      src={image}
                      alt="demoimg"
                      width={"100%"}
                      height={"50%"}
                    />
                  </div>
                  <div>
                    <h3>{name}</h3>
                    <InfoDiv>
                      <TitleTexts>Status:</TitleTexts>
                      <DetailsTexts>{status}</DetailsTexts>
                    </InfoDiv>
                    <InfoDiv>
                      <TitleTexts>Species:</TitleTexts>
                      <DetailsTexts>{species}</DetailsTexts>
                    </InfoDiv>
                    <InfoDiv>
                      <TitleTexts>Gender:</TitleTexts>
                      <DetailsTexts>{gender}</DetailsTexts>
                    </InfoDiv>
                    <InfoDiv>
                      <TitleTexts>Created:</TitleTexts>
                      <DetailsTexts>{created}</DetailsTexts>
                    </InfoDiv>
                  </div>
                </CharacterCard>
              );
            }
          )}
        </InfiniteScroll>
        {/* </MainContainer> */}
      </Main>
    </>
  );
};

export default MainPage;

const Main = styled("div")({});

const MainContainer = styled("div")({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  flexWrap: "wrap",
});

const TitleDiv = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#bcc5ce",
});
const CharacterCard = styled("div")({
  boxShadow: "3px 4px 15px grey",
  margin: "2vh",
  borderRadius: "1vh",
  // width: "25%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "2vh",
  // backgroundColor: "grey",
});
const InfoDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  margin: "1vh",
});
const TitleTexts = styled("p")({
  padding: 0,
  margin: 0,
  fontWeight: "bold",
});
const DetailsTexts = styled("p")({
  padding: 0,
  margin: 0,
  marginLeft: "1vw",
});
