import React, { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground, Text } from "react-native";
import { Button } from "react-native-paper";
import { fetchList } from "../helpers/functions";
import MyCompanyCard from "./CompanyCard";

export default function Movies() {
  const [listID, setListID] = useState(1);

  const [genres, setGenres] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [backdrop_path, setBackdrop_path] = useState("");

  const [poster_path, setPoster_path] = useState("");

  const [desc, setDesc] = useState("");
  const [nrOfMovies, setNrOfMovies] = useState(0);
  const [nrOfPages, setNrOfPages] = useState(0);

  const api_key = "1f54bd990f1cdfb230adb312546d765d";
  let url = `https://api.themoviedb.org/4/list/${listID}?page=1&api_key=${api_key}`;
  let url_genre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`;
  const image_base_url = "https://image.tmdb.org/t/p/w500";

  useEffect(async () => {
    const genres = await fetchList(url_genre);
    setGenres(genres);
  }, []);

  const loadNextCompany = async () => {
    setListID(listID + 1);
  };

  const loadPrevCompany = async () => {
    setListID(listID - 1);
  };

  useEffect(async () => {
    if (loading !== null) {
      await getMovieCompany();
    }
  }, [listID]);

  const companyInfo = async () => {
    await getMovieCompany();
  };

  const getMovieCompany = async () => {
    setLoading(true);

    // console.log(url);
    await fetchList(url)
      .then((data) => {
        // console.log(data);
        setData(data);
        setCompanyName(data.name);
        setBackdrop_path(data.backdrop_path);
        setPoster_path(data.poster_path);

        setDesc(data.description);
        setNrOfMovies(data.total_results);
        setNrOfPages(data.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const image = { uri: `https://image.tmdb.org/t/p/w500${poster_path}` };

  return (
    <View style={styles.container}>
      {companyName.length == 0 && (
        <View style={{ padding: 20 }}>
          <Text>Welcome to this app.</Text>

          <Text>
            By Pressing the button you can go through the mvoies provided by the
            API.
          </Text>

          <Text>I Hope You enjoy.</Text>

          <Button icon="camera" mode="contained" onPress={() => companyInfo()}>
            Load Movies
          </Button>
        </View>
      )}

      {loading === false && (
        <View style={styles.company_view}>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.image}
          >
            <View style={styles.overlay} />
            <MyCompanyCard
              name={companyName}
              desc={desc}
              image={image_base_url + backdrop_path}
              totalMovies={nrOfMovies}
              loadNextCompany={loadNextCompany}
              listID={listID}
              loadPrevCompany={loadPrevCompany}
              api_key={api_key}
              genres={genres}
            />
          </ImageBackground>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  company_view: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#000000c0",
  },
  image: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(69,85,117,0.7)",
  },
});
