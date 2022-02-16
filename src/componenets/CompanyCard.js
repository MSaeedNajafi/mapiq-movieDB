import React, { useState } from "react";
import { Avatar, Button, Card, Paragraph, TextInput } from "react-native-paper";
import { View, ActivityIndicator } from "react-native";
import { fetchList } from "../helpers/functions";

import MovieList from "./MovieList";

const LeftContent = (props) => <Avatar.Icon {...props} icon="movie" />;

const MyComponent = (props) => {
  let {
    name,
    desc,
    image,
    totalMovies,
    listID,
    api_key,
    loadNextCompany,
    loadPrevCompany,
    genres,
  } = props;

  const [pageNr, setPageNr] = useState(1);
  const [films, setFilms] = useState([]);
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);

  const getNextOne = async () => {
    await loadNextCompany();
  };

  const getPrevOne = async () => {
    await loadPrevCompany();
  };

  const goBack = () => {
    setPageNr(1);
    setFilms([]);
    setFilteredResults([]);
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = films.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(films);
    }
  };

  // console.log(searchInput);
  // console.log(filteredResults);

  const getAllMovies = async () => {
    setLoadingMovies(true);
    const fetch_url = `https://api.themoviedb.org/4/list/${listID}?page=${pageNr}&api_key=${api_key}`;

    await fetchList(fetch_url)
      .then(async (data) => {
        setData(data);
        data.results.map((item) => setFilms((items) => [...items, item]));
        setPageNr(pageNr + 1);
        setLoadingMovies(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      {films.length == 0 ? (
        <Card>
          <Card.Cover source={{ uri: image }} />
          <Card.Title
            title={name}
            subtitle={`Movies: ${totalMovies}`}
            left={LeftContent}
          />
          <Card.Content>
            <Paragraph>{desc}</Paragraph>
          </Card.Content>

          {loadingMovies ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={{ padding: 20 }}
            />
          ) : (
            <View>
              <Card.Actions style={{ justifyContent: "space-between" }}>
                <Button onPress={getNextOne}>Next</Button>

                <Button
                  disabled={totalMovies == 0 ? true : false}
                  onPress={getAllMovies}
                >
                  See {totalMovies} Movies
                </Button>
                {listID == 1 ? (
                  <></>
                ) : (
                  <Button onPress={getPrevOne}>Previous</Button>
                )}
              </Card.Actions>
            </View>
          )}
        </Card>
      ) : (
        <View
          style={{
            flexDirection: "column",
            // padding: 10,
            height: "100%",
            marginTop: 25,
            // marginBottom: 150,
          }}
        >
          <TextInput
            icon="search"
            placeholder="Search For a Movie Name ..."
            right={<TextInput.Icon name="magnify" />}
            onChangeText={(e) => searchItems(e)}
            value={searchInput}
            style={{ justifyContent: "flex-start" }}
          />
          <MovieList
            films={films}
            filteredResults={filteredResults}
            loadingMovies={loadingMovies}
            getAllMovies={getAllMovies}
            genres={genres}
            goBack={goBack}
            pageNr={pageNr}
            total_pages={data.total_pages}
            searchInput={searchInput}
          />
        </View>
      )}
    </View>
  );
};

export default MyComponent;
