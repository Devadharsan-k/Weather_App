import { useRef, useState } from "react";

function App() {
  const [api, setApi] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const Api_key = "45af754031bb2c0a758a9c1dee2adca2";

  const WeatherTypes = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
    },
    {
      type: "Smoke",
      img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
    },
  ];

  function fetchData(e) {
    e.preventDefault();
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${Api_key}`;

    setLoading(true);

    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setApi(null);
        if (data.cod == 404 || data.cod == 400) {
          setShowWeather([
            {
              type: "Not Found",
              img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
            },
          ]);
        }
        setShowWeather(
          WeatherTypes.filter(
            (weather) => weather.type === data.weather[0].main
          )
        );
        console.log(data);
        setApi(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-slate-800">
        <div className="bg-white w-96 p-4 rounded-md m-5">
          <form onSubmit={fetchData} className="border-b-4 border-indigo-500">
            <input
              type="text"
              ref={inputRef}
              placeholder="ENTER YOUR CITY"
              required
              autoFocus
              className="text-xl border-none outline-none font-semibold pb-1"
            />
          </form>
          <div
            className={`duration-300 delay-75  overflow-hidden
         ${showWeather ? "h-[27rem]" : "h-0"}`}
          >
            {loading ? (
              <div className="grid place-items-center h-full">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png"
                  alt="..."
                  className="w-14 mx-auto mb-2 animate-spin"
                />
              </div>
            ) : (
              showWeather && (
                <div className="text-center flex flex-col gap-6 mt-10">
                  {api && (
                    <p className="text-xl font-semibold">
                      {api?.name + "," + api?.sys?.country}
                    </p>
                  )}
                  <img
                    src={showWeather[0].img}
                    alt="..."
                    className="w-52 mx-auto flex"
                  />
                  <h3 className="text-2xl font-bold text-zinc-800">
                    {showWeather[0].type}
                  </h3>
                  {api && (
                    <>
                      <div className="flex justify-center">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/7794/7794499.png"
                          alt=""
                          className="h-9 mt-1"
                        />
                        <h2 className="text-4xl font-extrabold">
                          {api.main.temp}&#176;C
                        </h2>
                      </div>
                    </>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
