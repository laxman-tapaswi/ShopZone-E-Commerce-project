import Layout from "../layout/Layout";

const Home = () => {
  return (
    <Layout>
      <h1>Home Component</h1>
      <div
        style={{ width: "100%", display: "flex", height: "300px", gap: "1%" }}
      >
        <div style={{ width: "50%", backgroundColor: "red" }}>
          <img
            src="./src/assets/mauntain.jpg"
            alt="imgae"
            width="100%"
            height="100%"
          />
        </div>
        <div
          style={{
            width: "49%",
            height: "98%",
            display: "flex",
            flexDirection: "column",
            gap: "4%",
          }}
        >
          <div style={{ display: "flex", height: "49%", gap: "2%" }}>
            <div style={{ width: "49%", backgroundColor: "blue" }}>
              <img
                src="./src/assets/mauntain.jpg"
                alt="imgae"
                width="100%"
                height="100%"
              />
            </div>
            <div style={{ width: "49%", backgroundColor: "grey" }}>
              <img
                src="./src/assets/mauntain.jpg"
                alt="imgae"
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <div style={{ display: "flex", height: "49%", gap: "2%" }}>
            <div style={{ width: "49%", backgroundColor: "grey" }}>
              <img
                src="./src/assets/mauntain.jpg"
                alt="imgae"
                width="100%"
                height="100%"
              />
            </div>
            <div style={{ width: "49%", backgroundColor: "blue" }}>
              <img
                src="./src/assets/mauntain.jpg"
                alt="imgae"
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "80px",
          backgroundColor: "greenyellow",
          marginTop: "20px",
        }}
      ></div>
      <div
        style={{
          width: "100%",
          height: "140px",
          margin: "20px 0",
          display: "flex",
          gap: "5px",
        }}
      >
        <div
          style={{
            width: "19%",
            height: "100%",
            backgroundColor: "green",
          }}
        ></div>
        <div
          style={{ width: "19%", height: "100%", backgroundColor: "green" }}
        ></div>
        <div
          style={{ width: "19%", height: "100%", backgroundColor: "green" }}
        ></div>
        <div
          style={{ width: "19%", height: "100%", backgroundColor: "green" }}
        ></div>
        <div
          style={{ width: "19%", height: "100%", backgroundColor: "green" }}
        ></div>
        <div
          style={{ width: "19%", height: "100%", backgroundColor: "green" }}
        ></div>
        <div
          style={{ width: "19%", height: "100%", backgroundColor: "green" }}
        ></div>
      </div>
    </Layout>
  );
};

export default Home;
