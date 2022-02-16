import React, { useState } from "react";
import {
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Avatar, Button, Card, Title } from "react-native-paper";
import { findGenre } from "../helpers/functions";

const MovieCard = (props) => {
  const image_base_url = "https://image.tmdb.org/t/p/w500";
  const [modalVisible, setModalVisible] = useState(false);

  const LeftContent = () => {
    return (
      <Avatar.Image
        size={50}
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${props.backdrop_path}`,
        }}
      />
    );
  };
  let { film, genres } = props;

  const MovieGenres = () => {
    return (
      <View style={styles.genre_view}>
        <Text style={[styles.genre_row, { fontWeight: "bold" }]}>Genres:</Text>
        {findGenre(film.genre_ids, genres.genres).map((g) => (
          <Text key={g.id} style={[styles.genre_row, { padding: 1 }]}>
            {g.name},
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.page_view}>
      <Modal
        animationType="slide"
        propagateSwipe={true}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView>
          <ScrollView>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  style={styles.movie_poster}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${props.backdrop_path}`,
                  }}
                />
                <Text style={styles.modalTitle}>{film.title}</Text>
                <Text style={styles.rDate_view}>
                  Release Date: {film.release_date}
                </Text>
                <MovieGenres />
                <View style={styles.summery_view}>
                  <Text>Summery: {film.overview}</Text>
                </View>
                {/* <View
                  style={{
                    // flex: 1,
                    backgroundColor: "red",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View style={styles.tableCell}>
                    <View style={styles.cell}>
                      <Text>popularity</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text>vote count</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text>vote average</Text>
                    </View>
                  </View>
                  <View style={styles.tableCell}>
                    <View style={styles.cell}>
                      <Text>{film.popularity}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text>{film.vote_count}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text>{film.vote_average}</Text>
                    </View>
                  </View>
                </View> */}
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
      <TouchableOpacity
        // style={[styles.button, styles.buttonOpen]}
        style={{ width: "100%", padding: 5 }}
        onPress={() => setModalVisible(true)}
      >
        <Card>
          <Card.Title
            title={film.title}
            subtitle={"Rating: " + film.vote_average}
            left={LeftContent}
          />
        </Card>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  page_view: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  centeredView: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    height: 640,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    height: "100%",
    // marginBottom: 50,
  },
  button: {
    marginTop: 15,
    borderRadius: 5,
    padding: 5,
    elevation: 2,
    width: "100%",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTitle: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  movie_poster: {
    width: "100%",
    height: "30%",
  },
  genre_view: { width: "100%", flexDirection: "row", justifyContent: "center" },
  genre_row: {
    // backgroundColor: "#345eef",
    // padding: 5,
    marginBottom: 15,
  },
  summery_view: {
    marginBottom: 15,
  },
  rDate_view: {
    marginBottom: 15,
  },
  vore_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    // backgroundColor: "red",
  },
  tableCell: {
    // flex: 1,
    // alignSelf: "stretch",
    // flexDirection: "row",
  },
  cell: {
    //  flex: 1, alignSelf: "stretch"
  },
});

export default MovieCard;
