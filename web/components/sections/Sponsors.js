import React from "react";
import PropTypes from "prop-types";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Navigation, Autoplay} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import imageUrlBuilder from "@sanity/image-url";
import styled from "styled-components";
import {Heading} from "../typography";
import Section from "../Section";
import client from "../../client";
import ChevronLeft from "../icons/ChevronLeft";
import ChevronRight from "../icons/ChevronRight";

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const SwiperWrapper = styled.div`
  position: relative;
  padding: 0 50px;
`

const SwiperPrevButton = styled(Button)`
  position: absolute;
  top: 50%;
  left: 10px;
  padding: 0.375rem !important;
  margin-top: -21px;
`

const SwiperNextButton = styled(Button)`
  position: absolute;
  top: 50%;
  right: 10px;
  padding: 0.375rem !important;
  margin-top: -21px;
`

function Sponsors({title, items}) {
  return (
    <Section>
      <Container>
        <Row>
          <Col xs={12}>
            <Heading size="sm" bold textAlign="center" style={{marginBottom: 55}}>{title}</Heading>
          </Col>
          <Col xs={12}>
            <SwiperWrapper>
              <SwiperPrevButton variant="link" className="swiper-prev-button">
                <ChevronLeft />
              </SwiperPrevButton>
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={50}
                slidesPerView={5}
                autoplay={{delay: 2000}}
                speed={1000}
                loop
                navigation={{
                  nextEl: ".swiper-next-button",
                  prevEl: ".swiper-prev-button"
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  992: {
                    slidesPerView: 4,
                  },
                  1200: {
                    slidesPerView: 5,
                  }
                }}
                pagination={{clickable: true}}
                scrollbar={{draggable: true}}
              >
                {
                  items.map((item) => (
                    <SwiperSlide key={item._key}>
                      <img src={item.image && urlFor(item.image).auto('format').fit('max').toString()} alt=""/>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
              <SwiperNextButton variant="link" className="swiper-next-button">
                <ChevronRight />
              </SwiperNextButton>
            </SwiperWrapper>
          </Col>
        </Row>
      </Container>
    </Section>
  )
}

Sponsors.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
}

export default Sponsors
