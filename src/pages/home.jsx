import { Button, Card, Col, Image, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import AI from "../assets/images/Untitledai.png";
import Ash from "../assets/images/american-white-ash-wood.png";
import banner from "../assets/images/banner.png";
import Cherry from "../assets/images/cherry-wood.png";
import Pine from "../assets/images/pine-wood.png";
import Poplar from "../assets/images/poplar-wood.png";
import SoftMaple from "../assets/images/soft-maple.png";
import Walnut from "../assets/images/walnut-wood.png";
import Oak from "../assets/images/white-oak.png";
import Footer from "../components/footer";
import "../components/home.css";
import ItemsSlider from "../components/itemslider";
export default function Home() {
  const topDealsItems = [
    { title: "Gỗ sồi trắng", image: Oak },
    { title: "Gỗ thông", image: Pine },
    { title: "Gỗ tần bì", image: Ash },
    { title: "Gỗ óc chó", image: Walnut },
    { title: "Gỗ thích mềm", image: SoftMaple },
    { title: "Gỗ anh đào", image: Cherry },
    { title: "Gỗ bạch dương", image: Poplar },
    // Add more items as needed
  ];
  return (
    <div className="main">
      <div className="images">
        <div className="head-image">
          <Image src={banner} fluid />
        </div>
        <div className="text-on-image">
          Chào mừng đến với WOODSYS
          <p></p>
        </div>
      </div>

      <Container
        fluid
        style={{
          backgroundColor: "white",
          width: "1050",
          height: "100vh",
        }}
      >
        <h1 className="text-container-1" style={{ textAlign: "center" }}>
          Sản phẩm
        </h1>
        <h5 style={{ color: "#2596be", textAlign: "center" }}>
          Các loại gỗ đã gia công
        </h5>
        <ItemsSlider title="Sản phẩm nổi bật">
          {topDealsItems.map((item, index) => (
            <span key={index}>
              <Card style={{ width: "18rem" }}>
                {/* <Card.Img variant="top" src={item.image} /> */}
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Img
                    variant="top"
                    src={item.image}
                    style={{ width: 255, height: 250 }}
                  />
                  <Card.Text></Card.Text>
                  <Button className="mt-auto">
                    <Nav.Link href="/product">Chi tiết</Nav.Link>
                  </Button>
                </Card.Body>
              </Card>
            </span>
          ))}
        </ItemsSlider>
        <div className="text-center">
          <button type="button" className="btn btn-primary">
            <Nav.Link href="/product">Xem thêm</Nav.Link>
          </button>
        </div>
      </Container>
      <Container fluid style={{ backgroundColor: "white", height: "100vh" }}>
        <h1 className="text-container-1" style={{ textAlign: "center" }}>
          AI
        </h1>
        <h5 style={{ color: "#2596be", textAlign: "center" }}>
          WOODSYS ứng dụng công nghệ AI vào công đoạn kiểm tra chất lượng sản
          phẩm
        </h5>
        <Row className="text-center">
          <Col className="m-auto" >
            <Image src={AI} style={{width:1000,height:400,right:"100%"}}></Image>
          </Col>
        </Row>
        <div className="text-center" style={{marginTop:20}}> 
          <button type="button" className="btn btn-primary">
            <Nav.Link href="/">Xem thêm</Nav.Link>
          </button>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
