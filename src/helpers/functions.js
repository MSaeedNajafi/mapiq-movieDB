export const fetchList = async (url) => {
  return fetch(url, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json;charset=utf-8",
    }),
  }).then((res) => res.json());
};

export const findGenre = (l, genres) => {
  let gen = [];
  for (let i = 0; i < l.length; i++) {
    let film = genres.filter((g) => g.id == l[i]);
    gen.push(film[0]);
  }
  return gen;
};
