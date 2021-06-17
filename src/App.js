import "./App.scss";
import Header from "./components/header";
import { Section } from "./components/section";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useProgress, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import state from "./components/state";
import { useInView } from "react-intersection-observer";
import { a, useTransition } from "@react-spring/web";
import Aos from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

Aos.init({ duration: 1500 });
const Model = ({ modelPath }) => {
  const gltf = useGLTF(modelPath, true);
  return <primitive object={gltf.scene} dispose={null} />;
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[0, 12, 0]} intensity={1.5} />
      <spotLight intensity={1} position={[500, 1000, 0]} />
    </>
  );
};
const HTMLContent = ({
  bgColor,
  domContent,
  children,
  modelPath,
  Yposition,
  scale,
  show,
  inHtml,
  email,
  about,
  top,
}) => {
  const ref = useRef();
  const slide = useRef();
  useFrame(() => {
    if (about) {
      ref.current.rotation.x += 0.02;
      ref.current.rotation.z += 0.01;
    }
    ref.current.rotation.y += 0.01;
    //
  });

  const [refItem, inView] = useInView({
    threshold: 0,
  });

  const newElement = document.createElement("div");
  newElement.setAttribute("class", "row justify-content-center");
  newElement.innerHTML = inHtml;
  // `<div data-aos='${first}' class='col-8' id='projImage'><img src='/edu.jpg'></img><div class="overlay"></div><div class="button"><a href="https://github.com/thechatni/thechatni.github.io/" target="_blank"> Github </a></div><div class="button2"><a href="#" target="_blank"> Website </a></div></div><div id='projText' class='col-4' data-aos='${second}'><p id='title'><span id='heading' style="color:${bgColor};">Title:</span> Netflix & Chill</p><p><span id='heading' style="color:${bgColor};">Description:</span> A web app that allows users to plan virtual Netflix streaming events. Users can search through Netflix titles based on rating, type, air date, and other filters. After choosing a title, the user can post details about the virtual streaming event which can be seen by other users.</p><p><span id='heading' style="color:${bgColor};">Technologies used:</span> React JS, REST API, MongoDB, Express, Node JS, Unongs API, Bootstrap.</p></div>`;
  useEffect(() => {
    inView && (document.body.style.background = bgColor);

    // inView && console.log(document.body.style.background);
    if (!show && !email) {
      slide.current.style.display = "block";
    }
    inView &&
      !show &&
      slide.current.replaceChild(newElement, slide.current.children[0]);
    // inView && console.log(slide.current);
  }, [inView]);

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, Yposition, 0]}>
        <mesh ref={ref} position={[0, top, 0]} scale={scale}>
          {show && <Model modelPath={modelPath} />}
          {/* {show && console.log("no model")} */}
        </mesh>
        <Html portal={domContent} fullscreen>
          <div className="container" ref={refItem}>
            {children}

            <div
              ref={slide}
              id="projInfo"
              className="container"
              style={{ display: "none" }}
            >
              <p></p>
            </div>
          </div>
        </Html>
      </group>
    </Section>
  );
};

function Loader() {
  const { active, progress } = useProgress();
  const transition = useTransition(active, {
    from: { opacity: 1, progress: 0 },
    leave: { opacity: 0 },
    update: { progress },
  });
  return transition(
    ({ progress, opacity }, active) =>
      active && (
        <a.div className="loading" style={{ opacity }}>
          <div className="loading-bar-container">
            <a.div className="loading-bar" style={{ width: progress }}></a.div>
          </div>
        </a.div>
      )
  );
}

function App() {
  const domContent = useRef();
  const scrollArea = useRef();
  const emailArea = useRef();
  const thanks = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const sendEmail = (e) => {
    e.preventDefault();
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios
      .post("https://formsubmit.co/ajax/fbcde957c9c3cd479239fc9d719f504d", {
        name: name,
        email: email,
        message: message,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));

    emailArea.current.style.display = "none";
    thanks.current.style.display = "block";
  };
  return (
    <>
      <Header />
      <Canvas colorManagement camera={{ position: [0, 0, 120], fov: 70 }}>
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent
            domContent={domContent}
            modelPath="/computerOne.gltf"
            Yposition={750}
            bgColor={"#571ec1"}
            scale={0.2}
            show={true}
            email={false}
            about={false}
            top={-25}
          >
            <h1 className="title">Projects</h1>
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            modelPath=""
            Yposition={500}
            bgColor={"#F93822FF"}
            scale={0.1}
            show={false}
            inHtml={`<div data-aos='zoom-out-right' class='col-md-12 col-lg-8 col-sm-12 col-xs-12' id='projImage1'><img src='/nc1.PNG'></img><div class="overlay"></div><div class="button"><a href="https://github.com/thechatni/NetflixAndChill" target="_blank"> Github </a></div><div class="button2"><a href="https://netflixandchillreact.herokuapp.com/" target="_blank"> Website </a></div></div><div id='projText' class='col-md-12 col-lg-4 col-sm-12 col-xs-12' data-aos="zoom-in-left"><p id='title'><span id='heading' style="color:#F93822FF">Title:</span> Netflix & Chill</p><p><span id='heading' style="color:#F93822FF;">Description:</span> A web app that allows users to plan virtual Netflix streaming events. Users can search through Netflix titles based on rating, type, air date, and other filters. After choosing a title, the user can post details about the virtual streaming event which can be seen by other users.</p><p><span id='heading' style="color:#F93822FF;">Technologies used:</span> React JS with Hooks, REST API, MongoDB, Express, Node JS, uNoGS API, Bootstrap.</p></div>`}
            email={false}
            about={false}
            top={0}
          ></HTMLContent>
          <HTMLContent
            domContent={domContent}
            modelPath=""
            Yposition={250}
            bgColor={"#62e377"}
            scale={0.1}
            show={false}
            inHtml={`<div data-aos='flip-up' class='col-md-12 col-lg-8 col-sm-12 col-xs-12' id='projImage2'><img src='/criminal.png'></img><div class="overlay"></div><div class="button"><a href="https://github.com/thechatni/thechatni.github.io/tree/main/heroku" target="_blank"> Github </a></div><div class="button2"><a href="https://www.interrogategame.live/" target="_blank"> Website </a></div></div><div id='projText' class='col-md-12 col-lg-4 col-sm-12 col-xs-12' data-aos="zoom-in"><p id='title'><span id='heading' style="color:#62e377">Title:</span> Criminal Interrogation</p><p><span id='heading' style="color:#62e377;">Description:</span> The game includes the user being shown an initial crime scene followed by a virtual interrogation by the in-game detective who asks questions about the crime scene and the aim is to answer the questions as correctly as possible. Microphone is used for speech recognition to detect answers and webcam is used to analyze facial expressions.</p><p><span id='heading' style="color:#62e377;">Technologies used:</span> Django, Python NLP libraries, ClmTracker, SpeechRecognition API, Vimeo API, Heroku.</p></div>`}
            email={false}
            about={false}
            top={0}
          ></HTMLContent>
          <HTMLContent
            domContent={domContent}
            modelPath=""
            Yposition={0}
            bgColor={"#00c3ff"}
            scale={0.1}
            show={false}
            inHtml={`<div data-aos='fade-left' class='col-md-12 col-lg-8 col-sm-12 col-xs-12' id='projImage3'><img src='/sierra.PNG'></img><div class="overlay"></div><div class="button"><a href="https://github.com/thechatni/thechatni.github.io/tree/main/sierra" target="_blank"> Github </a></div><div class="button2"><a href="https://thechatni.github.io/sierra/index.html" target="_blank"> Website </a></div></div><div id='projText' class='col-md-12 col-lg-4 col-sm-12 col-xs-12' data-aos="fade-up-right"><p id='title'><span id='heading' style="color:#00c3ff">Title:</span> Sierra Management Corp.</p><p><span id='heading' style="color:#00c3ff;">Description:</span> A static website made for a consultancy company as part of a freelance project. Includes a Home, Services, About, Jobs, and Contact page all fully responsive. </p><p><span id='heading' style="color:#00c3ff;">Technologies used:</span> Vanilla Javascript, Bootstrap, Google Maps, HTML, CSS.</p></div>`}
            email={false}
            about={false}
            top={0}
          ></HTMLContent>

          <HTMLContent
            domContent={domContent}
            modelPath="/computerTwo.gltf"
            Yposition={-250}
            bgColor={"#FDD20EFF"}
            scale={0.7}
            show={true}
            inHtml=""
            email={false}
            about={true}
            top={0}
          >
            <div id="aboutArea">
              <h1 className="aboutTitle">
                Hello! My name is Fahad Ahmad. I've recently graduated from
                Bilkent University with a Bachelor's Degree in Computer Science.
                I'm a <span id="highlight">full stack web-developer</span> with
                a strong interest in responsive, optimized, and elegant design.
              </h1>
              <p id="resumeTitle">Click to Download Resume</p>
              {/* <form method="get" action="logo.png"> */}
              <a href="/CV.pdf" download>
                <button className="btn-download" id="btn-auto-click">
                  <div className="arrow"></div>
                </button>
              </a>
            </div>
            {/* </form> */}
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            modelPath=""
            Yposition={-500}
            bgColor={"#ff9100"}
            scale={0.1}
            show={false}
            inHtml=""
            email={true}
            about={false}
            top={0}
          >
            <div className="cards" ref={emailArea}>
              <h1>Contact Me</h1>
              <div className="rows">
                <form onSubmit={sendEmail}>
                  <div className="cols">
                    <div className="form-group">
                      {/* <label>Name</label> */}
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                      ></input>
                    </div>
                  </div>

                  <div className="cols">
                    <div className="form-group">
                      <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>
                  </div>

                  <div className="cols">
                    <div className="form-group">
                      <textarea
                        id="area"
                        rows="4"
                        cols="50"
                        style={{ overflow: "hidden", resize: "none" }}
                        placeholder="Your message"
                        value={message}
                        required
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>
                  </div>

                  <div className="cols">
                    <div className="form-group" id="send">
                      <button id="sub" type="submit">
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div>
              <h1 className="title" style={{ display: "none" }} ref={thanks}>
                Thanks for reaching out!
              </h1>
            </div>
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            modelPath="/mouse.gltf"
            Yposition={-750}
            bgColor={"#636567"}
            scale={45.0}
            show={true}
            first="zoom-out-right"
            second="zoom-in-left"
            inHtml=""
            email={false}
            top={0}
          >
            <h1 className="titleEnd">
              Made using React JS, Three JS, Bootstrap, Sass and some
              third-party libraries :)
            </h1>
          </HTMLContent>
        </Suspense>
      </Canvas>
      <Loader />
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ position: "sticky", top: 0 }} ref={domContent}></div>
        <div style={{ height: `${state.pages * 100}vh`, width: "100vw" }}></div>
      </div>
    </>
  );
}

export default App;
